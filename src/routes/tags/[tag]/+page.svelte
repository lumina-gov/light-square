<PageHead title={data.tag.title}/>
<script lang="ts">
import Hero from "$lib/components/layouts/Hero.svelte"
import ResponsiveLayout from "$lib/components/layouts/ResponsiveLayout.svelte"
import Breadcrumbs from "$lib/components/misc/Breadcrumbs.svelte"
import Post from "$lib/components/news/Post.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import Heading from "$lib/display/Heading.svelte"
import Paragraph from "$lib/display/Paragraph.svelte"
import type { PageData } from "./$types"

export let data: PageData
</script>
<Hero translucent={true}>
    <Breadcrumbs breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Tags", url: "/tags" },
        { name: data.tag.title, url: `/tags/${data.tag.slug}` }
    ]}/>
    <Heading underline={true}>{ data.tag.title }</Heading>
</Hero>
<Hero>
    <Heading level={2}>Latest Posts</Heading>
    {#if data.posts.length > 0}
        <ResponsiveLayout min_item_size={280}>
            {#each data.posts as post}
                <Post post={post}/>
            {/each}
        </ResponsiveLayout>
    {:else}
        <Paragraph>No posts found.</Paragraph>
    {/if}
</Hero>