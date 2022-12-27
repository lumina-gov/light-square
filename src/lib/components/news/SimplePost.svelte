<script lang="ts">
    import Authors from "$lib/display/Authors.svelte"
import DateComponent from "$lib/display/Date.svelte"
    import Tags from "$lib/display/Tags.svelte"


export let post: {
    title: string,
    slug: string,
    date: Date,
    tags: {
        name: string,
        slug: string
    }[],
    authors: {
        name: string,
        slug: string
        display_picture: string | null
    }[],
}

</script>
<a href="/news/{post.slug}" class="post">
    <DateComponent date={post.date}/>
    <Tags tags={post.tags}/>
    <h3>{post.title}</h3>
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