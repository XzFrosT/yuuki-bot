const Command = require('../../Structures/Command');
const axios = require('axios');
const { MessageEmbed, Message } = require('discord.js');
const { help } = require('../../settings/emojis.json')


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['coronas'],
			description: 'this provides the corona rate limit for a country!',
			category: `${help} Information`
		});
	}

	async run(message, args) {
        const premiumembed = new MessageEmbed()
        .setTitle(`Premium features`)
        .setColor("00f00f")
        .setDescription(`This is the premium features, when you purchase a premium feature you get it for a extended time!`)
        .setTimestamp(message.author.displayAvatarURL({dynamic: true}))
        .addFields(
            {
                name: `How to purchase premium`,
                value: `You can donate us any amount you like and get bunch of premium features or boost our support server and get the premium feature for one month :tada: !`,
                inline: false
            },
            {
                name: `Premium features`,
                value: `Get all cooldowns off except the daily commands! \n Get premium commands such as 50 codes unchecked nitro codes and get more commands!`,
                inline: false
            },
            {
                name: `Link to support server!`,
                value: `WARNNING: please make a channel in our support server to get the premium feature \n [SUPPORT SERVER URL](https://discord.gg/QfEfJpmK)`
            }
        )
        message.channel.send(premiumembed)
    }
}