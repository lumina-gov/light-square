<PageHead
    title="Front Page"
    description="Light Square is a news site that aims to provide a balanced and unbiased perspective on the world's most pressing issues."
    type="website"/>
<SchemaComponent {schema}/>
<script lang="ts">
import Hero from "$lib/components/layouts/Hero.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import SchemaComponent from "$lib/components/SchemaComponent.svelte"
import site_data from "$lib/data/site_data"
import Heading from "$lib/display/Heading.svelte"
import type { NewsMediaOrganization, WithContext } from "schema-dts"
import Newspaper from "svelte-material-icons/Newspaper.svelte"

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
        site_data.url
    ],
}
</script>
<Hero>
    <Heading left_icon={Newspaper}>Front Page</Heading>
</Hero>