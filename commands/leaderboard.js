const Discord = require('discord.js')
const db = require('quick.db')
const eco = require("discord-economy")
const color = require("../colors.json")
const { prefix, logo } = require("../config.json")

module.exports = {
  name: 'leaderboard',
  description: 'See who is the best',
  aliases: ['top', 'best', 'lb'],
  usage: `${prefix}leaderboard [bank | wallet]`,
  async execute(bot, message, args) {

    if (!args[0]) return message.channel.send("Please specify which leaderboard you want to see. (bank or wallet)")

    if (args[0] === "wallet") {

      // let money = db.all().filter(data => data.ID.startsWith(`money`)).sort((a, b) => b.data - a.data)
      // money.length = 10;
      // var finalLb = "";
      // for (var i in money) {
      //   finalLb += `**${money.indexOf(money[i]) + 1}. ${bot.users.cache.get(money[i].ID.split('_')[1]) ? bot.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** - ${money[i].data} :dollar:\n`;
      // }
      // const embed = new Discord.MessageEmbed()
      //   .setTitle(`Wallet Leaderboard`, message.guild.iconURL())
      //   .setColor(color.blue)
      //   .setDescription(finalLb)
      //   .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
      //   .setFooter("#StayMystic", logo)
      //   .setTimestamp()
      // await message.channel.send(embed);

      eco.Leaderboard({
        limit: 10,
      }).then(async users => {

        if (users[0]) var one = await bot.users.fetch(users[0].userid) 
        if (users[1]) var two = await bot.users.fetch(users[1].userid) 
        if (users[2]) var three = await bot.users.fetch(users[2].userid)
        if (users[3]) var four = await bot.users.fetch(users[3].userid)
        if (users[4]) var five = await bot.users.fetch(users[4].userid)
        if (users[5]) var six = await bot.users.fetch(users[5].userid)
        if (users[6]) var seven = await bot.users.fetch(users[6].userid)
        if (users[7]) var eight = await bot.users.fetch(users[7].userid)
        if (users[8]) var nine = await bot.users.fetch(users[8].userid)
        if (users[9]) var ten = await bot.users.fetch(users[9].userid)

        let lb = `
        🥇 **${users[0] && users[0].balance || 'None'}** - ${one && one.tag || 'Nobody Yet'}
        🥈 **${users[1] && users[1].balance || 'None'}** - ${two && two.tag || 'Nobody Yet'}
        🥉 **${users[2] && users[2].balance || 'None'}** - ${three && three.tag || 'Nobody Yet'}
        🏅 **${users[3] && users[3].balance || 'None'}** - ${four && four.tag || 'Nobody Yet'}
        🏅 **${users[4] && users[4].balance || 'None'}** - ${five && five.tag || 'Nobody Yet'}
        🏅 **${users[5] && users[5].balance || 'None'}** - ${six && six.tag || 'Nobody Yet'}
        🏅 **${users[6] && users[6].balance || 'None'}** - ${seven && seven.tag || 'Nobody Yet'}
        🏅 **${users[7] && users[7].balance || 'None'}** - ${eight && eight.tag || 'Nobody Yet'}
        🏅 **${users[8] && users[8].balance || 'None'}** - ${nine && nine.tag || 'Nobody Yet'}
        🏅 **${users[9] && users[9].balance || 'None'}** - ${ten && ten.tag || 'Nobody Yet'}`

        const embed = new Discord.MessageEmbed()
        .setTitle(`Wallet Leaderboard`, message.guild.iconURL())
        .setColor(color.blue)
        .setDescription(lb)
        .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
        .setFooter("#StayMystic", logo)
        .setTimestamp()
      await message.channel.send(embed);
      })
    }

    if (args[0] == 'bank') {

      // let bank = db.all().filter(data => data.ID.startsWith(`bank`)).sort((a, b) => b.data - a.data)
      // bank.length = 10;
      // var finalLb = "";
      // for (var i in bank) {
      //   finalLb += `**${bank.indexOf(bank[i]) + 1}. ${bot.users.cache.get(bank[i].ID.split('_')[1]) ? bot.users.cache.get(bank[i].ID.split('_')[1]).tag : "Unknown User#0000"}** - ${bank[i].data} :dollar:\n`;
      // }
      // const bembed = new Discord.MessageEmbed()
      //   .setTitle(`Bank Leaderboard`, message.guild.iconURL())
      //   .setColor(color.blue)
      //   .setDescription(finalLb)
      //   .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
      //   .setFooter("#StayMystic", logo)
      //   .setTimestamp()
      // message.channel.send(bembed);
    }
  }
}