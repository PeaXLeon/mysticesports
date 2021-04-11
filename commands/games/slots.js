const Discord = require("discord.js")
const eco = require("discord-economy")
const db = require("quick.db")
const ms = require("parse-ms")
const color = require("../../colors.json")
const { prefix, logo, emojiID } = require("../../config.json")

module.exports = {
    name: 'slots',
    description: 'Bet your money in a game of slots',
    usage: `${prefix}slots [amount]`,
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        let user = message.author
        let wallet = await eco.FetchBalance(user.id)

        let amount = args[0]
        if (!amount) return message.reply("Please specify the amount you want to bet")
        if (isNaN(amount)) return message.reply("That's not a number")
        if (amount > wallet.balance) return message.reply("You don't have that much money")
        if (amount > 50000) return message.reply(`You can't bet more than 50.000 ${emoji} at a time`)
        if (amount.includes("-")) return message.reply("You can't bet negative money")

        let halfamount = amount / 2

        let slots = db.fetch(`slots_${user.id}`)
        let timeout = 15000

        if (slots !== null && timeout - (Date.now() - slots) > 0) {
            let time = ms(timeout - (Date.now() - slots));

            message.reply(`Woah, slow down. You have to wait \`${time.seconds}s\``)
        } else {

            let items = ['💵', '💰', '💸', '🤑', '💲'];

            let $ = items[Math.floor(items.length * Math.random())];
            let $$ = items[Math.floor(items.length * Math.random())];
            let $$$ = items[Math.floor(items.length * Math.random())];

            const play = new Discord.MessageEmbed()
                .setAuthor("#StayMystic", logo)
                .setTitle("🎰 Slot Machine 🎰")
                .setDescription("•   /   /   •")
                .setColor('RANDOM')
                .setFooter("Are you lucky?")

            const $1 = new Discord.MessageEmbed()
                .setAuthor("#StayMystic", logo)
                .setTitle("🎰 Slot Machine 🎰")
                .setDescription("• " + $ + " /   /   •")
                .setColor('RANDOM')
                .setFooter("Are you lucky?")

            const $2 = new Discord.MessageEmbed()
                .setAuthor("#StayMystic", logo)
                .setTitle("🎰 Slot Machine 🎰")
                .setDescription("• " + $ + " / " + $$ + " /   •")
                .setColor('RANDOM')
                .setFooter("Are you lucky?")


            const $3 = new Discord.MessageEmbed()
                .setAuthor("#StayMystic", logo)
                .setTitle("🎰 Slot Machine 🎰")
                .setDescription("• " + $ + " / " + $$ + " / " + $$$ + " •")
                .setColor('RANDOM')
                .setFooter("Are you lucky?")

            spinner = await message.channel.send(play)
            setTimeout(() => {
                spinner.edit($1);
            }, 1000);
            setTimeout(() => {
                spinner.edit($2);
            }, 2000);
            setTimeout(() => {
                spinner.edit($3);
            }, 3000);

            if ($$ !== $ && $$ !== $$$ && $ !== $$$) {
                setTimeout(() => {
                    $3
                        .addField("Not so lucky", `You lost ${amount} ${emoji}`)
                        .setFooter(`Better luck next time!`)
                        .setColor(color.red)

                    eco.SubtractFromBalance(user.id, amount)
                    db.set(`slots_${user.id}`, Date.now())
                    spinner.edit($3)
                }, 4000)
            } else if ($ === $$ && $ === $$$) {
                setTimeout(() => {
                    $3
                        .addField("Congratulations", `You won ${amount * 2} ${emoji}`)
                        .setFooter(`Nice!`)
                        .setColor(color.green)

                    eco.AddToBalance(user.id, amount * 2)
                    db.set(`slots_${user.id}`, Date.now())
                    spinner.edit($3)
                }, 4000)
            } else {
                setTimeout(() => {
                    $3
                        .addField("Only 2 were equal", `You lose ${halfamount.toFixed()} ${emoji}`)
                        .setFooter(`Not that bad!`)
                        .setColor(color.gold)

                    eco.SubtractFromBalance(user.id, halfamount.toFixed())
                    db.set(`slots_${user.id}`, Date.now())
                    spinner.edit($3)
                }, 4000)
            }
        }
    }
}