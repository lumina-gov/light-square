<script lang="ts">
export let gap = 16
export let vertical_gap: number = gap || 0
export let horizontal_gap: number = gap || 0
export let justify_content: "flex-start" | "center" | "flex-end" | "strech" = "flex-start"
export let align_items: "flex-start" | "center" | "flex-end" | "strech" = "flex-start"
export let padding = 0
export let vertical_padding: number = padding || 0
export let horizontal_padding: number = padding || 0
export let max_width: string | number = "100%"
export let text_align: "left" | "center" | "right" = "left"
export let min_item_size: number
</script>
<div
    style:grid-gap="{ vertical_gap }px { horizontal_gap }px"
    style:justify-content={ justify_content }
    style:max-width={ typeof max_width === "number" ? max_width + "px" : max_width }
    style:padding="{ vertical_padding }px { horizontal_padding }px"
    style:align-items={ align_items }
    style:text-align={ text_align }
    style:grid-template-columns="repeat(auto-fit, minmax({ min_item_size }px, 1fr))"
    class="layout">
    <slot/>
</div>
<style lang="stylus">
@import "variables"

.layout
    display grid
    // grid-auto-flow column
    overflow-x hidden
    width 100%
</style>