module.exports = {
    name: 'shuffle',
    description: 'Shuffle the songs in the queue',
    aliases: ['sh'],
    async execute(bot, message, args) {
        
        if (!message.member.voice.channel) return message.reply('You\'re not in a voice channel');
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply('You are not in the same voice channel');
        if (!bot.player.getQueue(message)) return message.reply(' There\'s no music playing');

        const success = bot.player.shuffle(message);
        if (success) message.channel.send('Queue shuffled');
    },
};