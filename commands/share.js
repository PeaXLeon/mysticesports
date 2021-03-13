const Discord = require("discord.js");
const eco = require("discord-economy")
const color = require("../colors.json")
const { prefix, logo } = require("../config.json")

module.exports = {
    name: 'share',
    description: 'Give your money to someone',
    aliases: ['pay', 'give', 'gift', 'transfer'],
    usage: `${prefix}share [user] [amount]`,
    async execute(bot, message, args) {
    
        let user = message.mentions.users.first()
        let member = await eco.FetchBalance(message.author.id)
    
        if (!user) {
            return message.channel.send("Please specify who you want to share coins with")
        }
    
        if (!args[1]) {
            return message.channel.send("Please specify the amount of money you want to share.")
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
            .setDescription(`✅ You have payed ${user.username} ${args[1]} coins`)
            .addFields(
                { name: 'Your New Balance', value: member2.balance }, 
                { name: `${user.username}'s New Balance`, value: userbal.balance }
            )
            .setFooter("#StayMystic", logo);
    
        message.channel.send(embed5)
    }
}