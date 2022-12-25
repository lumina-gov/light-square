import { env } from "$env/dynamic/private"
import notion_data from "$lib/data/notion_data"
import { Client } from "@notionhq/client"
import type { DatePropertyItemObjectResponse, RelationPropertyItemObjectResponse, RichTextItemResponse, TitlePropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load = (async ({ params }) => {
    const notion = new Client({ auth: env.NOTION_API_KEY })

    const tags_response = await notion.databases.query({
        database_id: notion_data.tags_database_id,
        filter: {
            property: "Slug",
            formula: {
                string: {
                    equals: params.tag
                }
            }
        }
    })

    if (tags_response.results.length === 0) {
        throw error(404, {
            message: "Tag not found",
            code: "TAG_NOT_FOUND",
        })
    }

    const tag = tags_response.results[0]

    // get the page by slug
    const pages_response = await notion.databases.query({
        database_id: notion_data.news_database_id,
        filter: {
            and: [
                {
                    property: "Tags",
                    relation: {
                        contains: tag.id
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

    if (!("properties" in tag)) {
        throw error(500, {
            message: "Notion API returned a result without properties",
            code: "NOTION_API_ERROR"
        })
    }

    const posts = pages_response.results.map(async page => {
        if (!("properties" in page)) {
            throw error(500, {
                message: "Notion API returned a result without properties",
                code: "NOTION_API_ERROR"
            })
        }

        return {
            title: (page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
            date: new Date(Date.parse((page.properties.Published as DatePropertyItemObjectResponse).date!.start)),
            tags: await Promise.all((page.properties.Tags as { relation: Array<{ id: string }>}).relation.map(async tag => {
                const tag_response = await notion.pages.retrieve({ page_id: tag.id })
                if (!("properties" in tag_response)) {
                    throw error(500, {
                        message: "Notion API returned a result without properties",
                        code: "NOTION_API_ERROR"
                    })
                }
                return {
                    name: (tag_response.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
                    slug: (tag_response.properties.Slug as { formula: { string: string }}).formula.string,
                }
            })),
            slug: (page.properties.Slug as { formula: { string: string }}).formula.string,
        }
    })

    return {
        tag: {
            title: (tag.properties.Name as unknown as { title: { plain_text: string }[]}).title.map(title => title.plain_text).join(""),
        },
        posts: await Promise.all(posts)
    }
}) satisfies PageServerLoad