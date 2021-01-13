const {MessageEmbed} = require('discord.js')
const Command = require('../../Structures/Command')
const {shook} = require('../../settings/emojis.json')
const eco = require("discord-mongoose-economy")
const travel = require("../../models/travel")
module.exports = class extends Command {
    
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: ``,
            category: `${shook} Flight`,
        });
    }

    async run(message, args) {
        const bal = await eco.balance(message.author.id, message.guild.id)
       const embed = new MessageEmbed()
       .setTitle("Where would you like to travel today!")
       .setColor("#FFFFFF")
       .setDescription(`Please make sure that you have 100,000 in your wallet in order to buy a ticket! \n\n Type \`Canada\` to travel to canada `)
       .addFields(
           {
               name: `🍁 Canada`,
               value: `How much for a ticket? \n > 1,000,000`,
               inline: false
           },
           {
               name: `🍕 Alaska`,
               value: `How mcuh for a ticket? \n > 1,300,00`,
               inline: false
           },
           {
               name: `🌮 Mexico`,
               value: `How much for a ticket? \n > 1,250,000`,
               inline: false
           }
       )
            message.channel.send(embed)

            await message.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1, time: 60000, errors: ["time"]
            }).then(collected => {
                if(collected.first().content === "Canada") {
                    if(bal.wallet < 1000000){
                        eco.give(message.author.id, message.guild.id, 10000000)
                        return message.reply("You dont have enough money!")
                    } else {
                        travel.findOne({user: message.author.id}, async(err, data) => {
                            if(err) throw err;
                            if(data) {
                                const travelconfig = await travel.findOne({
                                    user: message.author.id
                                })

                                const place = travelconfig.get("currentPlace")
                                const amount = travelconfig.get("totalTraveledPlaces")
                                const job = travelconfig.get("job")
                                const total = travelconfig.get("totalMoneySpent")
                                if(place === "Canada") {
                                    return message.reply("You are in canada!")
                                } else {
                                    await travelconfig.updateOne({
                                    currentPlace: "Canada",
                                    totalTraveledPlaces: parseInt(amount) +1,
                                    totalMoneySpent: parseInt(total) + 1000000
                                })
                                const embed = new MessageEmbed()
                                .setTitle("Travel")
                                .setDescription("Travel through the world to get more money!")
                                .addFields(
                                    {
                                        name: `✈ Traveling to`,
                                        value: `Canada from ${place}`,
                                        inline: false
                                    },
                                    {
                                        name: `💵 Total Money spent`,
                                        value: `You have spent ${parseInt(total) + 1000000}!`,
                                        inline: false
                                    },
                                    {
                                        name: `🚢 Total Traveled Places`,
                                        value: `${parseInt(amount) + 1}`,
                                        inline: false
                                    },
                                    {
                                        name: `🏴‍☠️ Current Job`,
                                        value: `${job}`,
                                        inline: false
                                    },
                                )
                                message.channel.send(embed)}
                                eco.deduct(message.author.id, message.guild.id, 1000000)
                            } else {
                                const newda = new travel({
                                    user: message.author.id,
                                    currentPlace: "Russia",
                                    totalTraveledPlaces: 0,
                                    job: "none",
                                    totalMoneySpent: 0,
                                }).save()
                                eco.give(message.author.id, message.guild.id, 1000000)
                                message.channel.send("Made new db")
                            }
                        })
                    }
                } else if(collected.first().content === "Alaska"){
                    if(bal.wallet < 1300000) {
                        return message.reply("You dont have enough money!")
                    } else {
                        travel.findOne({user: message.author.id}, async(err, data) => {
                            if(err) throw err;
                            if(data) {
                                const travelconfig = await travel.findOne({
                                    user: message.author.id
                                })

                                const place = travelconfig.get("currentPlace")
                                const amount = travelconfig.get("totalTraveledPlaces")
                                const job = travelconfig.get("job")
                                const total = travelconfig.get("totalMoneySpent")
                                if(place === "Alaska") {
                                    return message.reply("You are in Alaska!")
                                } else {
                                    await travelconfig.updateOne({
                                    currentPlace: "Alaska",
                                    totalTraveledPlaces: parseInt(amount) +1,
                                    totalMoneySpent: parseInt(total) + 1300000
                                })
                                const embed = new MessageEmbed()
                                .setTitle("Travel")
                                .setDescription("Travel through the world to get more money!")
                                .addFields(
                                    {
                                        name: `✈ Traveling to`,
                                        value: `Alaska from ${place}`,
                                        inline: false
                                    },
                                    {
                                        name: `💵 Total Money spent`,
                                        value: `You have spent ${parseInt(total) + 1000000}!`,
                                        inline: false
                                    },
                                    {
                                        name: `🚢 Total Traveled Places`,
                                        value: `${parseInt(amount) + 1}`,
                                        inline: false
                                    },
                                    {
                                        name: `🏴‍☠️ Current Job`,
                                        value: `${job}`,
                                        inline: false
                                    },
                                )
                                message.channel.send(embed)}
                                eco.deduct(message.author.id, message.guild.id, 1300000)
                            } else {
                                const newda = new travel({
                                    user: message.author.id,
                                    currentPlace: "Russia",
                                    totalTraveledPlaces: 0,
                                    job: "none",
                                    totalMoneySpent: 0,
                                }).save()
                                eco.give(message.author.id, message.guild.id, 1000000)
                                message.channel.send("Made new db")
                            }
                        })
                    }
                
                }
            })
    }
}
