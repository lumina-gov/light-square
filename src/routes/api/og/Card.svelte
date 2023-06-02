<script lang="ts">
import Logo from "$lib/icons/LogoSvgFull.svelte"
import ChevronRight from "svelte-material-icons/ChevronRight.svelte"


export let title: string
export const description: string | null = null

</script>
<div class="card">
    <div class="logo">
        <Logo/>
    </div>
    <h1>
        { title }
    </h1>
    <div class="fake-button">
        <div class="text">Read More</div>
        <ChevronRight size="1.2em"/>
    </div>
</div>
<style lang="stylus">
@import variables

.fake-button
    display flex
    align-items center
    gap 12px
    font-size 2.5em
    font-weight bold
    padding 0.5em 1em
    padding-right 0.5em
    text-decoration none
    border-radius 10px
    color white
    background $brand

h1
    display flex
    font-size 4em
    font-weight 600
    line-height 100%
    padding-left 0.4em
    border-left 0.3em solid $brand
    padding-bottom 0.3em

.card
    background linear-gradient(90deg, mix($brand, $dark_app, 15%), $dark_app)
    width 100%
    padding 3em
    gap 2em
    height 100%
    display flex
    align-items flex-start
    flex-direction column
    color white
    justify-content center


.logo
    display flex
    align-items center
    gap 0.5em
    font-size 4em
    text-decoration none
    color white

</style>
