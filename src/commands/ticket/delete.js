const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const {think} = require('../../settings/emojis.json')
const ticket = require('../../models/ticket')
const map = new Map()

module.exports = class extends Command{

	constructor(...args) {
		super(...args, {
			aliases: [''],
			description: '',
			category: `${think} Ticket`,
			ratelimit: {
                // how many times this command can be ran before getting limited.

                bucket: 1,
                // the time (in milliseconds) before the command can be used again, in this case: seven seconds
                reset: 20 * 1000,
                // whether the reset time should stack.
                stack: false
            },
		});
	}

    async run(message, args) {
        ticket.findOne({ userID: message.author.id, guildID: message.guild.id }, (err, doc) => {
            if(!doc) return message.channel.send(`this user has no ticket opened!`)
            const channel = this.client.channels.cache.get(doc.channelID);
            if(!channel) return message.channel.send("channel doesn't exist");
            channel.delete();
            doc.delete()// this is dangerous lol
          });
          const cache =message.channel.messages.cache.map(m => `${m.author.tag} ${m.content}`).join("\n")
            
    }
}