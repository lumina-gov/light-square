<blockquote>
    <slot/>
</blockquote>
<style lang="stylus">
@import "variables"

blockquote

    padding 16px
    border 1px solid transparify($dark, 10%)
    border-left 4px solid transparify($dark, 10%)
    display flex
    gap 8px
    flex-direction column
</style>