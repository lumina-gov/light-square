<script lang="ts">
import AlertBar from "./AlertBar.svelte"
import Footer from "./Footer.svelte"
import Header from "./Header.svelte"
import PageLoaderBar from "./PageLoaderBar.svelte"
</script>

<svelte:head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="manifest" href="/manifest.json">
</svelte:head>
<PageLoaderBar/>
<AlertBar/>
<Header/>
<main>
    <slot/>
</main>
<Footer/>

<style lang="stylus">
:global
    @import 'normalise'
    @import 'variables'

    html
        display flex
        min-height 100%
        flex 1
        margin 0
        padding 0

    h1, h2, h3, h4, h5, h6
        font-weight 500

    a
        text-decoration none
        color $brand
        &:hover
            color lighten($brand, 10%)

    body
        background white
        color $dark
        flex 1
        display flex
        flex-direction column
        margin 0
        padding 0
        min-height 100%
        font-family 'Prompt', sans-serif
        max-width 100%

    main
        flex 1
</style>