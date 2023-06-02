<script lang="ts">
import ChevronLeft from "svelte-material-icons/ChevronLeft.svelte"
import ChevronRight from "svelte-material-icons/ChevronRight.svelte"


export let base_url: string
export let page: number
export let has_next: boolean
export let has_previous: boolean

</script>
<div class="paginator">
    {#if has_previous}
        <a
            class="button"
            href="{base_url}/{page - 1}">
            <ChevronLeft/>
        </a>
    {:else}
        <span class="button">
            <ChevronLeft/>
        </span>
    {/if}
    <div class="page">
        { page }
    </div>
    {#if has_next}
        <a
            class="button"
            href="{base_url}/{page + 1}">
            <ChevronRight/>
        </a>
    {:else}
        <span class="button">
            <ChevronRight/>
        </span>
    {/if}
</div>
<style lang="stylus">
@import variables

.page
    font-size 20px
    font-weight 600
    padding 8px
    border-radius 8px
    border 1px solid transparify($dark, 10%)

.paginator
    display flex
    justify-content center
    align-items center
    gap 8px

    span.button, a.button
        background: transparent
        border 1px solid transparify($dark, 20%)
        font-size 24px
        padding 8px
        border-radius 50px
        display inline-flex
        opacity 0.5

    a.button
        opacity 1
        &:hover
            background $brand
            color white

</style>