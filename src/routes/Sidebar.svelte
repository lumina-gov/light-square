<script lang="ts">
import IconButton from "$lib/controls/IconButton.svelte"
import Close from "svelte-material-icons/Close.svelte"
import Logo from "$lib/icons/Logo.svelte"
import { createEventDispatcher } from "svelte"
import { afterNavigate } from "$app/navigation"
import Tag from "$lib/display/Tag.svelte"
import ArrowRight from "svelte-material-icons/ArrowRight.svelte"
import Icon from "$lib/display/Icon.svelte"
import Heading from "$lib/display/Heading.svelte"
import SocialLink from "$lib/controls/SocialLink.svelte"
import Facebook from "svelte-material-icons/Facebook.svelte"
import Twitter from "svelte-material-icons/Twitter.svelte"
import TikTok from "$lib/icons/TikTok.svelte"
import Youtube from "svelte-material-icons/Youtube.svelte"
import Email from "svelte-material-icons/Email.svelte"
import site_data from "$lib/data/site_data"
import SquareBullet from "svelte-material-icons/Square.svelte"
import { page } from "$app/stores"

let dispatch = createEventDispatcher<{ close: void }>()

afterNavigate(() => {
    dispatch("close")
})

export let trending: { title: string, slug: string }[]

let links = [
    { title: "Front Page", href: "/" },
    { title: "About Us", href: "/about-us" },
    { title: "Contact Us", href: "/contact-us" },
    { title: "Authors", href: "/authors" },
    { title: "All Tags", href: "/tags" },
]

</script>
<div class="sidebar">
    <div class="top">
        <div class="logo-close">
            <Logo size="28"/>
            <IconButton icon={Close} on:click={() => dispatch("close")}/>
        </div>
        <nav>
            {#each links as { title, href }}
                <a {href}>
                    <Icon icon={SquareBullet} opacity={$page.url.pathname === href ? 1 : 0.5} size={8} color={$page.url.pathname === href ? "brand" : "dark"}/>
                    { title }
                </a>
            {/each}
        </nav>
    </div>
    <div class="bottom">
        <a class="editorial-policies" href="/editorial-policies">
            <Tag color="yellow">Editorial Policies</Tag>
            <div class="editorial-text">Read our editorial guiding principles <Icon icon={ArrowRight}/></div>
        </a>
        <div class="trending">
            <Heading level={3}>Trending</Heading>
            <div class="tags">
                {#each trending as { title, slug }}
                    <Tag color="white" href="/tags/{slug}">{ title }</Tag>
                {/each}
            </div>
        </div>
        <div class="socials">
            <SocialLink icon={Facebook} href={site_data.socials.facebook}/>
            <SocialLink icon={Twitter} href={site_data.socials.twitter}/>
            <SocialLink icon={TikTok} href={site_data.socials.tiktok}/>
            <SocialLink icon={Youtube} href={site_data.socials.youtube}/>
            <SocialLink icon={Email} href={"mailto:" + site_data.socials.email}/>
        </div>
    </div>
</div>
<style lang="stylus">
@import "variables"

nav
    display flex
    flex-direction column
    margin -8px
    padding 16px 0
    a
        padding 8px
        color inherit
        gap 8px
        display flex
        align-items center
        font-size 18px
        font-weight 600
        border-radius -8px
        &:hover
            background transparify($dark, 8%)
.top
    padding 24px

.logo-close
    display flex
    align-items center
    justify-content space-between
.bottom
    background $dark_app
    color white
    .editorial-policies
        display flex
        flex-direction column
        align-items flex-start
        gap 8px
        padding 24px
        color inherit
        .editorial-text
            display flex
            align-items center
            gap 8px
            opacity 0.8
            font-size 16px
    .trending
        padding 24px
        background transparify(white, 5%)
        .tags
            display flex
            flex-direction column
            padding 16px 0
            align-items flex-start
            gap 8px
    .socials
        background transparify(white, 10%)
        padding 24px
        display flex
        justify-content center
        gap 8px

.sidebar
    position fixed
    display flex
    flex-direction column
    justify-content space-between
    top 0
    left 0
    max-width 400px
    width 100%
    height 100vh
    overflow-y auto
    background white
    z-index 51
    box-shadow 0 0 10px rgba(0, 0, 0, 0.2)

</style>