<PageHead
    title="About Light Square"
    description="Light Square is a news site that aims to provide a balanced and unbiased perspective on the world's most pressing issues."/>
<script>
import Hero from "$lib/components/layouts/Hero.svelte"
import ResponsiveLayout from "$lib/components/layouts/ResponsiveLayout.svelte"
import VerticalLayout from "$lib/components/layouts/VerticalLayout.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import Heading from "$lib/display/Heading.svelte"
import Paragraph from "$lib/display/Paragraph.svelte"
import UnorderedList from "$lib/display/UnorderedList.svelte"
import ChevronRight from "svelte-material-icons/ChevronRight.svelte"

let links = [
    {
        name: "Editorial Policies",
        url: "/editorial-policies",
        description: "View our editorial policies and guidelines, including our commitment to accuracy, fairness, and impartiality."
    },
    {
        name: "Authors",
        url: "/authors",
        description: "Meet the team of journalists and writers who make Light Square possible and help us deliver high-quality journalism."
    },
    {
        name: "Contact Us",
        url: "/contact-us",
        description: "Get in touch with us to share your feedback, ask a question, or report a problem."
    }
]

</script>
<Hero translucent={true}>
    <VerticalLayout max_width={600}>
        <Heading underline={true}>About Light Square</Heading>
        <Paragraph>
            Light Square is a news site that aims to provide a balanced and unbiased perspective on the world's most pressing issues.
        </Paragraph>
    </VerticalLayout>
</Hero>
<Hero>
    <VerticalLayout max_width={800}>
        <Heading level={2}>Our Mission</Heading>
        <Paragraph>
            Light Square is a non-profit news organization dedicated to delivering high-quality journalism that informs and inspires.
        </Paragraph>

        <hr>

        <Heading level={2}>Our Values</Heading>
        <Paragraph>
            We believe that journalism should be:
        </Paragraph>
        <UnorderedList>
            <li>Accurate</li>
            <li>Impartial</li>
            <li>Transparent</li>
            <li>Accessible</li>
            <li>Free</li>
            <li>Objective</li>
        </UnorderedList>

        <hr>

        <Heading level={2}>Our History</Heading>
        <Paragraph>
            Light Square was founded in 2021 by a group of journalists and technologists who were frustrated by the lack of quality news sources on the internet.
        </Paragraph>
        <Paragraph>
            We believe that the internet should be a place where people can find reliable, unbiased information about the world around them.
        </Paragraph>

        <hr>

        <Heading level={2}>More Information</Heading>
        <ResponsiveLayout gap={16} min_item_size={200} align_items="strech">
            {#each links as link}
                <a href={link.url} class="link">
                    <Heading left_icon={ChevronRight} level={3}>{link.name}</Heading>
                    <Paragraph>{link.description}</Paragraph>
                </a>
            {/each}
        </ResponsiveLayout>
    </VerticalLayout>
</Hero>
<style lang="stylus">
@import "variables"

.link
    display flex
    flex-direction column
    gap 8px
    padding 16px
    color inherit
    border-radius 4px
    border 1px solid transparify($dark, 12%)
    background white
</style>