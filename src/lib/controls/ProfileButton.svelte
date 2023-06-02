<script lang="ts">
import Profile from "$lib/display/Profile.svelte"

export let active = false
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="profile-button-wrapper"
    class:active
    role="button"
    tabindex="0"
    on:click|stopPropagation>
    <Profile/>
</div>
<style lang="stylus">
@import 'variables'

.profile-button-wrapper
    padding 4px
    cursor pointer
    border-radius 4px
    &:hover
        background transparify(white, 4%)
    &:active
        background transparify(white, 12%)
    &.active
        background transparify(white, 8%)
</style>