<script lang="ts">
export let gap = 16
export let justify_content: "flex-start" | "center" | "flex-end" | "stretch" = "flex-start"
export let align_items: "flex-start" | "center" | "flex-end" | "stretch" = "flex-start"
export let padding = 0
export let vertical_padding: number = padding || 0
export let horizontal_padding: number = padding || 0
export let max_width: string | number = "100%"
export let text_align: "left" | "center" | "right" = "left"
export let margin_auto = false
</script>
<div
    style:gap="{ gap }px"
    style:justify-content={ justify_content }
    style:max-width={ typeof max_width === "number" ? max_width + "px" : max_width }
    style:padding="{ vertical_padding }px { horizontal_padding }px"
    style:align-items={ align_items }
    style:text-align={ text_align }
    style:margin={ margin_auto ? "auto" : "0" }
    class="layout">
    <slot/>
</div>
<style lang="stylus">
@import "variables"

.layout
    display flex
    flex-direction column
    width 100%
</style>