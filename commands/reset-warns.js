const db = require("quick.db")
const { prefix } = require("../config.json");

module.exports = {
  name: "reset-warns",
  aliases: ['rwarns', 'delwarns'],
  description: "Reset warnings of mentioned person",
  usage: `${prefix}reset-warns [user]`,
  execute(bot, message, args) {
    
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Yopu should have admin perms to use this command")
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
    return message.channel.send("Please mention the person whose warnings you want to reset")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("Bots aren't allowed to have warnings")
    }
    
    if(message.author.id === user.id) {
      return message.channel.send("You aren't allowed to reset your warnings")
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} doesn't have any warnings`)
    }
    
    db.delete(`warnings_${message.guild.id}_${user.id}`)
    user.send(`All your warnings in ${message.guild.name} have been reseted by ${message.author.username}`)
    message.channel.send(`Reseted all warnings of ${message.mentions.users.first().username}`)
    
}
}