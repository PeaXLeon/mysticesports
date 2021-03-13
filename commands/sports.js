const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")
const eco = require("discord-economy")
const color = require("../colors.json")

module.exports = {
    name: 'sports',
    description: 'Play any sport to (try and) earn money',
    aliases: ['sport'],
    async execute(bot, message, args) {

        let user = message.author

        let timeout = 180000
        let amount = Math.floor(Math.random() * 250) + 75

        let sports = db.fetch(`sports_${user.id}`)

        let yes = [
            `You and your beloved team won the World Championship in Volleyball. As a reward you get a part of the prize. You are now ${amount} coins richer! Congrats!`,
            `You were elected the best Basketball player this year and won ${amount} coins.`,
            `Your team did very well in the Hockey Championship and got 3rd place. You still won ${amount} coins!`,
            `Your Soccer team won the Champions League and you got ${amount} coins!`,
            `You defeated the best Table-Tennis player in the world and your fans donated you ${amount} coins!`,
            `You got the chance to compete in the Surf Pro League and you performed very well getting you ${amount} coins.`,
            `You got a contract to play in a team that is a League above you and you got ${amount} coins as a bonus!`,
            `Your team won the NFL and you got ${amount} coins for it`
        ]
        let no = [
            `Your team got 4th on your group in the Champions League and you won nothing. Better luck next time`,
            `You were so bad that your team doesn't want you to play so you gave up on that sport and basically got nothing out of it. What a waste of time...`,
            `You tried out Golf for the first time but you accidentaly hit a old woman in the face and you got banned from Golf. What a first impression mate.`,
            `Your team lost the qualifiers to the Volleyball World Championship and you got nothing.`,
            `You didn't perform well in your Basketball team so your Coach kicked you out. What a shame`,
            `You were loved by your fans as a Hockey player but you have been filmed betraying your girlfriend and the it landed on the news so your career goes *bye have a great time*`
        ]

        let randyes = Math.floor(Math.random() * yes.length)
        let randno = Math.floor(Math.random() * no.length)

        if (sports !== null && timeout - (Date.now() - sports) > 0) {
            let time = ms(timeout - (Date.now() - sports));

            message.channel.send(`You've already played with your team recently. You are tired and need to wait \`${time.minutes}m ${time.seconds}s\``)
        } else {

            if (Math.random() > 0.8) {
                let nomoneyEmbed = new Discord.MessageEmbed()
                    .setColor(color.red)
                    .setDescription(no[randno])
                    .setFooter("#StayMystic", logo);
                message.channel.send(nomoneyEmbed)

                db.set(`sports_${user.id}`, Date.now())

            } else {
                let moneyEmbed = new Discord.MessageEmbed()
                    .setColor(color.green)
                    .setDescription(yes[randyes])
                    .setFooter("#StayMystic", logo);
                message.channel.send(moneyEmbed)

                eco.AddToBalance(user.id, amount)
                db.set(`sports_${user.id}`, Date.now())
            }
        }
    }
}