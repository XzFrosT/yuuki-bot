const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');
const fisherman = require('../../models/fish');
const hunt = require('../../models/hunt');
const note = require('../../models/note');

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: 'Use a object such as bank notes!',
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
            const noteconfig = await note.findOne({
                user: message.author.id
            })
            
            if(args[0] === "banknote") {
                const dbnumber = await noteconfig.get("amount")
                
                if(parseInt(dbnumber) == 0) return message.reply("You do not have any notes!")

                eco.connect(mongoPath)
                
            const space = [
                2000,
                4000,
                10000,
                3021
            ]

            const spacecount = space[Math.floor(Math.random() * space.length)]

            eco.giveCapacity(message.author.id, message.guild.id, spacecount)
            

            const em = new MessageEmbed()
            .setColor("GREEN")
            .addFields(
                {
                    name: `bank increased space`,
                    value: spacecount,
                    inline: false
                },

            )
            message.channel.send(em)
             await noteconfig.updateOne({
                 amount: dbnumber - 1
             }, { new: true});
            }

        }
    }