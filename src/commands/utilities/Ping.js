const Command = require('../../Structures/Command');
const {fun} = require('../../settings/emojis.json');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
			description: 'This provides the ping of the bot',
			category: `${fun} Utilities`
		});
	}

	async run(message) {
		const msg = await message.channel.send('Pinging...');

		const latency = msg.createdTimestamp - message.createdTimestamp;
		const choices = ['Is this really my ping?', 'Is this okay? I can\'t look!', 'I hope it isn\'t bad!'];
		const response = choices[Math.floor(Math.random() * choices.length)];

		const em = new MessageEmbed()
		.addFields(
			{
				name: ` 🖥 Bot Latency`,
				value: `\`\`\`${latency}ms\`\`\``,
				inline: true
			},
			{
				name: `\n 💻 API Latency`,
				value: `\`\`\`${Math.round(this.client.ws.ping)}ms\`\`\``,
				inline: true
			}
		)
		msg.edit(em);
	}

};
