<script lang="ts">
import { createEventDispatcher } from "svelte"

let dispatch = createEventDispatcher<{ close: void }>()
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="scrim" on:click={() => dispatch("close")}/>
<style lang="stylus">
@import "variables"

.scrim
    position fixed
    top 0
    left 0
    width 100vw
    height 100vh
    background transparify($dark_app, 10%)
    z-index 49
</style>
