import { env } from "$env/dynamic/private"
import notion_data from "$lib/data/notion_data"
import site_data from "$lib/data/site_data"
import { has_no_properties } from "$lib/utils/notion_errors"
import { Client, isFullPage } from "@notionhq/client"
import type { DatePropertyItemObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { error, type RequestHandler } from "@sveltejs/kit"
import { Feed } from "feed"

export const GET = (async ({ params }) => {
    const feed = new Feed({
        title: site_data.name,
        description: "The latest news from " + site_data.name,
        id: site_data.url,
        link: site_data.url,
        language: "en",
        image: site_data.url + "/images/app-icon.png",
        favicon: site_data.url + "/favicon.png",
        generator: "LightSquareGenerator",
        feedLinks: {
            json: site_data.url + "/feed.json",
            atom: site_data.url + "/feed.atom",
            rss: site_data.url + "/feed.rss",
        },
        copyright: "All content released into the public domain",
        author: {
            name: site_data.name,
            email: site_data.socials.email,
            link: site_data.url,
        },
    })

    const notion = new Client({ auth: env.NOTION_API_KEY })

    const pages_response = await notion.databases.query({
        database_id: notion_data.news_database_id,
        page_size: 20,
        filter: {
            property: "Published",
            date: {
                is_not_empty: true,
            }
        }
    })

    const pages = await Promise.all(pages_response.results.map(async page => {
        if (!isFullPage(page)) throw has_no_properties

        return {
            title: (page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
            date: new Date(Date.parse((page.properties.Published as DatePropertyItemObjectResponse).date!.start)),
            link: site_data.url + "/news/" + (page.properties.Slug as { formula: { string: string }}).formula.string,
            id: site_data.url + "/news/" + (page.properties.Slug as { formula: { string: string }}).formula.string,
            author: await Promise.all((page.properties.Authors as { relation: Array<{ id: string }>}).relation.map(async author => {
                const author_page = await notion.pages.retrieve({ page_id: author.id })

                if (!isFullPage(author_page)) throw has_no_properties

                return {
                    name: (author_page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
                    link: site_data.url + "/authors/" + (author_page.properties.Slug as { formula: { string: string }}).formula.string,
                }
            })),
        }
    }))

    pages.forEach(page => {
        feed.addItem(page)
    })

    switch (params.type) {
    case "json":
        return new Response(feed.json1(), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    case "atom":
        return new Response(feed.atom1(), {
            headers: {
                "Content-Type": "application/atom+xml"
            }
        })
    case "rss":
        return new Response(feed.rss2(), {
            headers: {
                "Content-Type": "application/rss+xml"
            }
        })
    default:
        throw error(500, {
            message: "Feed type not found",
            code: "FEED_TYPE_NOT_FOUND"
        })
    }
}) satisfies RequestHandler