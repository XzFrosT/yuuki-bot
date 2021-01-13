const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const {moderation} = require('../../settings/emojis.json')
const mute = require('../../models/mute');
//i never tried sql, its hard.. ikr
module.exports = class extends Command{

	constructor(...args) {
		super(...args, {
			aliases: ['cmr'],
            description: '',
            category: `${moderation} Moderation`,
            userPerms: ["MANAGE_ROLES"]
		});
	}

    async run(message, args) {
        const guildid = message.guild.id;
        try{
            const muterole = message.guild.roles.create({
                data: {
                    name: `muted`
                }
            }).then(role => {
                const newmute = new mute({
                    guild: guildid,
                    role: role.id,
                });
    
                newmute.save()
                console.log(newmute)

                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.overwritePermissions(
                        [
                            {
                                id: role.id,
                                deny: ["SEND_MESSAGES"]
                            }
                        ]
                    )
                })
            })

           process.on("unhandledRejection", console.error)

        }catch (e){
            console.log(e)
        }
    }
}