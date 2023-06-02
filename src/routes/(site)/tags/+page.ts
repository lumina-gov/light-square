import { TagsDocument } from "$lib/hygraph/graphql-types.js"
import { error } from "@sveltejs/kit"

export async function load({ parent }) {
    const data = await parent()

    const res = await data.graph.gquery(TagsDocument, {})

    if (!res.data || res.error) {
        throw error(500, {
            message: res.error?.message || "Could not load tags",
            code: "FAILED_TO_LOAD_TAGS",
        })
    }

    return {
        tags: res.data.tags,
    }
}