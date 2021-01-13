const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const {moderation} = require('../../settings/emojis.json')
const ReactionModel = require('../../models/ReactionRole')

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
        const role = message.mentions.roles.first();
        if (!role)
            return message.reply('You need mention a role').then(m => m.delete({ timeout: 1000 }));

        const emoji = args[1];
        if (!emoji)
            return message.reply('You need use a valid emoji.').then(m => m.delete({ timeout: 1000 }));

        const msg = await message.channel.messages.fetch(args[2] || message.id);
        if (!role)
            return message.reply('Message not found! Wtf...').then(m => m.delete({ timeout: 1000 }));

        this.client.reactionRoleManager.createReactionRole({
            message: msg,
            roles: [role],
            emoji,
            type:1
        });
        message.channel.send("I have set the reaction role!")
        
    }
}
/*

*/