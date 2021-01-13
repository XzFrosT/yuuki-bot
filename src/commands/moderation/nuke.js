
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
            userPerms: ['MANAGE_CHANNELS']
		});
	}

    async run(message, args) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("you do not have permissons")
let clearchannel = message.channel || message.channel.mentions.first()
clearchannel.clone()
clearchannel.delete()
    }
}