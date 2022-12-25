<script lang="ts">
import Heading from "$lib/display/Heading.svelte"
import Paragraph from "$lib/display/Paragraph.svelte"
import Hero from "../layouts/Hero.svelte"
import ResponsiveLayout from "../layouts/ResponsiveLayout.svelte"
import ChevronRight from "svelte-material-icons/ChevronRight.svelte"

export let links: { name: string, url: string, description: string }[]
</script>

<Hero translucent={true}>
    <Heading level={2} underline={true}>More Information</Heading>
    <ResponsiveLayout gap={16} min_item_size={200} align_items="strech">
        {#each links as link}
            <a href={link.url} class="link">
                <Heading left_icon={ChevronRight} level={3}>{link.name}</Heading>
                <Paragraph>{link.description}</Paragraph>
            </a>
        {/each}
    </ResponsiveLayout>
</Hero>
<style lang="stylus">
@import "variables"

.link
    display flex
    flex-direction column
    gap 8px
    padding 16px
    color inherit
    border-radius 4px
    border 1px solid transparify($dark, 12%)
    background white
</style>