<script lang="ts">
import Tag from "./Tag.svelte"

export let tags: { name: string, slug: string }[]
</script>
<div class="tags">
    {#each tags as tag}
        <Tag color="dark" href="/tags/{tag.slug}">
            {tag.name}
        </Tag>
    {/each}
</div>
<style lang="stylus">
@import "variables"

.tags
    display flex
    flex-wrap wrap
    gap 8px
</style>