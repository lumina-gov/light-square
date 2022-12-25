<script lang="ts">

export let padding_vertical: string | undefined = undefined
export let padding_horizontal: string | undefined = undefined
export let span = 12

let styles = {
    "padding-top": padding_vertical,
    "padding-bottom": padding_vertical,
    "padding-left": padding_horizontal,
    "padding-right": padding_horizontal,
    "grid-template-columns": `repeat(${span}, 1fr)`
}

$: filtered_styles = Object.entries(styles).filter(([_key, value]) => value !== undefined).map(([key, value]) => `${key}: ${value}`).join(";")

</script>
<div
    class="grid"
    style={filtered_styles}>
    <slot/>
</div>
<style lang="stylus">
@import "variables"

.grid
    display grid
    max-width $laptop
    margin 0 auto
    width 100%
</style>