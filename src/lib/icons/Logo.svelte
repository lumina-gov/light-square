<script>
import LogoSvgFull from "./LogoSvgFull.svelte"

export let size = "1em"
export let height = size
export let color = "currentColor"
</script>
<a href="/">
    <LogoSvgFull
        color={color}
        height={height}
        size={size}
    />
</a>
<style lang="stylus">
@import "variables"

a
    display inline-flex
    align-items center
    color inherit
    &:hover
        color $brand
</style>