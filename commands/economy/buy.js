const eco = require("discord-economy")
const { prefix, emojiID } = require("../../config.json")

module.exports = {
    name: 'buy',
    description: 'Buy an item from the shop',
    usage: `${prefix}buy <item name>`,
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)

        let money = await eco.FetchBalance(message.author.id)
        if (money.balance === null || money.balance === 0) return message.reply("You need to withdraw some money first.")

        let item = args.join(" ")
        if (!item) return message.reply("What are you trying to buy?")

        let hasItem = bot.shop[item]
        if (!hasItem || hasItem === undefined) return message.reply("That item doesn't exist. Please make sure you typed the item name correctly.") 
        if (money.balance < hasItem.cost) return message.reply("You don't have enough money to buy that item. You need "+ hasItem.cost +" "+ emoji +".")

        let role = message.guild.roles.cache.find(r => r.name === item)

        message.reply("Congratulations! You successfully bought "+ item +"")
        await eco.SubtractFromBalance(message.author.id, hasItem.cost)
        await message.member.roles.add(role.id)
    }
}