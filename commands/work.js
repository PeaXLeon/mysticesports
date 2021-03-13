const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms");
const eco = require("discord-economy")
const color = require("../colors.json")
const { logo } = require("../config.json")

module.exports = {
    name: 'work',
    description: 'Work to earn money',
    async execute(bot, message, args) {
    
        let user = message.author;
        let work = await db.fetch(`work_${user.id}`)
    
        let timeout = 300000;
        
        if (work !== null && timeout - (Date.now() - work) > 0) {
            let time = ms(timeout - (Date.now() - work));
        
            message.channel.send(`You have already worked recently. Go take a break jeez. Try again in \`${time.minutes}m ${time.seconds}s\``)
          } else {

            let amount = Math.floor(Math.random() * 600) + 1;
            let replies = [
                `You worked for the CIA and they gave you ${amount} coins for your good work!`,
                `You went on a rampage as a professional WWE fighter and won ${amount} coins!`,
                `Your job at NASA finally paid of and you got ${amount} coins richer!`,
                `Your boss congratulates your fantastic work with ${amount} coins!`,
                `One of your co-workers helped you in a project and you got ${amount} coins from your boss!`,
                `You sold some Mystic Passes and got ${amount} coins!`,
                `You worked all day long just to get ${amount} coins. I mean... it's still money, so... congratulations!`
            ]
    
            let result = Math.floor(Math.random() * replies.length);
            let embed1 = new Discord.MessageEmbed()
            .setColor(color.gold)
            .setDescription(replies[result])
            .setFooter("#StayMystic", logo);
            message.channel.send(embed1)
            
            eco.AddToBalance(user.id, amount)
            db.set(`work_${user.id}`, Date.now())
        };
    }
}