import { AuthorPageDocument } from "$lib/hygraph/graphql-types.js"
import { error, redirect } from "@sveltejs/kit"

const PAGE_SIZE = 10

export async function load({ parent, params }) {
    const data = await parent()

    if(params.page === "1") {
        throw redirect(307, `/tags/${params.author}`)
    }

    const page = params.page ? parseInt(params.page) : 1

    const res = await data.graph.gquery(AuthorPageDocument, {
        slug: params.author,
        skip: (page - 1) * PAGE_SIZE,
        first: PAGE_SIZE,
    })


    if (!res.data || res.error) {
        throw error(500, {
            message: res.error?.message || "Could not load tag page",
            code: "FAILED_TO_LOAD_TAG_PAGE",
        })
    }

    if(!res.data.author) {
        throw error(404, {
            message: "Tag not found",
            code: "TAG_NOT_FOUND",
        })
    }

    return {
        author: res.data.author,
        posts_connection: res.data.newsPostsConnection,
        page,
    }
}