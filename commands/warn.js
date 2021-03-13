const db = require("quick.db")
const { prefix } = require("../config.json");
const color = require("../colors.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "warn",
  description: "Warn anyone who do not obey the rules",
  usage: `${prefix}warn [user] [reason]`,
  execute(bot, message, args) {

    const staff = message.guild.roles.cache.find(r => r.name === "Mystic Staff")
    
    if(!message.member.roles.cache.find(staff)) {
      return message.channel.send("You don't have permission to use this command!")
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
      return message.channel.send("Please mention the person you want to warn")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("You can't warn bots")
    }
    
    if(message.author.id === user.id) {
      return message.channel.send("You can't warn yourself")
    }
    
    if(user.id === message.guild.owner.id) {
      return message.channel.send("You can't warn the server owner -_-")
    }
    
    const reason = args.slice(1).join(" ")
    
    if(!reason) {
      return message.channel.send("Please provide the reason to warn")
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

    const embed = new MessageEmbed()
      .setTitle(`***${user.user.username} has been warned***`)
      .setColor(color.red)
    
    if(warnings === null) {
        db.set(`warnings_${message.guild.id}_${user.id}`, 1)
        user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
        message.channel.send(embed)
    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
        user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
        message.channel.send(embed)
    }
  } 
}