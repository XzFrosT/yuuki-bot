const Command = require('../../Structures/Command');
const ms = require('ms');
const {fun} = require('../../settings/emojis.json')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ut'],
			description: 'This provides the current uptime of the bot.',
			category: `${fun} Utilities`
		});
	}

	async run(message) {
		message.channel.send(`My uptime is \`${ms(this.client.uptime, { long: true })}\``);
	}

};
