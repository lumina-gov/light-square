import { env } from "$env/dynamic/private"
import notion_data from "$lib/data/notion_data"
import { Client } from "@notionhq/client"
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load = (async () => {
    const notion = new Client({ auth: env.NOTION_API_KEY })

    const response = await notion.databases.query({
        database_id: notion_data.authors_database_id,
    })

    const items = response.results.map(async page => {
        if (!("properties" in page)) {
            throw error(500, {
                message: "Notion API returned a result without properties",
                code: "NOTION_API_ERROR"
            })
        }

        return {
            name: (page.properties.Name as { title: Array<RichTextItemResponse> }).title.map(title => title.plain_text).join(""),
            display_picture: (page.properties["Display Picture"] as { files: Array<{ file: { url: string } }> }).files[0]?.file.url,
            slug: (page.properties.Slug as { formula: { string: string }}).formula.string,
        }
    })

    return {
        authors: await Promise.all(items)
    }
}) satisfies PageServerLoad