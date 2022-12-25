<script>
import IconButton from "$lib/controls/IconButton.svelte"
import Tag from "$lib/display/Tag.svelte"
import Logo from "$lib/icons/Logo.svelte"
import Menu from "svelte-material-icons/Menu.svelte"
import VerticalDots from "svelte-material-icons/DotsVertical.svelte"
import Search from "svelte-material-icons/Magnify.svelte"
import Grid from "$lib/display/Grid.svelte"
import { onMount } from "svelte"

export let tags = [
    "Technology",
    "Healthcare",
    "Education",
    "Finance",
    "Business",
    "Politics",
]

let scrolled = false

onMount(() => {
    scrolled = window.scrollY != 0
    window.addEventListener("scroll", () => {
        scrolled = window.scrollY != 0
    })
})

</script>
<header class:scrolled>
    <Grid padding_horizontal="16px">
        <div class="side">
            <IconButton icon={Menu}/>
        </div>
        <div class="inner">
            <Logo size="28"/>
            <div class="tags">
                {#each tags as tag, i}
                    <Tag color="dark" href={`/${tag}`}>
                        {tag}
                    </Tag>
                    {#if i < tags.length - 1}
                        <VerticalDots/>
                    {/if}
                {/each}
            </div>
        </div>
        <div class="side">
            <IconButton icon={Search}/>
        </div>
    </Grid>
</header>
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