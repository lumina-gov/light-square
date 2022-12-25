<script>
import IconButton from "$lib/controls/IconButton.svelte"
import Tag from "$lib/display/Tag.svelte"
import Logo from "$lib/icons/Logo.svelte"
import Menu from "svelte-material-icons/Menu.svelte"
import VerticalDots from "svelte-material-icons/DotsVertical.svelte"
import Search from "svelte-material-icons/Magnify.svelte"
import Grid from "$lib/display/Grid.svelte"

export let tags = [
    "Technology",
    "Healthcare",
    "Education",
    "Finance",
    "Business",
    "Politics",
]
</script>
<header>
    <Grid>
        <IconButton icon={Menu}/>
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
        <div class="end">
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

.end
    grid-column 12
</style>