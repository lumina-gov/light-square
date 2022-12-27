<PageHead
    title={data.post.title}
/>
<SchemaComponent schema={schema}/>
<script lang="ts">
import { page } from "$app/stores"
import BlocksArray from "$lib/components/blocks/BlocksArray.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import SchemaComponent from "$lib/components/SchemaComponent.svelte"
import site_data from "$lib/data/site_data"
import Authors from "$lib/display/Authors.svelte"
import Date from "$lib/display/Date.svelte"
import Grid from "$lib/components/layouts/Grid.svelte"
import Heading from "$lib/display/Heading.svelte"
import Paragraph from "$lib/display/Paragraph.svelte"
import Tags from "$lib/display/Tags.svelte"
import type { NewsArticle, WithContext } from "schema-dts"
import News from "svelte-material-icons/Newspaper.svelte"
import type { PageData } from "./$types"
import SimplePost from "$lib/components/news/SimplePost.svelte"
import GridItem from "$lib/components/layouts/GridItem.svelte"

export let data: PageData

export const schema: WithContext<NewsArticle> = {
    "@context": "https://schema.org",
    "@id": $page.url.hostname + $page.url.pathname,
    "@type": "NewsArticle",
    "headline": data.post.title,
    "datePublished": data.post.date.toISOString(),
    "author": [

    ],
    "publisher": {
        "@type": "NewsMediaOrganization",
        "name": "Light Square",
        "url": site_data.url,
    },
    "countryOfOrigin": {
        "@type": "Country",
        "name": "Lumina",
    },
}

</script>
<Grid padding_vertical="24px" vertical_gap={48}>
    <GridItem
        tag="article"
        gap={32}
        columns={{
            "laptop": "2 / span 8",
            "tablet": "2 / span 6",
            "mobile": "span 4",
        }}>
        <div class="head">
            <Tags tags={data.post.tags}/>
            <Heading left_icon={News}>{ data.post.title }</Heading>
            <Authors authors={data.post.authors}/>
            <Date date={data.post.date} />
        </div>
        <div class="content">
            <BlocksArray blocks={data.post.blocks} />
        </div>
    </GridItem>
    <GridItem
        tag="aside"
        gap={16}
        columns={{
            "laptop": "span 3",
            "tablet": "2 / span 6",
            "mobile": "span 4",
        }}>
        <Heading level={3}>Latest Articles</Heading>
        <Paragraph>
            View the latest articles from the our news section.
        </Paragraph>
        <hr>
        <div class="latest-articles">
            {#each data.latest_posts as post, i}
                <SimplePost post={post}/>
                {#if i < data.latest_posts.length - 1}
                    <hr>
                {/if}
            {/each}
        </div>
    </GridItem>
</Grid>
<style lang="stylus">
@import "variables"

:global
    h1
        font-size 32px

.head
    display flex
    flex-direction column
    gap 16px

.content
    padding 16px
    max-width 600px
    border 1px solid transparify($dark, 12%)
    border-radius 8px
    margin 0 auto
    width 100%
    font-size 18px

.latest-articles
    display flex
    flex-direction column
</style>