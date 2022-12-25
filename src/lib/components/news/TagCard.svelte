<script lang="ts">
import Tag from "$lib/display/Tag.svelte"


export let tag: {
    name: string,
    slug: string,
}
</script>
<a href="/tags/{tag.slug}" class="tag">
    <Tag>{ tag.name }</Tag>
</a>
<style lang="stylus">
@import 'variables'

.tag
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

</style>