import { env } from "$env/dynamic/private"
import notion_data from "$lib/data/notion_data"
import { has_no_properties } from "$lib/utils/notion_errors"
import { Client, isFullPage } from "@notionhq/client"
import type { DatePropertyItemObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
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

    if (!isFullPage(tag)) throw has_no_properties

    const posts = pages_response.results.map(async page => {
        if (!isFullPage(page)) throw has_no_properties

        return {
            title: (page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
            date: new Date(Date.parse((page.properties.Published as DatePropertyItemObjectResponse).date!.start)),
            tags: await Promise.all((page.properties.Tags as { relation: Array<{ id: string }>}).relation.map(async tag => {
                const tag_response = await notion.pages.retrieve({ page_id: tag.id })
                if (!isFullPage(tag_response)) throw has_no_properties
                return {
                    name: (tag_response.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
                    slug: (tag_response.properties.Slug as { formula: { string: string }}).formula.string,
                }
            })),
            slug: (page.properties.Slug as { formula: { string: string }}).formula.string,
            authors: await Promise.all((page.properties.Authors as { relation: Array<{ id: string }>}).relation.map(async author => {
                const author_response = await notion.pages.retrieve({ page_id: author.id })

                if (!isFullPage(author_response)) throw has_no_properties

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
        tag: {
            title: (tag.properties.Name as unknown as { title: { plain_text: string }[]}).title.map(title => title.plain_text).join(""),
            slug: (tag.properties.Slug as unknown as { formula: { string: string }}).formula.string,
        },
        posts: await Promise.all(posts)
    }
}) satisfies PageServerLoad