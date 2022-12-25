<script lang="ts">
import site_data from "$lib/data/site_data"
import TikTok from "$lib/icons/TikTok.svelte"
import Facebook from "svelte-material-icons/Facebook.svelte"
import Twitter from "svelte-material-icons/Twitter.svelte"
import Youtube from "svelte-material-icons/Youtube.svelte"
import Email from "svelte-material-icons/Email.svelte"
import Web from "svelte-material-icons/Web.svelte"
import SocialLink from "$lib/controls/SocialLink.svelte"
import Logo from "$lib/icons/Logo.svelte"
import SmallTitle from "$lib/display/SmallTitle.svelte"
import Icon from "$lib/display/Icon.svelte"
import ArrowRight from "svelte-material-icons/ArrowRight.svelte"
import Paragraph from "$lib/display/Paragraph.svelte"
import FullSocialLink from "$lib/controls/FullSocialLink.svelte"

export let sections = [
    "World",
    "Business",
    "Politics",
    "Sports",
    "Science",
    "Technology",
    "Entertainment",
    "Lifestyle",
    "Opinion",
    "Arts",
    "Culture",
    "Health",
    "Education",
    "Economy",
    "Analysis",
    "Just In",
]

export let trending = [
    "Technology",
    "Business",
    "Government",
    "Politics",
    "Sports",
    "Science",
    "Entertainment",
    "Lifestyle",
]
</script>

<footer>
    <div class="top">
        <div class="inner">
            <div>
                <Logo size="40"/>
                <a href="/about-us" class="more-link">
                    More about Light Square <Icon icon={ArrowRight} color="brand"/>
                </a>
                <Paragraph>
                    Your home for conversations, stories and events that shape the world.
                </Paragraph>
                <Paragraph>
                    Light Square is a non-profit news organization dedicated to delivering
                    high-quality journalism that informs and inspires.
                </Paragraph>
            </div>
            <div>
                <SmallTitle>Sections</SmallTitle>
                <nav class="sections">
                    {#each sections as tag}
                        <a href="/tags/{tag}" class="link">{tag}</a>
                    {/each}
                </nav>
            </div>
            <div>
                <SmallTitle>Trending</SmallTitle>
                <nav class="sections-single">
                    {#each trending as tag}
                        <a href="/tags/{tag}" class="link">{tag}</a>
                    {/each}
                </nav>
            </div>
            <div>
                <SmallTitle>Connect With Us</SmallTitle>
                <Paragraph>
                    Follow us on social media for more news.
                </Paragraph>
                <div class="sections-single">
                    <FullSocialLink icon={Facebook} href={site_data.socials.facebook}>Facebook</FullSocialLink>
                    <FullSocialLink icon={Twitter} href={site_data.socials.twitter}>Twitter</FullSocialLink>
                    <FullSocialLink icon={TikTok} href={site_data.socials.tiktok}>TikTok</FullSocialLink>
                    <FullSocialLink icon={Youtube} href={site_data.socials.youtube}>Youtube</FullSocialLink>
                    <FullSocialLink icon={Email} href={"mailto:" + site_data.socials.email}>Email</FullSocialLink>
                </div>
            </div>
        </div>
    </div>
    <div class="middle">
        <div class="inner">
            <nav class="horizontal-links">
                <a class="link" href="/editorial-policies">Editorial Policies</a>
                <a class="link" href="/about-us">About Us</a>
                <a class="link" href="/contact-us">Contact Us</a>
            </nav>
            <div class="socials">
                <SocialLink icon={Facebook} href={site_data.socials.facebook}/>
                <SocialLink icon={Twitter} href={site_data.socials.twitter}/>
                <SocialLink icon={TikTok} href={site_data.socials.tiktok}/>
                <SocialLink icon={Youtube} href={site_data.socials.youtube}/>
                <SocialLink icon={Email} href={"mailto:" + site_data.socials.email}/>
            </div>
        </div>
    </div>
    <div class="impressum">
        <Web/> All content released in the public domain
    </div>
</footer>
<style lang="stylus">
@import 'variables'

.link
    color white
    padding 6px 8px
    border-radius 4px
    font-size 14px
    font-weight 500
    &:hover
        background transparify(white, 10%)

a
    color inherit

footer
    background $dark_app
    color white

.more-link
    font-weight 600
    display flex
    gap 8px
    padding 8px 0

.top
    .inner
        display grid
        max-width $laptop
        margin 0 auto
        grid-template-columns 1.5fr 1.5fr 1fr 1fr
        @media (max-width $tablet)
            grid-template-columns 1fr 1fr
            gap 48px 24px
        @media (max-width $mobile)
            grid-template-columns 1fr
        padding 48px 16px
        gap 24px
        > div
            display flex
            gap 16px
            flex-direction column
            &:first-child
                border-left none

.sections
    display grid
    gap 0 16px
    margin -8px
    grid-template-columns 1fr 1fr
    .link
        text-transform uppercase
.sections-single
    display grid
    gap 0 16px
    margin -8px
    grid-template-columns 1fr
    .link
        text-transform uppercase



.middle
    background transparify(white, 4%)
    padding 16px
    .horizontal-links
        display flex
        flex-wrap wrap
        gap 16px
    .inner
        max-width $laptop
        display flex
        max-width $laptop
        margin 0 auto
        align-items center
        justify-content space-between
        @media (max-width $tablet)
            flex-direction column
            gap 16px
            align-items center
    .socials
        display flex
        gap 8px
        align-items center

.impressum
    background transparify(white, 4%)
    padding 16px
    display flex
    justify-content center
    border-top 1px solid transparify(white, 10%)
    color transparify(white, 50%)
    gap 8px
</style>