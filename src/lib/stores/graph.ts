import { createClient, type TypedDocumentNode, type Client, type AnyVariables, fetchExchange } from "@urql/core"
import { PUBLIC_HYGRAPH_CONTENT_ENDPOINT } from "$env/static/public"

export type GraphClient = ReturnType<typeof init_urql_hygraph>

export const init_urql_hygraph = () => Object.assign(createClient({
    url: PUBLIC_HYGRAPH_CONTENT_ENDPOINT,
    exchanges: [fetchExchange],
    fetch: (url, options = {}) => {
        return fetch(url, options)
    }
}), {
    async gquery<Data = unknown, Variables extends AnyVariables = AnyVariables>(
        this: Client,
        document: TypedDocumentNode<Data, Variables>,
        variables: Variables
    ) {
        const res = await this.query(document, variables).toPromise()

        return res
    },
})