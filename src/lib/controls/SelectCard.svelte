<script lang="ts">
import Tag from "$lib/display/Tag.svelte"
import type { SvelteComponent } from "svelte"

export let info: {
    title: string;
    description: string;
    icon: typeof SvelteComponent;
    tag?: string;
    enabled?: boolean;
}
export let current: number
export let i: number

$: selected = current == i

function click() {
    if (info.enabled) current = i
}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="card"
    class:enabled={ info.enabled }
    class:selected
    on:click={ click }
>
    <div class="icon">
        <svelte:component this={ info.icon } />
    </div>
    <div class="title">{ info.title }</div>
    <p>{ info.description }</p>
    {#if info.tag}
        <div>
            <Tag color="white">COMING SOON</Tag>
        </div>
    {/if}
</div>

<style lang="stylus">
@import 'variables'

.card
    display flex
    flex-direction column
    gap 12px
    font-size 16px
    padding 28px
    color white
    background rgba(255, 255, 255, 0.05)
    border-radius 8px
    opacity 0.5
    cursor default
    border 2px solid transparent
    &.enabled
        cursor pointer
        opacity 1
        background rgba(255, 255, 255, 0.08)

    &.selected
        border 2px solid $brand

    .icon
        color $brand
        font-size 32px
        display inline-flex

    .title
        text-transform uppercase
        font-size 18px
        font-weight bold
    p
        margin 0
        padding 0
        opacity 0.75
</style>
