<script lang="ts">

export let authors: {
    name: string
    display_picture: string | null
    slug: string
}[]

</script>
<div class="authors">
    <div class="by">
        By
    </div>
    {#each authors as author}
        <a class="author" href="/authors/{author.slug}">
            {#if author.display_picture}
                <img src="{author.display_picture}" alt="{author.name} profile picture" class="author_img">
            {/if}
            <div class="author_name">
                {author.name}
            </div>
        </a>
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