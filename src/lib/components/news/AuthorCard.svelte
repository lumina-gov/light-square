<script lang="ts">
import Profile from "$lib/display/Profile.svelte"
import Tag from "$lib/display/Tag.svelte"
import VerticalLayout from "../layouts/VerticalLayout.svelte"

export let author: {
    name: string
    display_picture: string | null
    slug: string
}
</script>
<a href="/authors/{author.slug}" class="author-card">
    {#if author.display_picture}
        <Profile url={author.display_picture} size="64px"/>
    {/if}
    <VerticalLayout gap={8}>
        <Tag color="yellow">Journalist</Tag>
        <div class="author-name">
            {author.name}
        </div>
    </VerticalLayout>
</a>
<style lang="stylus">
@import 'variables'

.author-card
    display flex
    flex-direction row
    gap 16px
    align-items center
    padding 16px
    border 1px solid transparify($dark, 12%)
    border-radius 8px
    color inherit
    &:hover
        background transparify($dark, 4%)

.author-name
    font-weight 600
    font-size 22px

</style>