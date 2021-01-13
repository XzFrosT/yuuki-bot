const Command = require('../../Structures/Command');
const {fun} = require('../../settings/emojis.json')
const Levels = require('discord-xp');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['lb'],
			description: 'See the leaderboard of your server!',
			category: `${fun} Utilities`
		});
	}

	async run(message) {
        const rawLeaderboard = await Levels.fetchLeaderboard(1, 10); // We grab top 10 users with most xp in the current server.
        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet."); 
        const leaderboard = Levels.computeLeaderboard(this.client, rawLeaderboard); // We process the leaderboard.
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
		const em  = new MessageEmbed()
		.setColor("RED")
		.setTimestamp()
		.setThumbnail(this.client.user.displayAvatarURL())
		.addFields(
			{
				name: `Leaderboard of ${message.guild.name}`,
				value: `**Leaderboard**:\n\n${lb.join("\n\n")}`,
				inline: false
			}
		)
		message.channel.send(em)
    }
}
