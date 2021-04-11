const Discord = require("discord.js");
const { prefix } = require("../../config.json");
const color = require("../../colors.json")

module.exports = {
  name: 'role',
  aliases: ['addrole', 'giverole'],
  description: 'Add/remove a role from a user',
  usage: `${prefix}role [user] [role]`,
  async execute(bot, message, args) {

    const targetUser = message.mentions.users.first()

    const erembed = new Discord.MessageEmbed()
            .setTitle(`Command: ${prefix}role`)
            .setDescription(`**Description:** Add/remove a role from a user\n**Cooldown:** None\n**Usage:** ${prefix}role [@user] [role name]\n**Example:** ${prefix}role @ShinePlays giveaways\n${prefix}role @ShinePlays giv`)
    if (!targetUser) return message.reply('Please specify a member')

    args.shift()

    let staff = message.guild.roles.cache.find(r => r.name === "Mystic Staff")

    const { guild } = message
    const roleName = args.join(' ')
    const role = guild.roles.cache.find(r => r.name.toLowerCase().startsWith(roleName.toLowerCase()))

    if (!role) return message.reply(`There is no role starting with "${roleName}"`)
    if (role.permissions.has("ADMINISTRATOR" || "BAN_MEMBERS" || "KICK_MEMBERS" || "MANAGE_ROLES" || "MANAGE_GUILD" || "MANAGE_CHANNELS")) return
    if (role.comparePositionTo(message.guild.roles.cache.find(r => r.id === "826246199970758687")) >= 0) return // Mystic Esports Bot own role
    if (!message.member.roles.cache.find(r => r.name === "Mystic Staff")) return

    const member = guild.members.cache.get(targetUser.id)

    try {
      if (member.roles.cache.get(role.id)) {
        member.roles.remove(role)
        message.channel.send({
          embed: {
            description: `✅ That user no longer has the "${role.name}" role.`,
            color: color.green
          }
        })
      } else {
        member.roles.add(role)
        message.channel.send({
          embed: {
            description: `✅ That user now has the "${role.name}" role.`,
            color: color.green
          }
        })
      }
    } catch (error) {
      message.channel.send({
        embed: {
          description: `❌ No changes were made`,
          color: color.red
        }
      })
    }
  },
}