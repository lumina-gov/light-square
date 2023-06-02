<PageHead
    description="Light Square is a news site that aims to provide a balanced and unbiased perspective on the world's most pressing issues."
    title="About Light Square"/>
<script>
import Hero from "$lib/components/layouts/Hero.svelte"
import VerticalLayout from "$lib/components/layouts/VerticalLayout.svelte"
import MoreLinks from "$lib/components/misc/MoreLinks.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import Heading from "$lib/display/Heading.svelte"
import Paragraph from "$lib/display/Paragraph.svelte"
import UnorderedList from "$lib/display/UnorderedList.svelte"

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
        <div class="section">
            <Heading level={2}>Our Mission</Heading>
            <Paragraph>
                Light Square is a non-profit news organization dedicated to delivering high-quality journalism that informs and inspires.
            </Paragraph>
        </div>

        <div class="section">
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
        </div>


        <div class="section">
            <Heading level={2}>Our History</Heading>
            <Paragraph>
                Light Square was founded in 2021 by the people of Lumina and journalists and technologists who were frustrated by the lack of quality news sources on the internet.
            </Paragraph>
            <Paragraph>
                We believe that the internet should be a place where people can find reliable, unbiased information about the world around them.
            </Paragraph>
        </div>


        <div class="section">
            <Heading level={2}>Our Affiliations</Heading>
            <Paragraph>
                Light Square is an independently managed official government organisation of the <a href="https://lumina.earth">Government of Lumina</a>
            </Paragraph>
            <Paragraph>
                Light Square is not affiliated with any other branches or departments of the government and this ensures journalistic independence and integrity.
            </Paragraph>
        </div>
    </VerticalLayout>
</Hero>
<MoreLinks links={links}/>
<style lang="stylus">
@import "variables"

.section
    padding 16px
    border-radius 8px
    display flex
    flex-direction column
    gap 12px
    border 1px solid transparify($dark, 12%)
    width 100%
</style>