const eco = require("discord-economy")
const db = require("quick.db")
const ms = require("parse-ms")
const Discord = require('discord.js')
const color = require("../../colors.json")
const { logo, emojiID } = require("../../config.json")

module.exports = {
    name: 'payday',
    description: 'Grab your payday every 12h',
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        let timeout = 43200000 // 12 hours in milliseconds
        let amount = 1200

        let money = db.fetch(`net_${message.author.id}`)
        let networth = db.all().filter(data => data.ID.startsWith(`net_`)).sort((a, b) => b.data - a.data)

        var finalmsg = `You are #${networth.findIndex(data => data.ID.split('_')[1] === message.author.id) + 1} in the Mystic Esports Leaderboard!`;

        let payday = await db.fetch(`payday_${message.author.id}`);

        if (payday !== null && timeout - (Date.now() - payday) > 0) {
            let time = ms(timeout - (Date.now() - payday));

            message.reply(`You already collected your payday, you can come back and collect it in \`${time.hours}h ${time.minutes}m ${time.seconds}s\`!`)
        } else {

            await eco.AddToBalance(message.author.id, amount)
            db.add(`net_${message.author.id}`, amount)
			let money2 = db.fetch(`net_${message.author.id}`)
            
            let embed = new Discord.MessageEmbed()
                .setDescription(`Here, take some Mystic coins (+${amount} ${emoji})`)
                .setColor(color.green)
                .addField(`You have ${money2} ${emoji}`, finalmsg)
                .setFooter("#StayMystic", logo)
            message.channel.send(embed)

            db.set(`payday_${message.author.id}`, Date.now())

        }
    }
}