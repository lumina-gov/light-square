<PageHead title={data.author.name}/>
<SchemaComponent schema={schema}/>
<script lang="ts">
import Hero from "$lib/components/layouts/Hero.svelte"
import ResponsiveLayout from "$lib/components/layouts/ResponsiveLayout.svelte"
import VerticalLayout from "$lib/components/layouts/VerticalLayout.svelte"
import Breadcrumbs from "$lib/components/misc/Breadcrumbs.svelte"
import Paginator from "$lib/components/misc/Paginator.svelte"
import Post from "$lib/components/news/Post.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import SchemaComponent from "$lib/components/SchemaComponent.svelte"
import site_data from "$lib/data/site_data"
import Heading from "$lib/display/Heading.svelte"
import Profile from "$lib/display/Profile.svelte"
import Tag from "$lib/display/Tag.svelte"
import type { Person, WithContext } from "schema-dts"

export let data

let schema: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.author.name,
    url: `${site_data.url}/authors/${data.author.slug}`,
    ...data.author.displayPicture.url && { image: data.author.displayPicture.url },
// sameAs: data.author.socials.map(social => social.url)
}

$: nodes = data.posts_connection.edges.map(edge => edge.node)

</script>
<Hero translucent={true}>
    <Breadcrumbs
        breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Authors", url: "/authors" },
            { name: data.author.name, url: `/authors/${data.author.slug}` }
        ]}/>
    <div class="author">
        <Profile
            size="80px"
            url={data.author.displayPicture.url}/>
        <VerticalLayout gap={8}>
            <Tag color="yellow">Journalist</Tag>
            <Heading>{ data.author.name }</Heading>
        </VerticalLayout>
    </div>
</Hero>
<Hero>
    <div class="apart">
        <Heading
            level={2}
            underline={true}>Latest Posts</Heading>
        <Paginator
            base_url="/authors/{data.author.slug}"
            has_next={data.posts_connection.pageInfo.hasNextPage}
            has_previous={data.posts_connection.pageInfo.hasPreviousPage}
            page={data.page}/>
    </div>
    <ResponsiveLayout min_item_size={280}>
        {#each nodes as post}
            <Post post={post}/>
        {/each}
    </ResponsiveLayout>
</Hero>
<style lang="stylus">
@import variables

.author
    display flex
    gap 16px
    align-items center

.apart
    display flex
    justify-content space-between
    gap 16px
    align-items center
    width 100%
</style>