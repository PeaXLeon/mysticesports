const db = require("quick.db")
const { prefix } = require("../../config.json");

module.exports = {
  name: "reset-warns",
  aliases: ['rwarns', 'delwarns'],
  description: "Reset warnings of mentioned person",
  usage: `${prefix}reset-warns [user]`,
  execute(bot, message, args) {

    const user = message.mentions.members.first()

    if(!user) return message.reply("Please mention the person whose warnings you want to reset")
    
    if(!message.member.roles.cache.find(r => r.name === "Board of Directors") && !message.member.roles.cache.find(r => r.name === "Chairman") && !message.member.roles.cache.find(r => r.name === "Founder")) return
    if(message.mentions.users.first().bot) return
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} doesn't have any warnings`)
    }
    
    db.delete(`warnings_${message.guild.id}_${user.id}`)
    user.user.send(`All your warnings in ${message.guild.name} have been reseted by ${message.author.username}`)
    message.channel.send(`Reseted all warnings of ${user.user.username}`)
    
}
}