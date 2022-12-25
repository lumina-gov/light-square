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
import Grid from "$lib/display/Grid.svelte"
import Heading from "$lib/display/Heading.svelte"
import Paragraph from "$lib/display/Paragraph.svelte"
import Tags from "$lib/display/Tags.svelte"
import type { NewsArticle, WithContext } from "schema-dts"
import News from "svelte-material-icons/Newspaper.svelte"
import type { PageData } from "./$types"

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
<Grid padding_vertical="24px" padding_horizontal="16px">
    <article>
        <div class="head">
            <Tags tags={data.post.tags} />
            <Heading left_icon={News}>{ data.post.title }</Heading>
            <Authors authors={data.post.authors}/>
            <Date date={data.post.date} />
        </div>
        <div class="content">
            <BlocksArray blocks={data.post.blocks} />
        </div>
    </article>
    <aside>
        <Heading level={3}>Latest Articles</Heading>
        <Paragraph>
            View the latest articles from the blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Paragraph>
    </aside>
</Grid>
<style lang="stylus">
@import "variables"

:global
    h1
        font-size 32px

article
    max-width 800px
    grid-column 2 / span 8
    display flex
    flex-direction column
    gap 32px
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

aside
    grid-column span 3
    gap 16px
    display flex
    flex-direction column
</style>