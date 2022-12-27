import { env } from "$env/dynamic/private"
import notion_data from "$lib/data/notion_data"
import { has_no_properties } from "$lib/utils/notion_errors"
import { Client, isFullPage } from "@notionhq/client"
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import type { PageServerLoad } from "./$types"

export const load = (async () => {
    const notion = new Client({ auth: env.NOTION_API_KEY })

    // get the page by slug
    const pages_response = await notion.databases.query({
        database_id: notion_data.news_database_id,
        filter: {
            property: "Published",
            date: {
                is_not_empty: true,
            }
        },
        sorts: [
            {
                property: "Published",
                direction: "descending",
            }
        ]
    })

    const tags: { [id: string]: Promise<{ name: string, slug: string }> } = {}
    const authors: { [id: string]: Promise<{ name: string, slug: string, display_picture: string | null }> } = {}

    async function get_tag(tag_id: string): Promise<{ name: string, slug: string }> {
        if (tag_id in tags) return await tags[tag_id]
        tags[tag_id] = (async () => {
            const tag_page = await notion.pages.retrieve({ page_id: tag_id })
            if (!isFullPage(tag_page)) throw has_no_properties

            return {
                name: (tag_page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
                slug: (tag_page.properties.Slug as { formula: { string: string }}).formula.string,
            }
        })()
        return await tags[tag_id]
    }

    async function get_author(author_id: string): Promise<{ name: string, slug: string, display_picture: string | null }> {
        if (author_id in authors) return await authors[author_id]
        authors[author_id] = (async () => {
            const author_page = await notion.pages.retrieve({ page_id: author_id })
            if (!isFullPage(author_page)) throw has_no_properties

            return {
                name: (author_page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
                slug: (author_page.properties.Slug as { formula: { string: string }}).formula.string,
                display_picture: (author_page.properties["Display Picture"] as { files: Array<{ file: { url: string } }> }).files[0]?.file.url || null,
            }
        })()
        return await authors[author_id]
    }

    const latest_news = await Promise.all(pages_response.results.map(async page => {
        if (!isFullPage(page)) throw has_no_properties

        return {
            title: (page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
            slug: (page.properties.Slug as { formula: { string: string }}).formula.string,
            date: new Date(Date.parse((page.properties.Published as { date: { start: string }}).date.start)),
            tags: await Promise.all((page.properties.Tags as { relation: Array<{ id: string }> }).relation.map(async tag => await get_tag(tag.id))),
            authors: await Promise.all((page.properties.Authors as { relation: Array<{ id: string }> }).relation.map(async author => await get_author(author.id))),
        }
    }))

    const editors_picks_response = await notion.databases.query({
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
                    property: "Tags",
                    relation: {
                        contains: notion_data.editors_picks_tag_id,
                    }
                }
            ]
        }
    })

    const editors_picks = await Promise.all(editors_picks_response.results.map(async page => {
        if (!isFullPage(page)) throw has_no_properties

        return {
            title: (page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
            slug: (page.properties.Slug as { formula: { string: string }}).formula.string,
            date: new Date(Date.parse((page.properties.Published as { date: { start: string }}).date.start)),
            tags: await Promise.all((page.properties.Tags as { relation: Array<{ id: string }> }).relation.map(async tag => await get_tag(tag.id))),
            authors: await Promise.all((page.properties.Authors as { relation: Array<{ id: string }> }).relation.map(async author => await get_author(author.id))),
        }
    }))

    return {
        latest_news,
        editors_picks,
    }
}) satisfies PageServerLoad