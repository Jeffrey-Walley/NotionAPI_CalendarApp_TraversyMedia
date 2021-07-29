const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client');

// initialize client
const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });

/* used to retreive information from notion server (accomplished same with Postman)
const listDatabases = async() => {
    const res = await notion.databases.list()
    console.log(res)
}
listDatabases()  */

const database_id = process.env.NOTION_DATABASE_ID

module.exports = async function getDay() {
    const payload = {
        path: `databases/${database_id}/query`,
        method: 'POST'
    }

    const { results } = await notion.request(payload)

    const days = results.map((page) => {


        return {
            id: page.id,
            title: page.properties.Name.title[0].text.content,
            date: page.properties.Date.date.start,
            // tags: page.properties.Tags.multi_select.options.name[0],
            Additional: page.properties.Additional.rich_text[0]
        }

    })

    return days
}