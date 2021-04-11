const eco = require("discord-economy")
const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')
const color = require("../../colors.json")
const { logo, emojiID } = require("../../config.json")

module.exports = {
    name: 'weekly',
    description: 'Get your weekly reward',
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        let user = message.author
        let timeout = 604800000 // 7 days in milliseconds
        let amount = 2000

        let money = db.fetch(`net_${message.author.id}`)
        let networth = db.all().filter(data => data.ID.startsWith(`net_`)).sort((a, b) => b.data - a.data)

        var finalmsg = `You are #${networth.findIndex(data => data.ID.split('_')[1] === message.author.id) + 1} in the Mystic Esports Leaderboard!`;
        
        let weekly = await db.fetch(`weekly_${user.id}`);

        if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
            let time = ms(timeout - (Date.now() - weekly));

            message.reply(`You already collected your weekly reward, you can come back and collect it in \`${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s\`!`)
        } else {
            
            await eco.AddToBalance(user.id, amount)
            db.add(`net_${user.id}`, amount)
			let money2 = db.fetch(`net_${user.id}`)
            
            let embed = new Discord.MessageEmbed()
                .setDescription(`Here, take some Mystic coins (+${amount} ${emoji})`)
                .setColor(color.green)
                .addField(`You have ${money2} ${emoji}`, finalmsg)
                .setFooter("#StayMystic", logo)
            message.channel.send(embed)

            db.set(`weekly_${user.id}`, Date.now())

        }
    }
}