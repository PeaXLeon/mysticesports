const db = require("quick.db")
const { prefix } = require("../config.json");

module.exports = {
  name: "warnings",
  aliases: ['warns'],
  description: "Get the warnings of yours or mentioned person",
  usage: `${prefix}warnings [user]`,
  execute(bot, message, args) {
    
    let user = message.mentions.members.first()
    
    if (!user) {
      let warnings = db.get(`warnings_${message.guild.id}_${message.author.id}`)
      if(warnings === null) warnings = 0;
      message.channel.send(`You have **${warnings}** warning(s)`)
    } else {
      let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
      if(warnings === null) warnings = 0;
      message.channel.send(`${user.user.username} has **${warnings}** warning(s)`)
    }
  }
}