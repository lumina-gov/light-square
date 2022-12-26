import { env } from "$env/dynamic/private"
import { get_child_blocks_recursive } from "$lib/api/notion_api"
import notion_data from "$lib/data/notion_data"
import { Client } from "@notionhq/client"
import type { DatePropertyItemObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load = (async ({ params }) => {
    const notion = new Client({ auth: env.NOTION_API_KEY })

    const response = await notion.databases.query({
        database_id: notion_data.authors_database_id,
        filter: {
            and: [
                {
                    property: "Slug",
                    formula: {
                        string: {
                            equals: params.author
                        }
                    }
                },
            ]
        }
    })

    if (response.results.length === 0) {
        throw error(404, {
            message: "No author found",
            code: "AUTHOR_NOT_FOUND",
        })
    }

    const author = response.results[0]

    const page_id = author.id

    const blocks = await get_child_blocks_recursive(page_id)

    if (!("properties" in author)) {
        throw error(500, {
            message: "Notion API returned a result without properties",
            code: "NOTION_API_ERROR"
        })
    }

    const news_response = await notion.databases.query({
        database_id: notion_data.news_database_id,
        filter: {
            and: [
                {
                    property: "Authors",
                    relation: {
                        contains: page_id
                    }
                },
                {
                    property: "Published",
                    date: {
                        is_not_empty: true
                    }
                }
            ]
        },
        sorts: [
            {
                property: "Published",
                direction: "descending"
            }
        ]
    })

    const posts = news_response.results.map(async page => {
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
            authors: await Promise.all((page.properties.Authors as { relation: Array<{ id: string }>}).relation.map(async author => {
                const author_response = await notion.pages.retrieve({ page_id: author.id })

                if (!("properties" in author_response)) {
                    throw error(500, {
                        message: "Notion API returned a result without properties",
                        code: "NOTION_API_ERROR"
                    })
                }

                return {
                    name: (author_response.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
                    slug: (author_response.properties.Slug as { formula: { string: string }}).formula.string,
                    display_picture: (author_response.properties["Display Picture"] as { files: Array<{ file: { url: string } }> }).files[0]?.file.url,
                }
            }
            )),
        }
    })

    return {
        author: {
            name: (author.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
            display_picture: (author.properties["Display Picture"] as { files: Array<{ file: { url: string } }> }).files[0]?.file.url,
            slug: (author.properties.Slug as { formula: { string: string }}).formula.string,
            blocks
        },
        posts: await Promise.all(posts)
    }
}) satisfies PageServerLoad