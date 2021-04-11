const Discord = require("discord.js");
const db = require("quick.db");
const eco = require("discord-economy")
const ms = require("parse-ms");
const color = require("../../colors.json")
const { logo, prefix, emojiID } = require("../../config.json")

module.exports = {
    name: 'rob',
    description: '(Try to) Rob a user',
    aliases: ['steal'],
    usage: `${prefix}rob [user]`,
    async execute(bot, message, args) {

        const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)
        let user = message.mentions.users.first()

        if (!user) return message.reply("Please specify who to rob")

        let targetuser = await eco.FetchBalance(user.id)
        let author = await db.fetch(`rob_${message.author.id}`)
        let author2 = await eco.FetchBalance(message.author.id)

        let timeout = 600000;

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));

            message.reply(`You have already robbed someone. Try again in \`${time.minutes}m ${time.seconds}s\``)
        } else {

            let moneyEmbed = new Discord.MessageEmbed()
                .setColor(color.red)
                .setDescription(`You need atleast 200 ${emoji} in your wallet to rob someone`)
                .setFooter("#StayMystic", logo);

            if (author2.balance < 200) {
                return message.channel.send(moneyEmbed)

            }
            let moneyEmbed2 = new Discord.MessageEmbed()
                .setColor(color.red)
                .setDescription(`${user.username} does not have anything you can rob`)
                .setFooter("#StayMystic", logo);
            if (targetuser.balance <= 0) {
                return message.channel.send(moneyEmbed2)
            }
            let selfrob = new Discord.MessageEmbed()
                .setColor(color.red)
                .setDescription('You can\'t rob yourself, you dumb dumb')
                .setFooter("#StayMystic", logo)
            if (user.id === message.author.id) {
                return message.channel.send(selfrob)
            }

            let random = Math.floor(Math.random() * targetuser.balance);
            let randomlose = Math.floor(Math.random() * (author2.balance - (author2.balance / 2)));

            let answersFail = [
                `You try to be sneaky and rob ${user.username} but you sneeze and he/she sees you. He/She then does the Uno-Reverse-Card and steals ${randomlose} ${emoji} from you`,
                `After successfully stealing from ${user.username} you trip on a banana and ${user.username} grabs your wallet, which leads to you losing ${randomlose} ${emoji}`,
                `You put the hand inside ${user.username}'s wallet trying to steal. What you don't notice is, ${user.username} is from the police. You have to pay ${randomlose} ${emoji} to him/her`,
                `You are very drunk. In a bar. You proceed to steal money from ${user.username}, who is the boss. He/She calls the security and they take ${randomlose} ${emoji} from your wallet`,
                `You try to rob ${user.username}. What you didn't know is that she is a karen and she sprays you with gas. You fall down and she takes ${randomlose} ${emoji} from your wallet`
            ]
            let answersSuccess = [
                `You hide in the bushes and steal ${user.username}'s wallet without them noticing. You just got ${random} ${emoji} richer. Nice`,
                `After waiting 10 hours for ${user.username}'s meeting to end, ${user.username} finally walks out and you successfully take ${random} ${emoji} away from him/her`,
                `You see ${user.username} in a bus station. You walk up to him/her and take ${random} ${emoji} from his/her wallet. This is what I call a "smooth criminal"`,
                `You are walking down the street with your girlfriend/boyfriend and see ${user.username}. Your girlfriend/boyfriend stole ${random} ${emoji} from ${user.username}. Watch out who you date mate`,
                `${user.username}'s wallet falls down while you were walking and instead of giving it back you steal ${random} ${emoji}. What a meanie`
            ]

            let randAnswerFail = Math.floor(Math.random() * answersFail.length)
            let randAnswerSuccess = Math.floor(Math.random() * answersSuccess.length)

            if (Math.random() > 0.33) {

                let embedno = new Discord.MessageEmbed()
                    .setDescription(answersFail[randAnswerFail])
                    .setColor(color.red)
                    .setFooter("#StayMystic", logo)
                message.channel.send(embedno)

                eco.SubtractFromBalance(message.author.id, randomlose)
                eco.AddToBalance(user.id, randomlose)
                db.set(`rob_${message.author.id}`, Date.now())

            } else {

                let embed = new Discord.MessageEmbed()
                    .setDescription(answersSuccess[randAnswerSuccess])
                    .setColor(color.green)
                    .setFooter("#StayMystic", logo)
                message.channel.send(embed)

                eco.SubtractFromBalance(user.id, random)
                eco.AddToBalance(message.author.id, random)
                db.set(`rob_${message.author.id}`, Date.now())
            }
        }
    }
}