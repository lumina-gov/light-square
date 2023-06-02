<PageHead title="Authors"/>
<script lang="ts">
import Hero from "$lib/components/layouts/Hero.svelte"
import ResponsiveLayout from "$lib/components/layouts/ResponsiveLayout.svelte"
import Breadcrumbs from "$lib/components/misc/Breadcrumbs.svelte"
import AuthorCard from "$lib/components/news/AuthorCard.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import Heading from "$lib/display/Heading.svelte"

export let data

</script>
<Hero translucent={true}>
    <Breadcrumbs
        breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Authors", url: "/authors" },
        ]}/>
    <Heading underline={true}>Authors</Heading>
</Hero>
<Hero>
    <Heading level={2}>Authors</Heading>
    <ResponsiveLayout min_item_size={280}>
        {#each data.authors as author}
            <AuthorCard {author}/>
        {/each}
    </ResponsiveLayout>
</Hero>