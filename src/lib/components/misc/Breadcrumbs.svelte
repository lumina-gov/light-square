<SchemaComponent {schema}/>
<script lang="ts">
import type { BreadcrumbList, WithContext } from "schema-dts"
import SchemaComponent from "../SchemaComponent.svelte"
import ChevronRight from "svelte-material-icons/ChevronRight.svelte"
export let breadcrumbs: { url: string, name: string }[]

let schema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": breadcrumb.name,
        "item": breadcrumb.url
    }))
}

</script>
<div class="breadcrumbs">
    {#each breadcrumbs as breadcrumb, index}
        {#if index > 0}
            <ChevronRight/>
        {/if}
        {#if index < breadcrumbs.length - 1}
            <a href={breadcrumb.url}>{breadcrumb.name}</a>
        {:else}
            <span>{breadcrumb.name}</span>
        {/if}
    {/each}
</div>
<style lang="stylus">
@import "variables"

.breadcrumbs
    display flex
    align-items center
    font-size 14px
    color transparify($dark, 70%)
    > *
        padding 4px
    a
        color $brand
        border-radius 2px
        &:hover
            background transparify($brand, 20%)
</style>
