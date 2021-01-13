const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {scared} = require('../../settings/emojis.json')
const marry = require('../../models/marry')

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['divorce'],
            description: 'Marry a person using this command!',
            category: `${scared} Marriage`,

        })
    }
        async run(message, args) {
            const user = message.mentions.members.first() 
            if(!user) return message.reply("Please mentiona person who you want to divorce!")

            const em = new MessageEmbed()
            .setTitle("Divorce")
            .setColor("GREEN")
            .setDescription(`If you want to divorce please say \n\n \`yes\` \n \`no\``)
            .setFooter("Divorce")

            message.channel.send(em)
            try{
                let msg = await message.channel.awaitMessages(
                    (u2) => u2.author.id === message.author.id,
                    {time: 15000, max: 1, errors: ["time"]}
                );
                if(msg.first().content == "yes") {
                    const marryconfig = await marry.findOne({
                        User: message.author.id
                    });

                    const marryconfig2 = await marry.findOne({
                        User: user.id
                    });

                    const marriedone1 = await marryconfig2.get("MarriedUser")
                    const divorceauthor = marryconfig.get("Divorcedtimes")
                    const divorceuser = await marryconfig2.get("Divorcedtimes")
                    const marriedone = await marryconfig.get("MarriedUser")

                    if(parseInt(marriedone) == 0) {
                        return message.reply("You haven't married anyone!")
                    } else if(marriedone1 === user.id){
                        return message.reply("You haven't married this person!")
                    } else {
                    
                   await marryconfig.updateOne({
                    MarriedUser: 0,
                    Divorcedtimes: parseInt(divorceauthor) + 1
                    })
                    await marryconfig2.updateOne({
                        MarriedUser: 0,
                        Divorcedtimes: parseInt(divorceuser) + 1
                    })

                    message.channel.send(`You have divorced the User ${user}`)
                }
                } else {
                    message.channel.send("You have decided not to divorce that user!")
                }
            }catch (err) {
                message.channel.send("noob ran out of time!")
            }
        }
    }