<script lang="ts">
import Authors from "$lib/display/Authors.svelte"
import DateComponent from "$lib/display/Date.svelte"
import Heading from "$lib/display/Heading.svelte"
import Tags from "$lib/display/Tags.svelte"
import type { NewsPostsHomeQuery } from "$lib/hygraph/graphql-types"


export let posts: NewsPostsHomeQuery["editorsPicks"]
</script>
<div class="grid">
    {#each posts as post}
        <a
            class="post"
            href="/news/{post.slug}">
            <DateComponent date={new Date(post.publishedDate)}/>
            <Tags tags={post.tags}/>
            <Heading level={3}>{ post.title }</Heading>
            <Authors authors={post.authors}/>
        </a>
    {/each}
</div>
<style lang="stylus">
@import "variables"

.grid
    display grid
    grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
    margin 0 auto
    max-width 1200px
    width 100%
    overflow hidden
    border 1px solid transparify($dark, 10%)
    border-radius 8px

.post
    color inherit
    display flex
    flex-direction column
    gap 8px
    padding 16px
    // use box-shadow instead of border to avoid double borders
    box-shadow 1px 1px 0 transparify($dark, 10%)
    transition background-color 0.2s ease-in-out
    &:hover
        background-color transparify($dark, 10%)
</style>