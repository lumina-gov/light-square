<script lang="ts">
import type { Props } from "$lib/utils/typed_props"
import Tag from "./Tag.svelte"

export let tags: Props<Tag>[]
</script>
<div class="tags">
    {#each tags as tag}
        <Tag color="dark" {...tag}/>
    {/each}
</div>
<style lang="stylus">
@import "variables"

.tags
    display flex
    flex-wrap wrap
    gap 8px
</style>