<script lang="ts">
import Magnify from "svelte-material-icons/Magnify.svelte"
import { onMount } from "svelte"
import { createEventDispatcher } from "svelte"

const dispatch = createEventDispatcher<{ submit: string }>()
export let placeholder = "Search..."
export let search: string
export let autofocus = false
let search_el: HTMLInputElement

export function focus() {
    search_el.focus()
}

onMount(() => {
    if (autofocus) {
        focus()
    }
})

</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="search-wrapper" on:click={() => search_el.focus()}>
    <Magnify/>
    <input
        on:keyup={e => {
            if (e.key === "Enter") {
                dispatch("submit", search)
            }
        }}
        placeholder={placeholder}
        bind:this={search_el}
        bind:value={search}/>

</div>
<style lang="stylus">
@import "variables"

.search-wrapper
    padding 0 12px
    background transparify($dark, 8%)
    display flex
    align-items center
    font-size 16px
    border-radius 100px
    width 100%
    gap 8px
    input
        background 0
        border 0
        width 100%
        flex 1
        padding 8px 0
        font-size 16px
        outline 0
        color inherit

</style>