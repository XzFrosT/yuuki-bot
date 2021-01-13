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
            aliases: ['dep'],
            description: 'deposit money in bank!',
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
            
            eco.connect(mongoPath)

            const user = message.author;
            const bal = await eco.balance(user.id, message.guild.id)

            if(!args[0]) return message.reply("You need to pass what you want to buy!")

            if(args[0] === "pole") {
                if(bal.wallet < 10000) {
                    return message.reply(`Oh no you dont have enough money to buy 🎁!`)
                }

                eco.deduct(user.id, message.guild.id, 10000)
                
                message.channel.send(`You have bought a sword which costs 1000! 🎉`)

                const newdata = fisherman.findOne({user: user.id}, async(err, data) => {
                    if(err) throw err;
                    if(!data) {
                        const newdata1 = new fisherman({
                            user: user.id,
                            pole: 1
                        }).save()
                        message.channel.send(`This must be your first time fishing on this profile so you have to use the command once again to continue with the fishing sea creatures! have fun!`)
    
                    } else {
                        const fishconfig = await fisherman.findOne({
                            user: user.id
                        });
                        const DBnumber = await fishconfig.get("pole");
    
                        await fishconfig.updateOne({
                            pole: parseInt(DBnumber) + 1
                        }, {new: true});
                        console.log(DBnumber)
                        message.channel.send(`You have bought a pole`)

                        const strengthdb = await fishconfig.get("polestrength")
                        
                        await fishconfig.updateOne({
                            polestrength: 10000
                        }, {new: true});
                    } 
                })
            }

            

            if(args[0] === `rifle`) {
               if(bal.wallet < 10000) {
                   return message.reply(`You don't have enough money to buy!`)
               }

               eco.deduct(user.id, message.guild.id, 10000)

               const newdata = hunt.findOne({user: user.id}, async(err, data) => {
                   if (err) throw err;
                   if(!data) {
                       const newdata = new hunt({
                           user: user.id,
                           amount: 0,
                           rifle: 1,
                       }).save()
                       message.channel.send(`You have bought a Rifle for 10000`)
                   } else {
                       const huntconfig = await hunt.findOne({
                           user: user.id
                       });
                       const dbnumber = await huntconfig.get("rifle");
                       const riflestrength = await huntconfig.get("riflestrength")

                       await huntconfig.updateOne({
                           rifle: parseInt(dbnumber) + 1,
                           riflestrength: 10000 //any number you like :D
                       }, {new: true});
                       message.channel.send(`You have bought a Rifle for 10000!`)
                   }
               })
            }

            if(args[0] === "banknote") {
                if(bal.wallet < 5000) return message.reply("You don't have any money!")
                note.findOne({user: message.author.id}, async(err, data) => {
                    if(err) throw err;
                    if(!data) {
                        new note({
                            user: message.author.id,
                            amount: 1
                        }).save()
                        message.channel.send(`You have bought a Note!`)
                    } else {
                        const noteconfig = await note.findOne({
                            user: message.author.id
                        })
                        const dbnumber = await noteconfig.get("amount")

                        await noteconfig.updateOne({
                            amount: parseInt(dbnumber) + 1
                        }, {new: true});
                        message.channel.send(`You have bought a note!`)
                    }
                })
            }
        }
    } // 