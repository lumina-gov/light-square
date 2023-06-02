<script lang="ts">
import Scrollbar from "./Scrollbar.svelte"

let viewport: Element
let contents: Element
</script>

<div class="wrapper">
    <div
        bind:this={ viewport }
        class="viewport"
        tabindex="-1">
        <div
            bind:this={ contents }
            class="contents">
            <slot/>
        </div>
    </div>
    <Scrollbar
        alwaysVisible={true}
        {contents}
        hideAfter={0}
        {viewport}
    />
</div>

<style lang="stylus">
@import "variables"

.wrapper
    position relative
    display flex
    overflow hidden
    --svrollbar-track-background transparify($dark, 4%)
    --svrollbar-thumb-background transparify($dark, 20%)

.contents
    width 100%
    padding-right 10px

.viewport
    position relative
    width 100%
    display flex
    flex-direction column
    overflow scroll
    box-sizing border-box
    -ms-overflow-style none
    scrollbar-width none

.viewport::-webkit-scrollbar
    display none

</style>