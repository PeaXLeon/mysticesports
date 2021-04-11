const Discord = require('discord.js')
const db = require("quick.db")
const djs = require("djs-economy")
const eco = require("discord-economy")
const color = require("../../colors.json")
const { prefix, logo, emojiID } = require("../../config.json")

module.exports = {
  name: 'leaderboard',
  description: 'See who is the best',
  aliases: ['top', 'best', 'lb'],
  usage: `${prefix}leaderboard`,
  async execute(bot, message, args) {

    const emoji = message.guild.emojis.cache.find(emoji => emoji.id === emojiID)

    let networth = db.all().filter(data => data.ID.startsWith(`net_`)).sort((a, b) => b.data - a.data)

      networth.length = 10;
      var finalLb = "";

      for (var i in networth) {
        finalLb += `**${networth.indexOf(networth[i]) + 1}. <@${bot.users.cache.get(networth[i].ID.split('_')[1]) ? bot.users.cache.get(networth[i].ID.split('_')[1]).id : "Unknown User#0000"}>** • ${networth[i].data} ${emoji}\n`;
      }
      const embed = new Discord.MessageEmbed()
        .setAuthor("#StayMystic", logo)
        .setTitle(`Mystic Esports Leaderboard`, message.guild.iconURL())
        .setDescription(finalLb)
        .setColor(color.blue)
        .setTimestamp()
      message.channel.send(embed)

    // if (args[0] === "wallet") {

    //   if (message.mentions.users.first()) {

    //     var output = await eco.Leaderboard({
    //       search: message.mentions.users.first().id
    //     })
    //     message.channel.send(`**${message.mentions.users.first().tag}** is **#${output}** on the Leaderboard!`);

    //   } else {

    //     eco.Leaderboard({
    //       limit: 10
    //     }).then(async users => {

    //       if (users[0]) var one = await bot.users.fetch(users[0].userid)
    //       if (users[1]) var two = await bot.users.fetch(users[1].userid)
    //       if (users[2]) var three = await bot.users.fetch(users[2].userid)
    //       if (users[3]) var four = await bot.users.fetch(users[3].userid)
    //       if (users[4]) var five = await bot.users.fetch(users[4].userid)
    //       if (users[5]) var six = await bot.users.fetch(users[5].userid)
    //       if (users[6]) var seven = await bot.users.fetch(users[6].userid)
    //       if (users[7]) var eight = await bot.users.fetch(users[7].userid)
    //       if (users[8]) var nine = await bot.users.fetch(users[8].userid)
    //       if (users[9]) var ten = await bot.users.fetch(users[9].userid)

    //       let lb = `
    //     🥇 **${users[0] && users[0].balance || '0'}** ${emoji} - ${one && one.tag || 'Nobody Yet'}
    //     🥈 **${users[1] && users[1].balance || '0'}** ${emoji} - ${two && two.tag || 'Nobody Yet'}
    //     🥉 **${users[2] && users[2].balance || '0'}** ${emoji} - ${three && three.tag || 'Nobody Yet'}
    //     🏅 **${users[3] && users[3].balance || '0'}** ${emoji} - ${four && four.tag || 'Nobody Yet'}
    //     🏅 **${users[4] && users[4].balance || '0'}** ${emoji} - ${five && five.tag || 'Nobody Yet'}
    //     🏅 **${users[5] && users[5].balance || '0'}** ${emoji} - ${six && six.tag || 'Nobody Yet'}
    //     🏅 **${users[6] && users[6].balance || '0'}** ${emoji} - ${seven && seven.tag || 'Nobody Yet'}
    //     🏅 **${users[7] && users[7].balance || '0'}** ${emoji} - ${eight && eight.tag || 'Nobody Yet'}
    //     🏅 **${users[8] && users[8].balance || '0'}** ${emoji} - ${nine && nine.tag || 'Nobody Yet'}
    //     🏅 **${users[9] && users[9].balance || '0'}** ${emoji} - ${ten && ten.tag || 'Nobody Yet'}`

    //       const embed = new Discord.MessageEmbed()
    //         .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
    //         .setTitle(`Wallet Leaderboard`, message.guild.iconURL())
    //         .setColor(color.blue)
    //         .setDescription(lb)
    //         .setFooter("#StayMystic", logo)
    //         .setTimestamp()
    //       await message.channel.send(embed);
    //     })
    //   }
    // }

    // if (args[0] == 'bank') {

    //   if (message.mentions.users.first()) {
    //     var output = await djs.Leaderboard({
    //       search: message.mentions.users.first().id
    //     })
    //     message.channel.send(`**${message.mentions.users.first().tag}** is **#${output}** on the Leaderboard!`);
    //   } else {

    //     djs.Leaderboard({
    //       limit: 10
    //     }).then(async users => {

    //       if (users[0]) var one = await bot.users.fetch(users[0].userid)
    //       if (users[1]) var two = await bot.users.fetch(users[1].userid)
    //       if (users[2]) var three = await bot.users.fetch(users[2].userid)
    //       if (users[3]) var four = await bot.users.fetch(users[3].userid)
    //       if (users[4]) var five = await bot.users.fetch(users[4].userid)
    //       if (users[5]) var six = await bot.users.fetch(users[5].userid)
    //       if (users[6]) var seven = await bot.users.fetch(users[6].userid)
    //       if (users[7]) var eight = await bot.users.fetch(users[7].userid)
    //       if (users[8]) var nine = await bot.users.fetch(users[8].userid)
    //       if (users[9]) var ten = await bot.users.fetch(users[9].userid)

    //       let lb = `
    //     🥇 **${users[0] && users[0].cash || '0'}** ${emoji} - ${one && one.tag || 'Nobody Yet'}
    //     🥈 **${users[1] && users[1].cash || '0'}** ${emoji} - ${two && two.tag || 'Nobody Yet'}
    //     🥉 **${users[2] && users[2].cash || '0'}** ${emoji} - ${three && three.tag || 'Nobody Yet'}
    //     🏅 **${users[3] && users[3].cash || '0'}** ${emoji} - ${four && four.tag || 'Nobody Yet'}
    //     🏅 **${users[4] && users[4].cash || '0'}** ${emoji} - ${five && five.tag || 'Nobody Yet'}
    //     🏅 **${users[5] && users[5].cash || '0'}** ${emoji} - ${six && six.tag || 'Nobody Yet'}
    //     🏅 **${users[6] && users[6].cash || '0'}** ${emoji} - ${seven && seven.tag || 'Nobody Yet'}
    //     🏅 **${users[7] && users[7].cash || '0'}** ${emoji} - ${eight && eight.tag || 'Nobody Yet'}
    //     🏅 **${users[8] && users[8].cash || '0'}** ${emoji} - ${nine && nine.tag || 'Nobody Yet'}
    //     🏅 **${users[9] && users[9].cash || '0'}** ${emoji} - ${ten && ten.tag || 'Nobody Yet'}`

    //       const bembed = new Discord.MessageEmbed()
    //         .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
    //         .setTitle(`Bank Leaderboard`, message.guild.iconURL())
    //         .setColor(color.blue)
    //         .setDescription(lb)
    //         .setFooter("#StayMystic", logo)
    //         .setTimestamp()
    //       await message.channel.send(bembed);
    //     })
    //   }
    // }
  }
}