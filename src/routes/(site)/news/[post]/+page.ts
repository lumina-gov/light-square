import { NewsPostDocument } from "$lib/hygraph/graphql-types.js"
import { error } from "@sveltejs/kit"

export async function load({ parent, params }) {
    const data = await parent()

    const res = await data.graph.gquery(NewsPostDocument, {
        slug: params.post,
    })


    if (!res.data || res.error) {
        throw error(500, {
            message: res.error?.message || "Could not load news post",
            code: "FAILED_TO_LOAD_NEWS_POST",
        })
    }

    if(!res.data.newsPost) {
        throw error(404, {
            message: "News post not found",
            code: "NEWS_POST_NOT_FOUND",
        })
    }

    return {
        post: res.data.newsPost,
        latest: res.data.latest,
    }
}