<script lang="ts">
import Profile from "$lib/display/Profile.svelte"
import Tag from "$lib/display/Tag.svelte"
import type { BasicAuthorFragment } from "$lib/hygraph/graphql-types"
import VerticalLayout from "../layouts/VerticalLayout.svelte"

export let author: BasicAuthorFragment
</script>
<a
    class="author-card"
    href="/authors/{author.slug}">
    <Profile
        size="64px"
        url={author.displayPicture.url}/>
    <VerticalLayout gap={8}>
        <Tag color="yellow">Journalist</Tag>
        <div class="author-name">
            { author.name }
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