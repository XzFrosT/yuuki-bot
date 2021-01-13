const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const {moderation} = require('../../settings/emojis.json');
const logchannel = require('../../models/logchannel');

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
            userPerms: ['BAN_MEMBERS'],
            botPerms: ['BAN_MEMBERS']
		});
	}

    async run(message, args) {
        const user = message.mentions.users.first()
        const member = message.guild.member(user)
        const reason = args.slice(1).join(" ")
        const mod = message.author
        
        if(!user) return message.reply("You need to mention a user!")
        if(!reason) return message.reply("Mention a reason you are banning this user!")

        const banembed = new MessageEmbed()
        .setTitle("**Ban Confirmation**")
        .setColor("GREEN")
        .setDescription("This is the confirmation team for banning people: \n `confirm` - for to move forward \n `no` - to close the ban.")

        message.channel.send(banembed)

       try{
           let msg = await message.channel.awaitMessages(
            (u2) => u2.author.id === message.author.id,
            {
                time: 10000,
                max: 1,
                errors: ["time"]
            }
           );
           if(msg.first().content === "confirm") {
               const banembeed = new MessageEmbed()
               .setTitle("Success ban")
               .setColor("GREEN")
               .setDescription(`The user has been banned from the user`)

               message.channel.send(banembeed)
            await member.ban({
                reason: reason
            }).then(async() => {
                const logconfig = await logchannel.findOne({
                    Guild: message.guild.id
                })

                const channel = await logconfig.get("Channel")

                const embed = new MessageEmbed()
                .setTitle(`Banned by ${mod}`)
                .setColor(`RED`)
                .setDescription(`The user has been banned for the following \n\n **reason:** ${reason}\n **Mod:** ${mod}`)
                .setTimestamp()
                .setFooter("Banned")
                this.client.channels.cache.get(channel).send(embed)
            })
           } else {
               return message.reply("Okay you have decided not to ban him!")
           }
       } catch(e) {
           console.log(e)
        return message.reply("You ran out of time!")
       }
    } 
}
