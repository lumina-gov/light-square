<script lang="ts">
import Icon from "$lib/display/Icon.svelte"
import type { Prop } from "$lib/utils/typed_props"
import { type SvelteComponent, createEventDispatcher } from "svelte"

let dispatch = createEventDispatcher<{ click: Event }>()

export let href: string | null = null
export let icon: typeof SvelteComponent
export let color: Prop<Icon, "color"> = "dark"
export let opacity = false

$: tag = href ? "a" : "div" as "a" | "div"

function clicked(e: Event) {
    dispatch("click", e)
}

function handle_keyup(e: KeyboardEvent) {
    if (e.key === "Enter") {
        clicked(e)
    }
}
</script>

<svelte:element
    this={ tag }
    class="button"
    class:opacity
    href={href}
    role="button"
    tabindex="0"
    on:click={ clicked }
    on:keyup={ handle_keyup }
>
    <Icon
        {color}
        {icon}/>
</svelte:element>

<style lang="stylus">
@import 'variables'

.button
    padding 8px
    background none
    display inline-flex
    align-items center
    justify-content center
    border-radius 4px
    cursor pointer
    font-weight 600
    font-size 24px
    &.opacity
        color transparify($dark, 40%)
    &:hover
        background transparify($dark, 12%)
    &:active
        background transparify($dark, 8%)
    &:focus-visible
        outline $brand 2px dashed
        outline-offset 2px


</style>