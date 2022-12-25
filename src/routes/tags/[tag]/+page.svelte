<PageHead title={data.tag.title}/>
<script lang="ts">
import Hero from "$lib/components/layouts/Hero.svelte"
import ResponsiveLayout from "$lib/components/layouts/ResponsiveLayout.svelte"
import Post from "$lib/components/news/Post.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import Heading from "$lib/display/Heading.svelte"
import type { PageData } from "./$types"

export let data: PageData
</script>
<Hero translucent={true}>
    <Heading underline={true}>{ data.tag.title }</Heading>
</Hero>
<Hero>
    <ResponsiveLayout min_item_size={280}>
        {#each data.posts as post}
            <Post post={post}/>
        {/each}
    </ResponsiveLayout>
</Hero>
<style lang="stylus">
@import 'variables'

</style>