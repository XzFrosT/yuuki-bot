const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const {moderation} = require('../../settings/emojis.json')


module.exports = class extends Command{

	constructor(...args) {
		super(...args, {
			aliases: [''],
			description: '',
			category: `${moderation} Moderation`,
			ratelimit: {
                // how many times this command can be ran before getting limited.
                bucket: 1,
                // the time (in milliseconds) before the command can be used again, in this case: seven seconds
                reset: 20 * 1000,
                // whether the reset time should stack.
                stack: false
            },
            userPerms: ['MANAGE_MESSAGES']
		});
	}

    async run(message, args) {
              
const amount = parseInt(args[0]) + 1;

if (isNaN(amount)) {
    return message.reply('That doesn\'t seem to be a valid number.');
} else if (amount <= 1 || amount > 100) {
    return message.reply('You need to input a number between 1 and 99.');
}

message.channel.bulkDelete(amount, true).catch(err => {
    console.error(err);
    message.channel.send('There was an error trying to prune messages in this channel! Try checking my perms! i need Message delete perms!');
});
    }
}