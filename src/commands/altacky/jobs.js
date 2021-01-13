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
        const em = new MessageEmbed()
        .setTitle("✅ | Please mention the country you are currently in!")
        .setColor("RED")
        .setDescription("This is the process where you get your job and the following are the jobs!")
        .setFooter("Flight | yuuki")
        .setTimestamp()

        message.channel.send(em)

        message.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1, time: 60000, errors: ["time"]
        }).then(collected => {
            if(collected.first().content === "canada") {
                travel.findOne({user: message.author.id}, async(err, data) => {
                    if(err) throw err;
                    if(data) {
                        const travelconfig = await travel.findOne({
                            user: message.author.id
                        })

                        const country = await travelconfig.get("currentPlace")

                        if(country === "Canada") {
                            const jobem = new MessageEmbed()
                            .setTitle("Jobs")
                            .addFields(
                                {
                                    name: `<:developerbadge:797025155896311828> Developer`,
                                    value: `Make websites and bots in discord!`,
                                    inline: false
                                },
                                {
                                    name: `💃 Dancer`,
                                    value: `Dance well and get loads of money!`,
                                    inline: false
                                },
                                {
                                    name: `🎨 Artist`,
                                    value: `Draw well and get loads of money!`,
                                    inline: false
                                }
                            )
                            message.channel.send(jobem)

                            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                                max: 1, time: 60000, errors: ["time"]
                            }).then(collected => {
                                if(["Developer", "developer"].includes.collected.first().content){
                                    const job = travelconfig.get("job")

                                     travelconfig.updateOne({
                                        job: "Developer"
                                    })
                                    message.channel.send("You have got the job \`Developer\`. Try out \`y!work\` to get money!")
                                } else if(collected.first().content === "Dancer") {
                                    const job = travelconfig.get("job")

                                     travelconfig.updateOne({
                                        job: "Dancer"
                                    })
                                    message.channel.send("You have got the job \`Dancer\`. Try out \`y!work\`to get money!")
                                } else if (collected.first().content === "Artist") {
                                     travelconfig.updateOne({
                                        job: "Artist"
                                    })
                                    message.channel.send("You have got the job \`Artist\`. Try out \`y!work\` to get moeny!")
                                } else {
                                    message.reply("uhhh.... are you sure you said the correct option? \n\n Type \`Developer\` or \`Dancer\` or \`Artist\`!")
                                }
                            })
                        } else {
                            message.reply("You aren't in Canada!")
                        }
                    }
                })
            }
        })
    }
}