const ytsr = require("ytsr")
const Discord = require("discord.js")
const color = require("../../colors.json")
const { prefix, logo } = require("../../config.json")

module.exports = {
    name: 'youtube',
    description: 'Search a video on youtube',
    aliases: ['yt', 'yt-search'],
    usage: `${prefix}youtube [query]`,
    async execute(bot, message, args) {

        const query = args.join(' ')
        if (!query) return message.reply("Please specify a search query")

        const res = await ytsr(query).catch(() => {
            return message.reply("No results were found")
        })

        const video = res.items.filter(i => i.type === "video")[0]
        if (!video) return message.reply("No results were found")

        const embed = new Discord.MessageEmbed()
            .setAuthor(video.author.name)
            .setTitle(video.title)
            .setImage(video.bestThumbnail.url)
            .setDescription(`**[${video.url}](${video.url})**`)
            .addField("Views", video.views.toLocaleString(), true)
            .addField("Duration", video.duration.toLocaleString(), true)
            .setColor(color.red)
            .setFooter("#StayMystic", logo)

        return message.channel.send(embed)
    }
}