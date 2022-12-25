import { env } from "$env/dynamic/private"
import { get_child_blocks_recursive } from "$lib/api/notion_api"
import notion_data from "$lib/data/notion_data"
import { Client } from "@notionhq/client"
import type { DatePropertyItemObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load = (async ({ params }) => {
    const notion = new Client({ auth: env.NOTION_API_KEY })

    // get the page by slug
    const pages_response = await notion.databases.query({
        database_id: notion_data.news_database_id,
        filter: {
            and: [
                {
                    property: "Slug",
                    formula: {
                        string: {
                            equals: params.post
                        }
                    }
                },
                {
                    property: "Published",
                    date: {
                        is_not_empty: true,
                    }
                }
            ]
        }
    })

    if (pages_response.results.length === 0) {
        throw error(404, {
            message: "No page found with that slug",
            code: "PAGE_NOT_FOUND",
        })
    }

    const page = pages_response.results[0]

    const page_id = page.id

    const blocks = await get_child_blocks_recursive(page_id)

    if (!("properties" in page)) {
        throw error(500, {
            message: "Notion API returned a result without properties",
            code: "NOTION_API_ERROR"
        })
    }

    return {
        post: {
            title: (page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
            date: new Date(Date.parse((page.properties.Published as DatePropertyItemObjectResponse).date!.start)),
            tags: await Promise.all((page.properties.Tags as { relation: Array<{ id: string }>}).relation.map(async tag => {
                const tag_page = await notion.pages.retrieve({ page_id: tag.id })

                if (!("properties" in tag_page)) {
                    throw error(500, {
                        message: "Notion API returned a result without properties",
                        code: "NOTION_API_ERROR"
                    })
                }
                return {
                    name: (tag_page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
                    slug: (tag_page.properties.Slug as { formula: { string: string }}).formula.string
                }
            })),
            blocks
        },
    }
}) satisfies PageServerLoad