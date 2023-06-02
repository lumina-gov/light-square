import site_data from "$lib/data/site_data"
import { FeedDocument } from "$lib/hygraph/graphql-types.js"
import { init_urql_hygraph } from "$lib/stores/graph"
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

    const graph = init_urql_hygraph()

    const res = await graph.gquery(FeedDocument, {})

    if (!res.data || res.error) {
        throw error(500, {
            message: res.error?.message || "Failed to load feed",
            code: "FAILED_TO_LOAD_FEED",
        })
    }


    res.data.newsPosts.forEach(page => {
        feed.addItem({
            date: new Date(page.publishedDate),
            title: page.title,
            id: `${site_data.url}/news/${page.slug}`,
            link: `${site_data.url}/news/${page.slug}`,
            content: page.content.map(item => item.__typename === "Markdown" ? item.markdown : "").join("\n"),
            author: page.authors.map(author => ({
                name: author.name,
                link: `${site_data.url}/authors/${author.slug}`
            })),
            category: page.tags.map(tag => ({
                name: tag.name,
            })),
        })
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
    // case "rss":
    //     return new Response(feed.rss2(), {
    //         headers: {
    //             "Content-Type": "application/rss+xml"
    //         }
    //     })
    default:
        throw error(500, {
            message: "Feed type not found",
            code: "FEED_TYPE_NOT_FOUND"
        })
    }
}) satisfies RequestHandler