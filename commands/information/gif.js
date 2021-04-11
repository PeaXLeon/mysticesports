const fetch = require("node-fetch")
const { prefix, tenorKey } = require("../../config.json")

module.exports = {
    name: 'gif',
    description: 'Search up a gif on tenor.com',
    usage: `${prefix}gif [search query]`,
    async execute(bot, message, args) {

        let query = args.join(' ')
        if (!query) return message.channel.send("Please specify a search query")
        
        let url = `https://g.tenor.com/v1/search?q=${query}&key=${tenorKey}&contentfilter=high`
        let response = await fetch(url)
        let json = await response.json()
        const random = Math.floor(Math.random() * json.results.length)

        message.channel.send(json.results[random].url)
    }
}