<PageHead
    title="Contact Us"
    description="Get in touch with us to ask questions, make media tips, suggestions, or report a problem."
    />
<script lang="ts">
import Hero from "$lib/components/layouts/Hero.svelte"
import VerticalLayout from "$lib/components/layouts/VerticalLayout.svelte"
import FullSocialLink from "$lib/controls/FullSocialLink.svelte"
import site_data from "$lib/data/site_data"
import Heading from "$lib/display/Heading.svelte"
import Paragraph from "$lib/display/Paragraph.svelte"
import Twitter from "svelte-material-icons/Twitter.svelte"
import Email from "svelte-material-icons/Email.svelte"
import MoreLinks from "$lib/components/misc/MoreLinks.svelte"
import PageHead from "$lib/components/PageHead.svelte"

let links = [
    {
        name: "Editorial Policies",
        url: "/editorial-policies",
        description: "View our editorial policies and guidelines, including our commitment to accuracy, objectiveness, and impartiality."
    },
    {
        name: "Authors",
        url: "/authors",
        description: "Meet the team of journalists and writers who make Light Square possible and help us deliver high-quality journalism."
    },
    {
        name: "About Us",
        url: "/about-us",
        description: "Learn more about Light Square, including our mission, values, affiliations and history."
    }
]
</script>
<Hero translucent={true}>
    <VerticalLayout max_width={600}>
        <Heading underline={true}>Contact Us</Heading>
        <Paragraph>
            If you have any questions, comments, media tips or corrections, please use the contact details below to get in touch.
        </Paragraph>
        <Paragraph>
            We attempt to respond to all messages within 48 hours.
        </Paragraph>
    </VerticalLayout>
</Hero>
<Hero>
    <div class="socials">
        <Heading level={2} underline={true}>Contact Links</Heading>
        <Paragraph>
            Our email is <a href={"mailto:" + site_data.socials.email}>{site_data.socials.email}</a>
        </Paragraph>
        <VerticalLayout max_width={200} align_items="stretch" gap={8}>
            <FullSocialLink theme="light" icon={Twitter} href={site_data.socials.twitter}>Twitter</FullSocialLink>
            <FullSocialLink theme="light" icon={Email} href={"mailto:" + site_data.socials.email}>Email</FullSocialLink>
        </VerticalLayout>
    </div>
</Hero>
<MoreLinks links={links}/>
<style lang="stylus">
@import "variables"

.socials
    display: flex
    flex-direction: column
    gap 16px
    padding 16px
    border-radius 8px
    border 1px solid transparify($dark, 12%)
    width 100%
    max-width 600px

</style>