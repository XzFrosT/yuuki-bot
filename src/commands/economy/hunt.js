const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');
const hunt = require("../../models/hunt")
const humanizeduration = require("humanize-duration")

const currentlyused = new Map()

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['hunt'],
            description: 'Hunt animals using this command!',
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
            
            const rifleconfig = await hunt.findOne({
                user: message.author.id
            })
            const rifle = await rifleconfig.get("rifle")

            if(rifle == 0) {
                return message.reply(`Are you trying to break me; you don't even have one rifle to hunt buy a rifle!`)
            }
            const huntedojects = [
                1,
                3,
                4
            ]

            const huntanimalcount = huntedojects[Math.floor(Math.random() * huntedojects.length)]

            const cooldown = currentlyused.get(message.author.id)
            if (cooldown) {
               const remain = humanizeduration(cooldown - Date.now(), {units: ["s"], round: true})
               const embed = new MessageEmbed()
               .setTitle(`Slow Down, hunter`)
               .setDescription(`You went on hunting and fell into a hole and will take \`${remain}\` to come back up!`)

               return message.reply(embed)

        } else {

            currentlyused.set(message.author.id, Date.now() + 60000);
            setTimeout(() => {
              // Removes the user from the set after a minute
              currentlyused.delete(message.author.id);
            }, 60000);

                const newdata = hunt.findOne({user: message.author.id}, async(err, data) => {
                if(err) throw err;
                if(!data) {
                    const newdatahunt = new hunt({
                        user: message.author.id,
                        amount: huntanimalcount
                    }).save()
                    message.channel.send(`You hunted and found ${huntanimalcount} dragon or animal you like 🐲.`)

                } else {
                        const huntconfig = await hunt.findOne({
                            user: message.author.id
                        })

                        const DBnumber = await huntconfig.get("amount")//wait a min lol

                        await huntconfig.updateOne({
                            amount: parseInt(DBnumber) + huntanimalcount
                        }, {new: true});
                        console.log(DBnumber)
                        message.channel.send(`You hunted and found ${huntanimalcount} dragon or animal you like 🐲.`)

                        const dbnumber = huntconfig.get("riflestrength")
                        
                        await huntconfig.updateOne({
                            riflestrength: parseInt(dbnumber) - 100
                        })
                    }
                })
            }
        }
    }