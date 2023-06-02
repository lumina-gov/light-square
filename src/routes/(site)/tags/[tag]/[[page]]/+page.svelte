<PageHead title={data.tag.name}/>
<script lang="ts">
import Hero from "$lib/components/layouts/Hero.svelte"
import ResponsiveLayout from "$lib/components/layouts/ResponsiveLayout.svelte"
import Breadcrumbs from "$lib/components/misc/Breadcrumbs.svelte"
import Paginator from "$lib/components/misc/Paginator.svelte"
import Post from "$lib/components/news/Post.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import site_data from "$lib/data/site_data"
import Heading from "$lib/display/Heading.svelte"
import Paragraph from "$lib/display/Paragraph.svelte"

export let data

$: nodes = data.posts_connection.edges.map(edge => edge.node)
</script>
<Hero translucent={true}>
    <Breadcrumbs
        breadcrumbs={[
            { name: "Home", url: site_data.url + "/" },
            { name: "Tags", url: site_data.url + "/tags" },
            { name: data.tag.name, url: site_data.url + `/tags/${data.tag.slug}` }
        ]}/>
    <Heading underline={true}>{ data.tag.name }</Heading>
</Hero>
<Hero>
    <div class="apart">
        <Heading level={2}>Latest Posts</Heading>
        <Paginator
            base_url="/tags/{data.tag.slug}"
            has_next={data.posts_connection.pageInfo.hasNextPage}
            has_previous={data.posts_connection.pageInfo.hasPreviousPage}
            page={data.page}/>
    </div>
    {#if nodes.length > 0}
        <ResponsiveLayout min_item_size={280}>
            {#each nodes as post}
                <Post post={post}/>
            {/each}
        </ResponsiveLayout>
    {:else}
        <Paragraph>No posts found.</Paragraph>
    {/if}

</Hero>
<style lang="stylus">
@import variables

.apart
    display flex
    justify-content space-between
    gap 16px
    align-items center
    width 100%
</style>