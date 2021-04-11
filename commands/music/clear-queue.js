module.exports = {
    name: 'clear-queue',
    description: 'Clear the queue',
    aliases: ['clearqueue', 'cq'],
    async execute(bot, message, args) {
        
        if (!message.member.voice.channel) return message.reply('You\'re not in a voice channel');
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply('You are not in the same voice channel');
        if (!bot.player.getQueue(message)) return message.reply('There\'s no music playing');
        if (bot.player.getQueue(message).tracks.length <= 1) return message.reply('There is only one song in the queue');
        
        bot.player.clearQueue(message);
        await message.channel.send('Cleared the queue');
    },
};