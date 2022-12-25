<script lang="ts">
import Icon from "$lib/display/Icon.svelte"
import type { SvelteComponent } from "svelte"

export let icon: typeof SvelteComponent
export let href: string
export let theme: "light" | "dark" = "dark"
</script>
<a
    href={href}
    rel="noreferrer"
    target="_blank"
    class:light={theme === "light"}
    class:dark={theme === "dark"}>
    <Icon icon={icon}/>
</a>
<style lang="stylus">
@import 'variables'

a
    font-size 24px
    padding 6px
    display inline-flex
    align-items center
    justify-content center
    border-radius 4px
    &.dark
        color white
        background transparify(white, 8%)
        &:hover
            background transparify(white, 12%)
    &.light
        color $dark
        background transparify($dark, 8%)
        &:hover
            background transparify($dark, 12%)
</style>