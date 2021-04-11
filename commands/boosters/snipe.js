const Discord = require("discord.js")
const db = require("quick.db")
const color = require("../../colors.json")
const { logo } = require("../../config.json")

module.exports = {
    name: 'snipe',
    description: 'Snipe the last deleted message',
    async execute(bot, message, args) {

        let snipe = db.get(`snipe_${message.guild.id}`)

        if (!message.member.roles.cache.find(r => r.name === "Mystic Top Class")) {
            return message.reply("This command is only for members who have boosted our server")
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor("#StayMystic", logo)
            .setTitle(`Message: ${snipe.msg}`)
            .setDescription(`Message from ${snipe.author.username}`)
            .setColor(color.pink)
            .setTimestamp()

        message.channel.send(embed)
    }
}