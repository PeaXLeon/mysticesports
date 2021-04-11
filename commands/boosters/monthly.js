const eco = require("discord-economy")
const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')
const color = require("../../colors.json")
const { logo, emojiID } = require("../../config.json")

module.exports = {
    name: 'monthly',
    description: 'Get your monthly reward (boosters only)',
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        let user = message.author
        let timeout = 2592000000 // 30 days in milliseconds
        let amount = 20000

        let money = db.fetch(`net_${message.author.id}`)
        let networth = db.all().filter(data => data.ID.startsWith(`net_`)).sort((a, b) => b.data - a.data)

        var finalmsg = `You are #${networth.findIndex(data => data.ID.split('_')[1] === message.author.id) + 1} in the Mystic Esports Leaderboard!`;
        
        let monthly = await db.fetch(`monthly_${user.id}`);

         if (!message.member.roles.cache.find(r => r.name === "Mystic Top Class")) {
            return message.reply("This command is only for members who have boosted our server")
        }
        
        if (monthly !== null && timeout - (Date.now() - monthly) > 0) {
            let time = ms(timeout - (Date.now() - monthly));

            message.reply(`You already collected your monthly reward, you can come back and collect it in \`${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s\`!`)
        } else {
            
            await eco.AddToBalance(user.id, amount)
            db.add(`net_${user.id}`, amount)
            
			let money2 = db.fetch(`net_${user.id}`)
            
            let embed = new Discord.MessageEmbed()
                .setDescription(`Here, take some Mystic coins (+${amount} ${emoji})`)
                .setColor(color.pink)
                .addField(`You have ${money2} ${emoji}`, finalmsg)
                .setFooter("#StayMystic", logo)
            message.channel.send(embed)
            
          	db.set(`monthly_${user.id}`, Date.now())

        }
    }
}