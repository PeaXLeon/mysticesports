const Discord = require("discord.js");
const eco = require("discord-economy")
const color = require("../../colors.json")
const { prefix, logo, emojiID } = require("../../config.json")

module.exports = {
    name: 'share',
    description: 'Give your money to someone',
    aliases: ['pay', 'give', 'gift', 'transfer'],
    usage: `${prefix}share [user] [amount]`,
    async execute(bot, message, args) {
    
        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        let user = message.mentions.users.first()
        let member = await eco.FetchBalance(message.author.id)
    
        if (!user) {
            return message.reply("Please specify who you want to share coins with")
        }
    
        if (!args[1]) {
            return message.reply("Please specify the amount of money you want to share.")
        }
        let embed3 = new Discord.MessageEmbed()
            .setColor(color.red)
            .setDescription(`❌ You can't pay someone negative money`)
            .setFooter("#StayMystic", logo);
    
        if (message.content.includes('-')) {
            return message.channel.send(embed3)
        }
        let embed4 = new Discord.MessageEmbed()
            .setColor(color.red)
            .setDescription(`❌ You don't have that much money`)
            .setFooter("#StayMystic", logo);
    
        if (member < args[1]) {
            return message.channel.send(embed4)
        }

        eco.Transfer(message.author.id, user.id, args[1])
    
        let member2 = await eco.FetchBalance(message.author.id)
        let userbal = await eco.FetchBalance(user.id)

        let embed5 = new Discord.MessageEmbed()
            .setColor(color.green)
            .setDescription(`✅ You have payed ${user.username} ${args[1]} ${emoji}`)
            .addFields(
                { name: 'Your New Balance', value: `${member2.balance} ${emoji}`}, 
                { name: `${user.username}'s New Balance`, value: `${userbal.balance} ${emoji}` }
            )
            .setFooter("#StayMystic", logo);
    
        message.channel.send(embed5)
    }
}