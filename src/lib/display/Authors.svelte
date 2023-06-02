<script lang="ts">
import type { NewsPostsHomeQuery } from "$lib/hygraph/graphql-types"


export let authors: NewsPostsHomeQuery["latest"][0]["authors"] = []
export let with_href = false

</script>
<div class="authors">
    <div class="by">
        By
    </div>
    {#each authors as author}
        <svelte:element
            this={ with_href ? "a" : "div" }
            class="author"
            href={with_href ? `/authors/${author.slug}` : undefined}>
            <img
                class="author_img"
                alt="{author.name} profile picture"
                src={author.displayPicture.url}>
            <div class="author_name">
                { author.name }
            </div>
        </svelte:element>
    {/each}
</div>
<style lang="stylus">
@import 'variables'

.authors
    display flex
    flex-direction row
    gap 8px
    align-items center
    font-size 16px

.author
    display flex
    flex-direction row
    gap 8px
    align-items center
    text-decoration none
    color inherit
    padding 4px
    border-radius 100px
    padding-right 8px
    &:hover
        background transparify($dark, 8%)

.author_img
    width 24px
    height 24px
    border-radius 100px

.author_name
    font-weight 600

.by
    font-weight 500
    opacity 0.5
</style>