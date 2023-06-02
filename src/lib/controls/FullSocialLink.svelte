<script lang="ts">
import Icon from "$lib/display/Icon.svelte"
import type { SvelteComponent } from "svelte"

export let icon: typeof SvelteComponent
export let href: string
export let theme: "light" | "dark" = "dark"
</script>
<a
    class:dark={ theme === "dark" }
    class:light={ theme === "light" }
    href={href}
    rel="noreferrer"
    target="_blank">
    <Icon
        icon={icon}
        size={18}/>
    <slot/>
</a>
<style lang="stylus">
@import 'variables'

a
    font-size 16px
    padding 6px
    display flex
    align-items center
    border-radius 4px
    gap 8px
    &.dark
        color white
        &:hover
            background transparify(white, 12%)
    &.light
        color $dark
        background transparify($dark, 8%)
        &:hover
            background transparify($dark, 12%)
</style>