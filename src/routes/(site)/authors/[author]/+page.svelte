<PageHead title={data.author.name}/>
<SchemaComponent schema={schema}/>
<script lang="ts">
import Hero from "$lib/components/layouts/Hero.svelte"
import ResponsiveLayout from "$lib/components/layouts/ResponsiveLayout.svelte"
import VerticalLayout from "$lib/components/layouts/VerticalLayout.svelte"
import Breadcrumbs from "$lib/components/misc/Breadcrumbs.svelte"
import Post from "$lib/components/news/Post.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import SchemaComponent from "$lib/components/SchemaComponent.svelte"
import site_data from "$lib/data/site_data"
import Heading from "$lib/display/Heading.svelte"
import Profile from "$lib/display/Profile.svelte"
import Tag from "$lib/display/Tag.svelte"
import type { Person, WithContext } from "schema-dts"
import type { PageData } from "./$types"

export let data: PageData

let schema: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.author.name,
    url: `${site_data.url}/authors/${data.author.slug}`,
    ...data.author.display_picture && { image: data.author.display_picture },
    // sameAs: data.author.socials.map(social => social.url)
}
</script>
<Hero translucent={true}>
    <Breadcrumbs breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Authors", url: "/authors" },
        { name: data.author.name, url: `/authors/${data.author.slug}` }
    ]}/>
    <div class="author">
        {#if data.author.display_picture}
            <Profile size="80px" url={data.author.display_picture}/>
        {/if}
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