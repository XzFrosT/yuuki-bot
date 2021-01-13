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
        const reason = args.join(' ')
        if(!reason) return message.reply(`You should bypass the reason you are creating this ticket!`)

        const user = message.author
        const guild = message.guild

        const embed = new MessageEmbed()
        .setColor("GOLD")
        .setDescription(`You have created a ticket please make sure to have a valid reason for this ticket!`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .addFields(
            {
                name: `Reason`,
                value: `${reason}`,
                inline: true
            },
            {
                name: `User`,
                value: `${message.author.username}`
            }
        )

        
        ticket.findOne({ userID: message.author.id, guildID: message.guild.id}, (err, existing) => {
            // existing will be the already existing ticket or undefined if there is none
            if(err) throw err; // throw errors
            if(existing) return message.channel.send("You already have an open ticket!");
            message.guild.channels.create(message.author.username, {
                type: "text",
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: "VIEW_CHANNEL",
                    },
                    {
                        id: message.author.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                        deny: ["MENTION_EVERYONE"]
                    }
                ]
            }).then(channel => {
                channel.send(embed)
                new ticket({
                    guildID: guild.id,
                    userID: user.id,
                    channelID: channel.id,
                }).save();
                message.channel.send(`I have created your ticket please wait for the support and idc!`)
            })
            })
    
           
            // At this point you can make a new ticket.


    }//cant speak now lol
}