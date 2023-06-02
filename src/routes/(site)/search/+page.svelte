<PageHead title="Search: {data.query}"/>
<script lang="ts">
import { goto } from "$app/navigation"
import Hero from "$lib/components/layouts/Hero.svelte"
import ResponsiveLayout from "$lib/components/layouts/ResponsiveLayout.svelte"
import Breadcrumbs from "$lib/components/misc/Breadcrumbs.svelte"
import Post from "$lib/components/news/Post.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import Search from "$lib/controls/Search.svelte"
import Heading from "$lib/display/Heading.svelte"
import Paragraph from "$lib/display/Paragraph.svelte"

export let data

</script>
<Hero translucent={true}>
    <Breadcrumbs
        breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Search", url: "/search" },
            ...(data.query ? [{ name: data.query, url: `/sear
            ch?q=${data.query}` }] : [])
        ]}/>
    <Heading underline={true}>Search</Heading>
    <Search
        autofocus={true}
        search={data.query}
        on:submit={ event => goto(`/search?q=${encodeURIComponent(event.detail)}`) }/>
</Hero>
<Hero>
    <Heading level={2}>Search Results</Heading>
    {#if data.posts.length > 0}
        <ResponsiveLayout min_item_size={300}>
            {#each data.posts as post}
                <Post post={post}/>
            {/each}
        </ResponsiveLayout>
    {:else if !data.query}
        <Paragraph>Enter a search query to begin.</Paragraph>
    {:else}
        <Paragraph>No results found.</Paragraph>
    {/if}
</Hero>