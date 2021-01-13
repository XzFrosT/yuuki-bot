const Command = require('../../Structures/Command')
const { MessageEmbed, PermissionOverwrites } = require('discord.js')
const {moderation} = require('../../settings/emojis.json');
const mute = require('../../models/mute');
const logchannel = require('../../models/logchannel');


module.exports = class extends Command{

	constructor(...args) {
		super(...args, {
			aliases: ['mute'],
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
        const duration = parseInt(args[1])
        if(isNaN(duration)) return message.reply(`You have to say a valid time period!`)
        const reason = args.slice(2).join(" ")
        if(!reason)return message.reply(`Mention a reason you are muting this user!`)
        const user = message.mentions.members.first()
        mute.findOne(
            {
                guild: message.guild.id,
            },
            async(err, data) => {
                if(err) throw err;
                if(!data) {
                     message.reply("PLease use the command y!cmr to create a mute role!")
                    } else {
                        message.guild.member(user).roles.add(data.role).then(() => {
                            message.channel.send(`**The user has been muted for ${duration}m !**`)
                        })
        
                        setTimeout(() => {
                            message.guild.member(user).roles.remove(data.role).then(() => {
                                message.channel.send("**The user has been unmuted after" + duration +" minutes!")
                            })
                        }, duration * 60000)
                    }
                
            }
        )
        const embed = new MessageEmbed()
        .setColor("0000ff")
        .setDescription(`A user has been muted by ${message.author}! This is the logging mute Embed`)
        .setTitle(`User Punishment`)
        .setTimestamp()
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            {
                name: `User`,
                value: user.user.username,
                inline: true
            },
            {
                name: `Moderator`,
                value: message.author.username,
                inline: true
            },
            {
                name: `Punishment`,
                value: `Mute`,
                inline: true
            },
            {
                name: `Reason`,
                value: reason,
                inline: true
            },
            {
                name: `Duration`,
                value: `${duration} m`,
                inline: true
            },
            {
                name: `Guild`,
                value: message.guild.name,
                inline: true
            }
        )

        logchannel.findOne(
            {
                Guild: message.guild.id,
            }, async(err, data) => {
                if(err) throw err;
                this.client.channels.cache.get(data.Channel).send(message.author, embed)
            }
        )
    }
}