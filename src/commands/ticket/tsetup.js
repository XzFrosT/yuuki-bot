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
        const channel = message.mentions.channels.first()
        if(!channel){
            message.reply("Noob with no channel how could u set this. Please mention a channel D=")
        }

        ticket.findOne({userID: message.author.id}, async(err, data) => {
            if(data) {
                new ticket({
                    logchannel: channel
                }).save()
                message.channel.send("I have set the logchannel")
            }
        })//should be userID not user lol
    }
}