const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
  name: 'role',
  aliases: ['addrole', 'giverole'],
  description: 'Add/remove a role from a user',
  usage: `${prefix}role [user] [role]`,
  execute(bot, message, args) {
    const targetUser = message.mentions.users.first()
    if (!targetUser) {
      return message.channel.send('Please specify someone to give a role to.')
    }

    args.shift()

    const { guild } = message
    const roleName = args.join(' ')
    const role = guild.roles.cache.find(r => r.name.toLowerCase().startsWith(roleName))

    if (!role) {
      return message.channel.send(`There is no role starting with "${roleName}"`)
    }
    if (role.permissions.has("ADMINISTRATOR" || "BAN_MEMBERS" || "KICK_MEMBERS" || "MANAGE_ROLES")) {
      return message.channel.send("I can't give/remove administrator roles.")
    }
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("You don't have permission to give/remove roles.")
    }

    const member = guild.members.cache.get(targetUser.id)

    try {
      if (member.roles.cache.get(role.id)) {
        member.roles.remove(role)
        message.channel.send(`That user no longer has the "${role.name}" role.`)
      } else {
        member.roles.add(role)
        message.channel.send(`That user now has the "${role.name}" role.`)
      }
    } catch (error) {
      message.channel.send("No changes were made.")
    }
  },
}