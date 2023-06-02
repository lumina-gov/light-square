<script lang="ts">
import Authors from "$lib/display/Authors.svelte"
import DateComponent from "$lib/display/Date.svelte"
import Tags from "$lib/display/Tags.svelte"
import type { BasicNewsPostFragment } from "$lib/hygraph/graphql-types"


export let post: BasicNewsPostFragment
</script>
<a
    class="post"
    href="/news/{post.slug}">
    <div class="post-title">{ post.title }</div>
    <DateComponent date={new Date(post.publishedDate)}/>
    <Tags tags={post.tags}/>
    <Authors authors={post.authors}/>
</a>

<style lang="stylus">
@import 'variables'

.post
    color inherit
    display flex
    flex-direction column
    gap 8px
    border 1px solid transparify($dark, 8%)
    padding 16px
    border-radius 8px
    &:hover
        background transparify($dark, 4%)

    .post-title
        font-size 24px
        font-weight 600
</style>