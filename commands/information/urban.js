const Discord = require("discord.js")
const urban = require("relevant-urban")
const color = require("../../colors.json")
const { prefix, logo } = require("../../config.json")

module.exports = {
    name: 'urban',
    description: 'Search up a word on the urban dictionary',
    usage: `${prefix}urban [word]`,
    async execute(bot, message, args) {

        if (!args[0]) return message.reply("Please specify what you want to search up")

        let res = await urban(args[0]).catch(() => {
            return message.reply("No results were found")
        })

        const embed = new Discord.MessageEmbed()
            .setAuthor("Urban Dictionary")
            .setColor(color.blue)
            .setTitle(res.word)
            .setURL(res.urbanURL)
            .setDescription(`**Description**\n**${res.definition}**\n\n**Example**\n**${res.example}**`)
            .addField('Author', res.author, true)
            .addField('Rating', `👍 ${res.thumbsUp.toLocaleString()} | 👎 ${res.thumbsDown.toLocaleString()}`)
            .setFooter("#StayMystic", logo)

        if (res.tags.length > 0 && res.tags.join(" ").length < 1024) {
            embed.addField('Tags', res.tags.join(', '), true)
        }

        return message.channel.send(embed)
    }
}