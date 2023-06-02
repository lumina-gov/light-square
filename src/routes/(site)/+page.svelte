<PageHead
    description="Light Square is a news site that aims to provide a balanced and unbiased perspective on the world's most pressing issues."
    title="Front Page"
    type="website"/>
<SchemaComponent {schema}/>
<script lang="ts">
import PageHead from "$lib/components/PageHead.svelte"
import SchemaComponent from "$lib/components/SchemaComponent.svelte"
import site_data from "$lib/data/site_data"
import Grid from "$lib/components/layouts/Grid.svelte"
import Heading from "$lib/display/Heading.svelte"
import Icon from "$lib/display/Icon.svelte"
import Paragraph from "$lib/display/Paragraph.svelte"
import Tag from "$lib/display/Tag.svelte"
import type { NewsMediaOrganization, WithContext } from "schema-dts"
import Newspaper from "svelte-material-icons/Newspaper.svelte"
import ArrowRight from "svelte-material-icons/ArrowRight.svelte"
import Pencil from "svelte-material-icons/Pencil.svelte"
import PostGrid from "./PostGrid.svelte"
import FrontPageSection from "./FrontPageSection.svelte"
import GridItem from "$lib/components/layouts/GridItem.svelte"

let schema: WithContext<NewsMediaOrganization> = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "Light Square",
    "url": site_data.url,
    "alternateName": ["Light Square", "Light Square News", "Light Square Media", "Light Square News Publication"],
    "logo": "/images/app-icon.png",
    "description": "Light Square is a news site that aims to provide a balanced and unbiased perspective on the world's most pressing issues.",
    "sameAs": [
        site_data.socials.facebook,
        site_data.socials.tiktok,
        site_data.socials.twitter,
        site_data.socials.youtube,
        site_data.url,
        site_data.wikidata
    ],
}

export let data

</script>
<Grid padding_vertical="36px">
    <GridItem
        columns={{
            "laptop": "2 / span 10",
            "tablet": "span 8",
            "mobile": "span 4"
        }}
        gap={16}>
        <Heading left_icon={Newspaper}>Front Page</Heading>
        <Paragraph>
            Top headlines, analysis and breaking news
        </Paragraph>
        <FrontPageSection posts={data.latest}/>
    </GridItem>
</Grid>
<hr>
<Grid padding_vertical="36px">
    <GridItem
        columns={{
            "laptop": "2 / span 10",
            "tablet": "span 8",
            "mobile": "span 4"
        }}
        gap={16}>
        <Heading
            left_icon={Pencil}
            level={2}>Editor's Picks</Heading>
        <PostGrid posts={data.editors_picks}/>
    </GridItem>
</Grid>
<hr>
<a
    class="editorial-link"
    href="/editorial-policies">
    <Grid padding_vertical="36px">
        <GridItem
            align_items={{
                "laptop": "center",
                "tablet": "flex-start",
                "mobile": "flex-start"
            }}
            columns={{
                "laptop": "2 / span 10",
                "tablet": "span 8",
                "mobile": "span 4"
            }}
            flex_direction={{
                "laptop": "row",
                "tablet": "column",
                "mobile": "column"
            }}
            gap={16}>
            <Tag>Editorial Policies</Tag>
            <div class="text">
                <Paragraph>Read our editorial guiding principles and the standards our journalists follow </Paragraph>
                <Icon
                    color="brand"
                    icon={ArrowRight}/>
            </div>
        </GridItem>
    </Grid>
</a>
<hr>
<style lang="stylus">
@import "variables"

.text
    display flex
    gap 8px
    align-items center
    flex 1

.editorial-link
    display flex
    color inherit
    &:hover
        background transparify($dark, 10%)
</style>