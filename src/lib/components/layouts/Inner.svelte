<script lang="ts">
export let max_width: string | number
export let gap: number
export let vertical_padding: number
export let align: "center" | "flex-start" | "flex-end" = "flex-start"
</script>
<div
    style:max-width={ typeof max_width === "number" ? max_width + "px" : max_width }
    style:gap="{ gap }px"
    style:padding="{ vertical_padding }px 16px"
    style:align-items={ align }
    class="inner">
    <slot/>
</div>
<style lang="stylus">

.inner
    width 100%
    margin 0 auto
    display flex
    flex-direction column
</style>