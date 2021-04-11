const Discord = require("discord.js");
const eco = require("discord-economy")
const djs = require("djs-economy")
const color = require("../../colors.json")
const { prefix, logo, emojiID } = require("../../config.json")

module.exports = {
    name: 'deposit',
    description: 'Deposit your money into your bank',
    aliases: ['dep'],
    usage: `${prefix}deposit [amount]`,
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        let user = message.author;
        let member = await eco.FetchBalance(user.id)

        if (args[0] == 'all') {

            let wallet = await eco.FetchBalance(user.id)
            
            let embedbank = new Discord.MessageEmbed()
                .setColor(color.red)
                .setDescription("❌ You don't have any money to deposit")
                .setFooter("#StayMystic", logo)

            if (wallet.balance === 0) return message.channel.send(embedbank)

            djs.AddCash(user.id, wallet.balance)
            eco.SubtractFromBalance(user.id, wallet.balance)

            let embed5 = new Discord.MessageEmbed()
                .setColor(color.green)
                .setDescription(`✅ You have deposited ${wallet.balance} ${emoji} into your bank`)
                .setFooter("#StayMystic", logo);
            message.channel.send(embed5)

        } else {

            if (isNaN(args[0])) return message.reply("That's not a valid number!")
            let embed2 = new Discord.MessageEmbed()
                .setColor(color.orange)
                .setDescription(`❌ Specify an amount to deposit`)
                .setFooter("#StayMystic", logo);

            if (!args[0]) {
                return message.channel.send(embed2)
                    .catch(err => console.log(err))
            }
            let embed3 = new Discord.MessageEmbed()
                .setColor(color.red)
                .setDescription(`❌ You can't deposit negative money`)
                .setFooter("#StayMystic", logo);

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }
            let embed4 = new Discord.MessageEmbed()
                .setColor(color.red)
                .setDescription(`❌ You don't have that much money`)
                .setFooter("#StayMystic", logo);

            if (member.balance < args[0]) {
                return message.channel.send(embed4)
            }

            let embed5 = new Discord.MessageEmbed()
                .setColor(color.green)
                .setDescription(`✅ You have deposited ${args[0]} ${emoji} into your bank`)
                .setFooter("#StayMystic", logo);

            await message.channel.send(embed5)
            djs.AddCash(user.id, args[0])
            eco.SubtractFromBalance(user.id, args[0])
        }
    }
}