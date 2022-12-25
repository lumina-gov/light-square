import { env } from "$env/dynamic/private"
import notion_data from "$lib/data/notion_data"
import { Client } from "@notionhq/client"
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load = (async ({ url }) => {
    const notion = new Client({ auth: env.NOTION_API_KEY })

    const query = url.searchParams.get("q")
    let items: {
        title: string,
        slug: string,
        date: Date,
        tags: Array<{
            name: string,
            slug: string,
        }>,
        authors: Array<{
            name: string,
            slug: string,
            display_picture: string,
        }>
    }[] = []

    if (query) {
        const response = await notion.databases.query({
            database_id: notion_data.news_database_id,
            filter: {
                and: [
                    {
                        property: "Published",
                        date: {
                            is_not_empty: true,
                        }
                    },
                    {
                        property: "Name",
                        title: {
                            contains: query
                        }
                    }
                ]
            }
        })

        items = await Promise.all(response.results.map(async item => {
            if (!("properties" in item)) {
                throw error(500, {
                    message: "Notion API returned a result without properties",
                    code: "NOTION_API_ERROR"
                })
            }

            return {
                title: (item.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
                slug: (item.properties.Slug as { formula: { string: string }}).formula.string,
                date: new Date(Date.parse((item.properties.Published as { date: { start: string }}).date.start)),
                tags: await Promise.all((item.properties.Tags as { relation: Array<{ id: string }> }).relation.map(async tag => {
                    const tag_page = await notion.pages.retrieve({ page_id: tag.id })
                    if (!("properties" in tag_page)) {
                        throw error(500, {
                            message: "Notion API returned a result without properties",
                            code: "NOTION_API_ERROR"
                        })
                    }

                    return {
                        name: (tag_page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
                        slug: (tag_page.properties.Slug as { formula: { string: string }}).formula.string,
                    }
                })),
                authors: await Promise.all((item.properties.Authors as { relation: Array<{ id: string }> }).relation.map(async author => {
                    const author_page = await notion.pages.retrieve({ page_id: author.id })
                    if (!("properties" in author_page)) {
                        throw error(500, {
                            message: "Notion API returned a result without properties",
                            code: "NOTION_API_ERROR"
                        })
                    }

                    return {
                        name: (author_page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
                        slug: (author_page.properties.Slug as { formula: { string: string }}).formula.string,
                        display_picture: (author_page.properties["Display Picture"] as { files: Array<{ file: { url: string } }> }).files[0]?.file.url,
                    }
                }))
            }
        }))
    }

    return {
        items: await Promise.all(items),
        query: query || "",
    }
}) satisfies PageServerLoad