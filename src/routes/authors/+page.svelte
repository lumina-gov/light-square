<PageHead title="Authors"/>
<script lang="ts">
import Hero from "$lib/components/layouts/Hero.svelte"
import Breadcrumbs from "$lib/components/misc/Breadcrumbs.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import Heading from "$lib/display/Heading.svelte"

</script>
<Hero translucent={true}>
    <Breadcrumbs breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Authors", url: "/authors" },
    ]}/>
    <Heading underline={true}>Authors</Heading>
</Hero>