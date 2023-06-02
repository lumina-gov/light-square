<script lang="ts">
import Grid from "$lib/components/layouts/Grid.svelte"
import GridItem from "$lib/components/layouts/GridItem.svelte"
import ScrollbarRegion from "$lib/controls/ScrollbarRegion.svelte"
import SimplePost from "$lib/components/news/SimplePost.svelte"
import type { NewsPostsHomeQuery } from "$lib/hygraph/graphql-types"


export let posts: NewsPostsHomeQuery["latest"] = []


</script>
<Grid
    columns={{
        "laptop": 10,
        "tablet": 8,
        "mobile": 4
    }}
    side_padding={false}>
    <GridItem
        columns={{
            "laptop": "span 6",
            "tablet": "span 5",
            "mobile": "span 4",
        }}>
        <div class="gray">
            {#each posts.slice(0, 3) as post, i}
                <SimplePost post={post}/>
                {#if i < 2}
                    <hr>
                {/if}
            {/each}
        </div>
    </GridItem>
    <GridItem
        columns={{
            "laptop": "span 4",
            "tablet": "span 3",
            "mobile": "span 4",
        }}>
        <div class="container">
            <div class="inner">
                <ScrollbarRegion>
                    {#each posts.slice(3) as post, i}
                        <SimplePost post={post}/>
                        {#if i < posts.length - 4}
                            <hr>
                        {/if}
                    {/each}
                </ScrollbarRegion>
            </div>
        </div>
    </GridItem>
</Grid>
<style lang="stylus">
@import 'variables'

.gray
    background transparify($dark, 10%)
    border-radius 8px
    overflow hidden

.container
    position relative
    height 100%

.inner
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    display flex
    box-shadow inset 0 -10px 10px -10px transparify($dark, 20%)
    border-radius 8px
    overflow hidden

</style>