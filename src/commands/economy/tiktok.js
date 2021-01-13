const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');
const tikcreate = require('../../models/tikcreate');

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: '',
            category: `${stinkybear} Economy`,
            
        })
    }
        async run(message, args) {
            const usedtimes = require('../../models/usedtimes');
            const usedconfig = await usedtimes.findOne({
                user: message.author.id
            })

            const num = await usedconfig.get("times")

            await usedconfig.updateOne({
                times: parseInt(num) + 1
            })

            if(!args[0]) return message.reply(`You didn't mention one of the following \n\n Post | Profile | Create !`)

            if(args[0] === "create") {
                const reaso = args.slice(2)
                const reason = reaso.join(" ")

                if(!args[1]) return message.reply(`Mention a name. example: m!tiktok create <name> <yourdescription>!`)
                
                const tiktokextra = tikcreate.findOne({userID: message.author.id}, async(err, data) => {
                    if(err) throw err;
                    if(!data) {
                        const newtiktok = new tikcreate({
                            userID: message.author.id,
                            phone: 0,
                            name: args[1],
                            description: reason
                        }).save()
                        message.channel.send(`Sucessfully created a Profile!`)
                    } else {
                        message.reply(`You have a profile already!`)
                    }
                })
            }
            if(args[0] === "profile") {
               try{ if(!args[1]) return message.reply(`You never mentioned a name!`)

                const tikconfig = await tikcreate.findOne({
                    name: args[1]
                })

                const tik =  await tikconfig.get("name")
                const description = await tikconfig.get("description")

                const em = new MessageEmbed()
                .setTitle("Profile")
                .setDescription(`**__Name__**: ${tik} \n **__Description__**: ${description}`)

                message.channel.send(em)
            }catch(e){
                return message.reply("There isn't such a profile")
            }
            }
            if(args[0] === "post") {
                eco.connect(mongoPath)

                const random = [
                    400,
                    699,
                    910,
                    1000,
                    1254
                ]
                const randomamount = random[Math.floor(Math.random() * random.length)]

                eco.give(message.author.id, message.guild.id, randomamount)
                
                message.channel.send(`You posted a tiktok and just got ${randomamount}$ of cash!`)

            }
        }
    }