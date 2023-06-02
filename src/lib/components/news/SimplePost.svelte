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
    <DateComponent date={new Date(post.publishedDate)}/>
    <Tags tags={post.tags}/>
    <h3>{ post.title }</h3>
    <Authors authors={post.authors}/>
</a>
<style lang="stylus">
@import 'variables'

.post
    color inherit
    padding 16px
    display flex
    gap 8px
    flex-direction column
    transition background-color 0.2s ease-in-out
    &:hover
        background transparify($dark, 10%)

</style>