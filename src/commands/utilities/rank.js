const Command = require('../../Structures/Command');
const {fun} = require('../../settings/emojis.json')
const Levels = require('discord-xp');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const canvacord = require("canvacord");
const levels = require('discord-xp/models/levels');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
			description: 'This provides the ping of the bot',
			category: `${fun} Utilities`
		});
	}

	async run(message) {
        const target = message.mentions.users.first() || message.author; // Grab the target.
        const user = await Levels.fetch(target.id, 1, true); // Selects the target from the database.
        if (!user) return message.channel.send("Seems like this user has not earned any xp so far.");
        const append = Levels.xpFor(user.level + 1)
        console.log(append)
        const rank = new canvacord.Rank()
        .setAvatar(message.author.displayAvatarURL({ format: "png"}))
        .setCurrentXP(user.xp)
        .setRequiredXP(append)
        .setLevel(user.level)
        .setBackground('IMAGE', 'https://cdn.discordapp.com/attachments/763711156531232798/785360896473825301/pexels-photo-1303098.jpg')
        .setStatus(message.author.presence.status)
        .setProgressBar("RED", "COLOR")
        .setProgressBarTrack("WHITE", "COLOR")
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator);
     
    rank.build()
        .then(data => {
            const attachment = new MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
        });
    }
}