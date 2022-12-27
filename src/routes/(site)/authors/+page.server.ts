import { env } from "$env/dynamic/private"
import notion_data from "$lib/data/notion_data"
import { has_no_properties } from "$lib/utils/notion_errors"
import { Client, isFullPage } from "@notionhq/client"
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import type { PageServerLoad } from "./$types"

export const load = (async () => {
    const notion = new Client({ auth: env.NOTION_API_KEY })

    const response = await notion.databases.query({
        database_id: notion_data.authors_database_id,
    })

    const items = response.results.map(async page => {
        if (!isFullPage(page)) throw has_no_properties

        return {
            name: (page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
            display_picture: (page.properties["Display Picture"] as { files: Array<{ file: { url: string } }> }).files[0]?.file.url || null,
            slug: (page.properties.Slug as { formula: { string: string }}).formula.string,
        }
    })

    return {
        authors: await Promise.all(items)
    }
}) satisfies PageServerLoad