const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const {fun} = require('../../settings/emojis.json')



module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['halp'],
			description: 'Displays all the commands in the bot',
			category: `${fun} Games`,
			usage: '[command]'
        });
    }
    async run(message, args) {
        const filter = mi => mi.author.id === message.author.id;
		const intro = 'Soccer - Hit the ball into a goal where the goalkeeper is not at! To hit the ball, type `left`, `right` **or** `middle`.\n';
		const possible = [
			`🥅🥅🥅\n      🕴️\n\n      ⚽`,
			`🥅🥅🥅\n🕴️\n\n      ⚽`,
			`🥅🥅🥅\n            🕴️\n\n      ⚽`
		];
		const panswers = [
			['left', 'right'],
			['middle', 'right'],
			['left', 'middle']
		];
		let attempts = 3;
		const random = this.client.utils.randomNoRepeat(possible);
		const init = await message.channel.send(`${intro}${random}`);
		const index = possible.indexOf(random);
		const answers = panswers[index];

		const start = async (answer) => {
			const collector = init.channel.createMessageCollector(filter, { time: 7500 });

			collector.on('collect', async (propmt) => {
				if (answer.includes(propmt.content.toLowerCase())) {
					collector.stop();
					return message.channel.send(`nice, you made a goal.`);
				}
				if (!answers.includes(propmt.content.toLowerCase())) {
					collector.stop();
					return message.channel.send(`the goalie  is to op and blocks your shot`);
				}
			});
			collector.on('end', async (_, reason) => {
				if (['time'].includes(reason)) {
					if (attempts > 1) {
						attempts -= 1;
						const heho = this.client.utils.randomNoRepeat(possible);
						const jindex = possible.indexOf(heho);
						const janswers = panswers[jindex];
						init.edit(`${intro}${heho}`);
						await start(janswers);
					} else if (attempts <= 1) {
						return message.channel.send('the goalie got bored and left the game');
					}
				}
			});
		};

		await start(answers);
    }
}