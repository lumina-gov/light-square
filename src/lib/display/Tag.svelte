<script lang="ts">
export let color: "red" | "brand" | "blue" | "white" | "yellow" | "dark" = "brand"
export let href: string | undefined = undefined
export let name: string | undefined = undefined
$: tag = href ? "a" : "span"
</script>

<svelte:element this={tag} {href} class="tag {color}" class:interactive={href} role="button">
    <div class="text">
        {#if name}
            { name }
        {/if}
        <slot />
    </div>
</svelte:element>
<style lang="stylus">
@import 'variables'

.interactive
    cursor pointer

.tag
    padding 0 2px
    line-height 1
    font-weight 600
    display inline-flex
    border-radius 2px
    color $dark
    background transparify(white, 16%)
    .text
        padding 3px 4px
        line-height 100%

    &.brand
        color $brand
        background transparify($brand, 16%)
        &:hover
            background transparify($brand, 20%)

    &.red
        color $red
        background transparify($red, 16%)
        &:hover
            background transparify($red, 20%)

    &.blue
        color $blue
        background transparify($blue, 16%)
        &:hover
            background transparify($blue, 20%)

    &.white
        color white
        background transparify(white, 12%)
        &:hover
            background transparify(white, 20%)

    &.yellow
        color $yellow
        background transparify($yellow, 16%)
        &:hover
            background transparify($yellow, 20%)

    &.dark
        color $dark
        background transparify($dark, 16%)
        &:hover
            background transparify($dark, 20%)
</style>
