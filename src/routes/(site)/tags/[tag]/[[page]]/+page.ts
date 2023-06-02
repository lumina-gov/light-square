import { TagPageDocument } from "$lib/hygraph/graphql-types.js"
import { error, redirect } from "@sveltejs/kit"

const PAGE_SIZE = 10

export async function load({ parent, params }) {
    const data = await parent()

    if(params.page === "1") {
        throw redirect(307, `/tags/${params.tag}`)
    }

    const page = params.page ? parseInt(params.page) : 1

    const res = await data.graph.gquery(TagPageDocument, {
        slug: params.tag,
        skip: (page - 1) * PAGE_SIZE,
        first: PAGE_SIZE,
    })


    if (!res.data || res.error) {
        throw error(500, {
            message: res.error?.message || "Could not load tag page",
            code: "FAILED_TO_LOAD_TAG_PAGE",
        })
    }

    if(!res.data.tag) {
        throw error(404, {
            message: "Tag not found",
            code: "TAG_NOT_FOUND",
        })
    }

    return {
        tag: res.data.tag,
        posts_connection: res.data.newsPostsConnection,
        page,
    }
}