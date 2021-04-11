const Discord = require("discord.js");
const eco = require("discord-economy")
const db = require("quick.db")
const ms = require("parse-ms");
const color = require("../../colors.json")
const { logo, emojiID } = require("../../config.json")

module.exports = {
    name: 'beg',
    description: 'Beg for money... or not',
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        let user = message.author;

        let timeout = 180000;
        let amount = Math.floor(Math.random() * 250);

        let beg = await db.fetch(`beg_${user.id}`);

        let sentences = [
            `You went up to the almighty Winter and he gave you ${amount} ${emoji} so you would leave him alone. Nice!`,
            `You got ${amount} ${emoji} begging on the street. Guess it's your lucky day!`,
            `After begging 100 times, Winter finally appreciated your hard work and donated you ${amount} ${emoji}!`,
            `You tried to beg in Mystic's global chat and a fellow Staff gave you ${amount} ${emoji} just to leave.`,
            `You came to White House to ask Trump for money. He gave you ${amount} ${emoji} just to go away before security caught you.`
        ]
        let badsentences = [
            `You tried to poach a club to get some money but got nothing out of it. What a shame...`,
            `You blackmailed Winter asking for money and he banned you. You got nothing for that. Enjoy your ban noob`,
            `After begging the CFO for money for 30mins the only thing you got was a ban. Are you happy now?`,
            `You begged a club from another org to join Mystic but of course Winter didn't like it and banned you.`,
            `You begged the WHOLE day on the street but unfortunately this wasn't your lucky day. Better luck next time...`
        ]

        let randsent = Math.floor(Math.random() * sentences.length)
        let randbadsent = Math.floor(Math.random() * badsentences.length)

        if (beg !== null && timeout - (Date.now() - beg) > 0) {
            let time = ms(timeout - (Date.now() - beg));

            message.reply(`You've already begged recently. Beg again in \`${time.minutes}m ${time.seconds}s\``)
        } else {

            if (Math.random() > 0.75) {
                let nomoneyEmbed = new Discord.MessageEmbed()
                    .setColor(color.red)
                    .setDescription(badsentences[randbadsent])
                    .setFooter("#StayMystic", logo);
                message.channel.send(nomoneyEmbed)
                db.set(`beg_${user.id}`, Date.now())
            } else {
                let moneyEmbed = new Discord.MessageEmbed()
                    .setColor(color.green)
                    .setDescription(sentences[randsent])
                    .setFooter("#StayMystic", logo);
                message.channel.send(moneyEmbed)
                eco.AddToBalance(user.id, amount)
                db.set(`beg_${user.id}`, Date.now())
            }
        }
    }
}