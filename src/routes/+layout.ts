import { alerts_init } from "$lib/stores/alerts"
import { init_urql_hygraph } from "$lib/stores/graph"
import type { LayoutLoad } from "./$types"

export const load: LayoutLoad = async () => {
    const alerts = alerts_init([])
    const graph = init_urql_hygraph()
    return {
        alerts,
        graph,
    }
}