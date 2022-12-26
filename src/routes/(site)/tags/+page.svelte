<PageHead title="All Tags" description="List of all news sections"/>
<script lang="ts">
import Hero from "$lib/components/layouts/Hero.svelte"
import VerticalLayout from "$lib/components/layouts/VerticalLayout.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import Heading from "$lib/display/Heading.svelte"
import Paragraph from "$lib/display/Paragraph.svelte"
import Tag from "$lib/display/Tag.svelte"
import type { PageData } from "./$types"

export let data: PageData

</script>
<Hero translucent={true}>
    <Heading underline={true}>All Tags</Heading>
    <VerticalLayout max_width={600}>
        <Paragraph>
            This page lists all tags that are used in the news section. Click on a tag to see all posts that are tagged with it.
        </Paragraph>
    </VerticalLayout>
</Hero>
<Hero>
    <Heading level={2}>Tags</Heading>
    <div class="flex-wrap">
        {#each data.tags as tag}
            <div class="tag">
                <Tag href="/tags/{tag.slug}" name={tag.name}/>
            </div>
        {/each}
    </div>
</Hero>
<style lang="stylus">
@import 'variables'

.flex-wrap
    display flex
    flex-wrap wrap
    gap 16px
</style>