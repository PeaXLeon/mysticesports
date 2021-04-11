const request = require("node-superfetch")
const { googleToken, cseKey, prefix } = require("../../config.json")

module.exports = {
    name : 'image',
    description: 'Search an image on Google Images',
    aliases: ['img'],
    usage: `${prefix}image [search query]`,
    async execute(bot, message, args) {

        let query = args.join(' ')
        let href;
        href = await search(query)
        if (!href) return message.channel.send("Unknown search.")
        
        message.channel.send(href.link)
        
        async function search(query) {
            const { body } = await request.get(`https://www.googleapis.com/customsearch/v1?cx=${cseKey}&q=${query}&safe=medium&searchType=image&key=${googleToken}`)
            
            if (!body.items) return null
            return body.items[Math.floor(Math.random() * body.items.length)]
        }
    }
}