const { MessageEmbed } = require("discord.js")
const color = require("../../colors.json")
const { prefix, logo, emojiID } = require("../../config.json")

module.exports = {
    name: "store",
    description: "See what we have to sell",
    aliases: ["shop"],
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        let items = Object.keys(bot.shop);
        // let content = "";

        // for (var i in items) {
        //     content += `${message.guild.roles.cache.find(r => r.name === items[i])} - *${bot.shop[items[i]].cost}* ${emoji}\n`
        // }

        // const embed = new MessageEmbed()
        //     .setAuthor("Mystic Esports Shop", "https://i.imgur.com/c6DGqm0.png")
        //     .setTitle("Visit #shop to get more info on each of these roles!")
        //     .setDescription(content)
        //     .addField('\u200B', 'Use the `buy` command to buy one of these items')
        //     .setFooter("#StayMystic", logo)
        //     .setColor(color.blue)
        //     .setTimestamp()
        // message.channel.send(embed)

        const embed = new MessageEmbed()
            .setAuthor("#StayMystic", logo)
            .setTitle("Mystic Esports Shop", "https://i.imgur.com/c6DGqm0.png")
            .setDescription("Visit the #shop channel to get more info on each of these roles!")
            .addFields(
                { name: '🔵 Blue Colors', value: `${message.guild.roles.cache.find(r => r.name === items[0])} - ${bot.shop[items[0]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[1])} - ${bot.shop[items[1]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[2])} - ${bot.shop[items[2]].cost} ${emoji}` },
                { name: '🟠 Orange Colors', value: `${message.guild.roles.cache.find(r => r.name === items[3])} - ${bot.shop[items[3]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[4])} - ${bot.shop[items[4]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[5])} - ${bot.shop[items[5]].cost} ${emoji}` },
                { name: '🔴 Red Colors', value: `${message.guild.roles.cache.find(r => r.name === items[6])} - ${bot.shop[items[6]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[7])} - ${bot.shop[items[7]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[8])} - ${bot.shop[items[8]].cost} ${emoji}` },
                { name: '🟡 Yellow Colors', value: `${message.guild.roles.cache.find(r => r.name === items[9])} - ${bot.shop[items[9]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[10])} - ${bot.shop[items[10]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[11])} - ${bot.shop[items[11]].cost} ${emoji}` },
                { name: '🟢 Green Colors', value: `${message.guild.roles.cache.find(r => r.name === items[12])} - ${bot.shop[items[12]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[13])} - ${bot.shop[items[13]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[14])} - ${bot.shop[items[14]].cost} ${emoji}` },
                { name: '🟣 Pink Colors', value: `${message.guild.roles.cache.find(r => r.name === items[15])} - ${bot.shop[items[15]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[16])} - ${bot.shop[items[16]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[17])} - ${bot.shop[items[17]].cost} ${emoji}` },
                { name: '⚪ Special Colors', value: `${message.guild.roles.cache.find(r => r.name === items[18])} - ${bot.shop[items[18]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[19])} - ${bot.shop[items[19]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[20])} - ${bot.shop[items[20]].cost} ${emoji}` },
                { name: '🔓 Permission Roles', value: `${message.guild.roles.cache.find(r => r.name === items[21])} - ${bot.shop[items[21]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[22])} - ${bot.shop[items[22]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[23])} - ${bot.shop[items[23]].cost} ${emoji}` },
                { name: '🖊️ Community Roles', value: `${message.guild.roles.cache.find(r => r.name === items[24])} - ${bot.shop[items[24]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[25])} - ${bot.shop[items[25]].cost} ${emoji}\n${message.guild.roles.cache.find(r => r.name === items[26])} - ${bot.shop[items[26]].cost} ${emoji}` }
            )
            .setFooter(`Use \'${prefix}buy [item]\' to buy one of these items`)
            .setColor(color.blue)
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL())
        message.channel.send(embed)
    }
}