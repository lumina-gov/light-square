<PageHead
    title="Editorial Policies & Guidelines"
    description="Light Square sets high standards for the quality of its content, and the information on this site will help you trust those standards."/>
<script lang="ts">
import Hero from "$lib/components/layouts/Hero.svelte"
import VerticalLayout from "$lib/components/layouts/VerticalLayout.svelte"
import MoreLinks from "$lib/components/misc/MoreLinks.svelte"
import PageHead from "$lib/components/PageHead.svelte"
import Heading from "$lib/display/Heading.svelte"
import Paragraph from "$lib/display/Paragraph.svelte"
import Quote from "$lib/display/Quote.svelte"

let links = [
    {
        name: "Authors",
        url: "/authors",
        description: "Meet the team of journalists and writers who make Light Square possible and help us deliver high-quality journalism."
    },
    {
        name: "About Us",
        url: "/about-us",
        description: "Learn more about Light Square, including our mission, values, affiliations and history."
    },
    {
        name: "Contact Us",
        url: "/contact-us",
        description: "Get in touch with us to ask questions, make media tips, suggestions, or report a problem."
    },
]
</script>
<Hero translucent={true}>
    <VerticalLayout max_width={600}>
        <Heading underline={true}>Editorial Policies & Guidelines</Heading>
        <Paragraph>
            Light Square sets high standards for the quality of its content, and the information on this site will help you trust those standards.
        </Paragraph>
    </VerticalLayout>
</Hero>
<Hero>
    <VerticalLayout max_width={600}>
        <Quote>
            <Heading level={2}>
                Our Commmitment
            </Heading>
            <Paragraph>
                At Light Square, we are committed to upholding the highest standards of journalism and editorial integrity
            </Paragraph>
            <Paragraph>
                We strive to be accurate, fair, and impartial in all of our reporting, and we hold ourselves accountable to these standards.
                We believe in transparency and honesty, and we strive to be open and accountable to our readers.
            </Paragraph>
            <Paragraph>
                We respect the diversity of opinions and viewpoints in the world, and we aim to present a range of perspectives in our coverage.
                We are committed to protecting the privacy of our readers and sources, and we adhere to strict ethical guidelines when it comes to the handling of personal information.
            </Paragraph>
            <Paragraph>
                We are committed to continuous learning and improvement, and we strive to stay at the forefront of best practices in journalism.
                We welcome feedback and suggestions from our readers, and we take all comments and criticisms seriously.
            </Paragraph>
        </Quote>
        <hr>

        <Heading level={2}>Editorial Policies</Heading>

        <Heading level={3} underline={true}>Accuracy</Heading>
        <Paragraph>
            We strive to be accurate in all of our reporting, and we take great care to ensure that our content is factually correct.
            We verify all information before publication, and we make every effort to ensure that our reporting is accurate and fair.
        </Paragraph>

        <Heading level={3} underline={true}>Fairness</Heading>
        <Paragraph>
            We strive to be fair in all of our reporting, and we take great care to ensure that our content is fair and impartial.
            We strive to present a range of perspectives in our coverage, and we aim to be open and transparent in our reporting.
        </Paragraph>

        <Heading level={3} underline={true}>Impartiality</Heading>
        <Paragraph>
            We strive to be impartial in all of our reporting, and we take great care to ensure that our content is fair and impartial.
            We strive to present a range of perspectives in our coverage, and we aim to be open and transparent in our reporting.
        </Paragraph>

        <Heading level={3} underline={true}>Independence</Heading>
        <Paragraph>
            We strive to be independent in all of our reporting, and we take great care to ensure that our content is fair and impartial.
            We strive to present a range of perspectives in our coverage, and we aim to be open and transparent in our reporting.
        </Paragraph>

        <Heading level={3} underline={true}>Integrity</Heading>
        <Paragraph>
            We believe in transparency and honesty, and we strive to be open and accountable to our readers.
            We strive to uphold the highest standards of journalism and editorial integrity, and we hold ourselves accountable to these standards.
        </Paragraph>

        <Heading level={3} underline={true}>Acknowledging & Fixing Errors</Heading>
        <Paragraph>
            We strive to be accurate in all of our reporting, and we take great care to ensure that our content is factually correct.
            We verify all information before publication, and we make every effort to ensure that our reporting is accurate and fair.
        </Paragraph>

        <Heading level={3} underline={true}>Objectiveness</Heading>
        <Paragraph>
            Excluding articles marked as "Opinion" pieces, we strive to be objective in all of our reporting.
            Ensuring, as much as possible, that our content is factually correct, and unbiased from the personal opinions of our writers.
        </Paragraph>
    </VerticalLayout>
</Hero>
<MoreLinks links={links}/>