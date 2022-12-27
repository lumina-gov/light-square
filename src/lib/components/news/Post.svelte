<script lang="ts">
import Authors from "$lib/display/Authors.svelte"
import DateComponent from "$lib/display/Date.svelte"
import Tags from "$lib/display/Tags.svelte"


export let post: {
    title: string
    slug: string
    date: Date
    tags: { name: string, slug: string }[]
    authors: {
        name: string
        slug: string
        display_picture: string
    }[]
}
</script>
<a href="/news/{post.slug}" class="post">
    <div class="post-title">{post.title}</div>
    <DateComponent date={post.date}/>
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