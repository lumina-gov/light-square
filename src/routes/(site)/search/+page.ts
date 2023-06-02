import { SearchDocument } from "$lib/hygraph/graphql-types.js"
import { error } from "@sveltejs/kit"

export async function load({ parent, url }) {
    const data = await parent()

    const search = url.searchParams.get("q")

    if (!search) {
        return {
            posts: [],
            query: "",
        }
    }

    const res = await data.graph.gquery(SearchDocument, {
        search,
    })


    if (!res.data || res.error) {
        throw error(500, {
            message: res.error?.message || "Failed to load news post",
            code: "FAILED_TO_LOAD_NEWS_POST",
        })
    }

    return {
        posts: res.data.newsPosts,
        query: search,
    }
}