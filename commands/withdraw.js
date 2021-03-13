const Discord = require("discord.js")
const djs = require("djs-economy")
const eco = require("discord-economy")
const color = require("../colors.json")
const { prefix, logo } = require("../config.json")

module.exports = {
    name: 'withdraw',
    description: 'Withdraw your money from your bank',
    aliases: ['with'],
    usage: `${prefix}withdraw [amount]`,
    async execute(bot, message, args) {

        let user = message.author;

        let bal = eco.FetchBalance(user.id)
        let bank = djs.GetCash(user.id)

        if(bal === null) bal = 0
        if(bank === null) bank = 0

        if (args[0] == 'all') {

            let embedbank = new Discord.MessageEmbed()
                .setColor(color.red)
                .setDescription("❌ You don't have any money to withdraw")
                .setFooter("#StayMystic", logo)

            if (bank === 0) return message.channel.send(embedbank)

            let embed5 = new Discord.MessageEmbed()
                .setColor(color.green)
                .setDescription(`✅ You have withdrawn ${bank.cash} coins from your bank`)
                .setFooter("#StayMystic", logo);
            message.channel.send(embed5)

            djs.SubCash(user.id, bank.cash)
            eco.AddToBalance(user.id, bank.cash)

        } else {
            
            if (isNaN(args[0])) return message.channel.send("That's not a valid number!")

            let embed2 = new Discord.MessageEmbed()
                .setColor(color.orange)
                .setDescription(`❌ Specify an amount to withdraw`)
                .setFooter("#StayMystic", logo);

            if (!args[0]) {
                return message.channel.send(embed2)
            }

            let embed3 = new Discord.MessageEmbed()
                .setColor(color.red)
                .setDescription(`❌ You can't withdraw negative money`)
                .setFooter("#StayMystic", logo);

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }

            let embed4 = new Discord.MessageEmbed()
                .setColor(color.red)
                .setDescription(`❌ You don't have that much money`)
                .setFooter("#StayMystic", logo);

            if (bank.cash < args[0]) {
                return message.channel.send(embed4)
            }

            djs.SubCash(user.id, args[0])
            eco.AddToBalance(user.id, args[0])

            let embed5 = new Discord.MessageEmbed()
                .setColor(color.green)
                .setDescription(`✅ You have withdrawn ${args[0]} coins from your bank`)
                .setFooter("#StayMystic", logo);

            message.channel.send(embed5)
        }
    }
}