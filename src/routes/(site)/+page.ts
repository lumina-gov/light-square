import { NewsPostsHomeDocument } from "$lib/hygraph/graphql-types.js"
import { error } from "@sveltejs/kit"

export async function load ({ parent })  {
    const data = await parent()

    const res = await data.graph.gquery(NewsPostsHomeDocument, {})

    if (!res.data || res.error) {
        throw error(500, {
            message: res.error?.message || "Could not load news posts",
            code: "FAILED_TO_LOAD_NEWS_POSTS",
        })
    }

    return {
        editors_picks: res.data.editorsPicks,
        latest: res.data.latest,
    }
}