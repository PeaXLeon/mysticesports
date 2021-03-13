const eco = require("discord-economy")
const { prefix } = require("../config.json")

module.exports = {
    name: 'buy',
    description: 'Buy an item from the shop',
    usage: `${prefix}buy <item name>`,
    async execute(bot, message, args) {


        let money = await eco.FetchBalance(message.author.id)
        if (money === null || money === 0) return message.channel.send("You need to withdraw some money first.")

        let item = args.join(" ")
        if (!item) return message.channel.send("What are you trying to buy?")

        let hasItem = bot.shop[item]
        if (!hasItem || hasItem === undefined) return message.channel.send("That item doesn't exist. Please make sure you typed the item name correctly.") 
        if (money < hasItem.cost) return message.channel.send("You don't have enough money to buy that item. You need "+ hasItem.cost +" coins.")

        let role = message.guild.roles.cache.find(r => r.name === item)

        message.channel.send("Congratulations! You successfully bought "+ item +"")
        await eco.SubtractFromBalance(message.author.id, hasItem.cost)
        await message.member.roles.add(role.id)
    }
}