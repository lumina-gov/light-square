<script lang="ts">
import Hero from "$lib/components/layouts/Hero.svelte"
import ResponsiveLayout from "$lib/components/layouts/ResponsiveLayout.svelte"
import VerticalLayout from "$lib/components/layouts/VerticalLayout.svelte"
import Post from "$lib/components/news/Post.svelte"
import Heading from "$lib/display/Heading.svelte"
import Profile from "$lib/display/Profile.svelte"
import Tag from "$lib/display/Tag.svelte"
import type { PageData } from "./$types"

export let data: PageData
</script>
<Hero translucent={true}>
    <div class="author">
        <Profile size="80px" url={data.author.display_picture}/>
        <VerticalLayout gap={8}>
            <Tag color="yellow">Journalist</Tag>
            <Heading>{ data.author.name }</Heading>
        </VerticalLayout>
    </div>
</Hero>
<Hero>
    <Heading level={2} underline={true}>Latest Posts</Heading>
    <ResponsiveLayout min_item_size={280}>
        {#each data.posts as post}
            <Post post={post}/>
        {/each}
    </ResponsiveLayout>
</Hero>
<style lang="stylus">
@import 'variables'

.author
    display flex
    gap 16px
    align-items center
</style>