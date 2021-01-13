const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const {moderation} = require('../../settings/emojis.json')
const prefix = require('../../../config.json')

module.exports = class extends Command{

	constructor(...args) {
		super(...args, {
			aliases: ['sm'],
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
            userPerms: ['MANAGE_CHANNELS']
		});
	}

    async run(message, args) {
        if(!args[0]) return message.channel.send('You should enter the amount your gonna put for slowmode!!!')
        if(isNaN(args[0])) return message.channel.send(`That is not a number!`)
        let reason = message.content.slice(args.slice(0).join(" "))
        if(!reason) {
            reason=="No reason provided"
        }
        message.channel.setRateLimitPerUser(args[0])
        message.channel.send(`Set the slowmode of this channel too **${args[0]}** with the reason: **${reason}**`)
    }
}