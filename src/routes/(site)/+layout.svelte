<script lang="ts">
import Footer from "./Footer.svelte"
import Header from "./Header.svelte"
</script>

<Header/>
<main>
    <slot/>
</main>
<Footer/>

<style lang="stylus">
@import 'variables'

main
    flex 1
</style>