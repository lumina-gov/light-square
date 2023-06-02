import { AuthorsDocument } from "$lib/hygraph/graphql-types.js"
import { error } from "@sveltejs/kit"

export async function load({ parent }) {
    const data = await parent()

    const res = await data.graph.gquery(AuthorsDocument, {})

    if (!res.data || res.error) {
        throw error(500, {
            message: res.error?.message || "Failed to load authors",
            code: "FAILED_TO_LOAD_AUTHORS",
        })
    }

    return {
        authors: res.data.authors,
    }
}