const eco = require("discord-economy")
const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')
const color = require("../colors.json")
const { logo } = require("../config.json")

module.exports = {
    name: 'weekly',
    description: 'Get your weekly reward',
    async execute(bot, message, args) {

        let user = message.author
        let timeout = 604800000 // 7 days in milliseconds
        let amount = 2000

        let weekly = await db.fetch(`weekly_${user.id}`);

        if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
            let time = ms(timeout - (Date.now() - weekly));

            message.channel.send(`You already collected your weekly reward, you can come back and collect it in \`${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s\`!`)
        } else {
            let embed = new Discord.MessageEmbed()
                .setAuthor(`Weekly Reward`, message.author.displayAvatarURL())
                .setColor(color.green)
                .addField(`Collected`, amount)
                .setFooter("#StayMystic", logo)

            message.channel.send(embed)
            eco.AddToBalance(user.id, amount)
            db.set(`weekly_${user.id}`, Date.now())

        }
    }
}