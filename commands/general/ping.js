module.exports = {
    name: 'ping',
    aliases: ['pong'],
    description: 'Test my connection latency',
    execute(bot, message, args) {
        message.channel.send('Pinging...').then(sent => {
            sent.edit(`Pong. ${sent.createdTimestamp - message.createdTimestamp}ms`);
        })
    },
};