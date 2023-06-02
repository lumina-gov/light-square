<script lang="ts">
import type { Prop } from "$lib/utils/typed_props"
import type { SvelteComponent } from "svelte"

import Icon from "./Icon.svelte"

export let left_icon: typeof SvelteComponent | null = null
export let left_icon_color: Prop<Icon, "color"> = "brand"
export let right_icon: typeof SvelteComponent | null = null
export let right_icon_color: Prop<Icon, "color"> = "brand"
export let level: 1 | 2 | 3 | 4 | 5 | 6 = 1
export let id: string | null = null
export let underline = false
</script>

<svelte:element
    this={ "h" + level }
    {id}
    class="heading"
    class:underline>
    {#if left_icon}
        <Icon
            color={left_icon_color}
            icon={left_icon}/>
    {/if}
    <span>
        <slot/>
    </span>
    {#if right_icon}
        <Icon
            color={right_icon_color}
            icon={right_icon}/>
    {/if}
</svelte:element>
<style lang="stylus">
@import 'variables'

.heading
    font-weight 700
    display flex
    gap 0.4em
    align-items center
    margin 0
    position relative
    &.underline
        span
            display flex
            flex-direction column
            gap 4px
            &:after
                content ""
                height 4px
                width 100%
                background $brand
                opacity 0.6
</style>