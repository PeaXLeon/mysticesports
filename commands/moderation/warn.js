const db = require("quick.db")
const { prefix } = require("../../config.json");
const color = require("../../colors.json");
const Discord = require("discord.js");

module.exports = {
  name: "warn",
  description: "Warn anyone who do not obey the rules",
  usage: `${prefix}warn [user] [reason]`,
  async execute(bot, message, args) {

    const staff = message.guild.roles.cache.find(r => r.name === "Mystic Staff")
    const user = message.mentions.members.first()

    const erembed = new Discord.MessageEmbed()
            .setTitle(`Command: ${prefix}warn`)
            .setDescription(`**Description:** Warn a member\n**Cooldown:** None\n**Usage:** ${prefix}warn [@user] [reason]\n**Example:** ${prefix}warn @ShinePlays Spamming`)

    if(!user) return message.channel.send(erembed)

    if(!message.member.roles.cache.find(r => r.name === "Mystic Staff")) return
    
    const reason = args.slice(1).join(" ")
    if(!reason) return message.channel.send(erembed)
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

    const embed = new Discord.MessageEmbed()
      .setTitle(`✅ ***${user.user.username} has been warned***`)
      .setColor(color.green)
    
    if(warnings === null || warnings === 0) {
        db.set(`warnings_${message.guild.id}_${user.id}`, 1)
        user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
        await message.channel.send(embed)
    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
        user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
        await message.channel.send(embed)
    }
  } 
}