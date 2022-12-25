<script lang="ts">
export let size = "32px"
export let url: string | undefined = undefined

</script>

<div class="profile" style="
    --size: {size};
    {url ? `background-image: url(${url})` : ""};
">

</div>
<style lang="stylus">
@import 'variables'

.profile
    height var(--size)
    width var(--size)
    flex 0 0 auto
    background transparify(white, 20%)
    background-size cover
    background-position center
    border-radius 100px

</style>