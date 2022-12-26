<script lang="ts">
import IconButton from "$lib/controls/IconButton.svelte"
import Tag from "$lib/display/Tag.svelte"
import Logo from "$lib/icons/Logo.svelte"
import Menu from "svelte-material-icons/Menu.svelte"
import VerticalDots from "svelte-material-icons/DotsVertical.svelte"
import Search from "svelte-material-icons/Magnify.svelte"
import Grid from "$lib/display/Grid.svelte"
import { onMount } from "svelte"
import Sidebar from "./Sidebar.svelte"
import ScrimOverlay from "$lib/controls/ScrimOverlay.svelte"

export let trending: { title: string, slug: string }[] = [
    { title: "Politics", slug: "politics" },
    { title: "Business", slug: "business" },
    { title: "Technology", slug: "technology" },
    { title: "Entertainment", slug: "entertainment" },
    { title: "Sports", slug: "sports" },
    { title: "Science", slug: "science" },
]

let scrolled = false

onMount(() => {
    scrolled = window.scrollY != 0
    window.addEventListener("scroll", () => {
        scrolled = window.scrollY != 0
    })
})

export let sidebar_opened = false

</script>
<header class:scrolled>
    <Grid padding_horizontal="16px">
        <div class="side">
            <IconButton icon={Menu} on:click={() => sidebar_opened = !sidebar_opened}/>
        </div>
        <div class="inner">
            <Logo size="28"/>
            <div class="tags">
                {#each trending as { slug, title }, i}
                    <Tag color="dark" href={`/tags/${slug}`}>
                        {title}
                    </Tag>
                    {#if i < trending.length - 1}
                        <VerticalDots/>
                    {/if}
                {/each}
            </div>
        </div>
        <div class="side">
            <IconButton color="dark" icon={Search} href="/search"/>
        </div>
    </Grid>
</header>
{#if sidebar_opened}
    <Sidebar bind:trending on:close={() => sidebar_opened = false}/>
    <ScrimOverlay on:close={() => sidebar_opened = false}/>
{/if}
<style lang="stylus">
@import 'variables'

header
    position sticky
    top 0
    left 0
    right 0
    height 60px
    display flex
    align-items center
    &.scrolled
        box-shadow 0 0 8px rgba(0, 0, 0, 0.1)
        background-color transparify(white, 30%)
        background-blur(10px)
        z-index 1

.inner
    grid-column span 10
    display flex
    align-items center
    justify-content space-between
    gap 16px
    padding 0 16px

.tags
    display flex
    align-items center
    gap 4px
    @media (max-width 1000px)
        display none

.side
    display flex
    justify-content center
</style>