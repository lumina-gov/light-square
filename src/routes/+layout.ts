import { alerts_init } from "$lib/stores/alerts"
import type { LayoutLoad } from "./$types"

export const load: LayoutLoad = async () => {
    const alerts = alerts_init([])

    return {
        alerts,
    }
}