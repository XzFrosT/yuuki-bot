const Command = require('../../Structures/Command');
const {fun, dimaondshovel,dimaondsword,daimondaxe,police} = require('../../settings/emojis.json');
const rpg = require('../../models/rpg');
const fisherman = require('../../models/fish')
const eco = require("discord-mongoose-economy")
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['rpg'],
			description: 'This is the rpg command!',
			category: `${fun} Games`
		});
	}

	async run(message, args) {
        const playerhealth = 100;
        const playerhealthdecrease = [
            70,
            23,
            1,
            34
        ]

        const decrease = playerhealthdecrease[Math.floor(Math.random() * playerhealthdecrease.length)]

        const playerhealthlost = playerhealth - decrease;
        console.log(playerhealthlost)

        if(args[0] === "hunt") {

            const fleshamount = [
                1,
                3,
                10
            ]

            const flesh = fleshamount[Math.floor(Math.random() * fleshamount.length)]

            const user = message.author.id

            const newdata1 = rpg.findOne({user:user}, async(err, data) => {
                if(err) throw err;
                if(!data) {
                    const newdata = new rpg({
                        user,
                        amount: 0
                    }).save()
                    console.log(newdata)
                    message.channel.send(`You created a new profile since you didn't had one. Please try the command again to to hunt animals! || **[If this message is being repeated please report to the support server.]** ||`)
                } else {
                    const rpgConfig = await rpg.findOne({
                        user
                      });
                      
                      const DbNumber = await rpgConfig.get('amount');
                      
                      //Add 5
                      await rpgConfig.updateOne({
                        amount: parseInt(DbNumber) + flesh
                      }, { new: true });
                      console.log(DbNumber)
                      message.channel.send(`You went on hunting a dragon and found ${flesh} flesh of it!`)
                }
            })
            
        }

        if(args[0] === "fish") {
            const fishamount = [
                1,
                2,
                4,
                7,
            ]

            const fish = fishamount[Math.floor(Math.random() * fishamount.length)]

            const user = message.author.id;
            const newdata = fisherman.findOne({user: user}, async(err, data) => {
                if(err) throw err;
                if(!data) {
                    const newdata1 = new fisherman({
                        user,
                        amount: 0
                    }).save()
                    message.channel.send(`This must be your first time fishing on this profile so you have to use the command once again to continue with the fishing sea creatures! have fun!`)

                } else {
                    const fishconfig = await fisherman.findOne({
                        user
                    });
                    const DBnumber = await fishconfig.get("amount");

                    await fishconfig.updateOne({
                        amount: parseInt(DBnumber) + fish
                    }, {new: true});
                    console.log(DBnumber)
                    message.channel.send(`You have caught a shark fin and got ${fish} amount of shark fin's!`)
                }
            })
        }

        if(args[0] === "inv") {
            if(!args[1]) return message.reply(`You have to pass whether you want shark or dragons amount! example: \`m!rpg inv fish\``)
            if(args[1] === "fish"){
                const inv = fisherman.findOne({user: message.author.id}, async(err, data) => {
                    if(err) throw err;
                    if(!data) return message.reply("You dont have any...")

                    message.channel.send(`You have the amount of ${data.amount} shark fin's!`)
                })
            }
            if(args[1] === "dragon"){
                const inv = rpg.findOne({user: message.author.id}, async(err, data) => {
                    if(err) throw err;
                    if(!data) return message.reply("You dont have any...")

                    message.channel.send(`You have the amount of ${data.amount} dragon flesh!`)
                })
            }
        }

        if(args[0] === "sell"){
            
            const balance = eco.balance(message.author.id, message.guild.id)
            if(!args[1]) return message.reply(`You can't sell nothin!`)
            if(args[1] === "shark") {
                if(isNaN(args[2])) return message.reply(`You have to typr a number!`)
                const inv = fisherman.findOne({user: message.author.id}, async(err, data) => {
                    if(!data) return message.reply("You dotn have any!")

                    if(data.amount < args[2]) {
                        message.reply("You don't have enough skins to sell!")
                    } else {
                        const fishconfig = await fisherman.findOne({
                            user: message.author.id
                        });

                        const DBnumber = await fishconfig.get("amount");

                        await fishconfig.updateOne({
                            amount: DBnumber - args[2]
                        }, {new: true});

                        eco.give(message.author.id, message.guild.id, 20 * args[2])
                        message.channel.send(`You have sold the amount of ${args[2]} of shark and got ${20 * args[2]}! `)
                    }
                })
            }

            if(args[1] === "dragon") {
                if(isNaN(args[2])) return message.reply(`You have to typr a number!`)
                const inv = rpg.findOne({user: message.author.id}, async(err, data) => {
                    if(!data) return message.reply("You dotn have any!")

                    if(data.amount < args[2]) {
                        message.reply("You don't have enough skins to sell!")
                    } else {
                        const fishconfig = await rpg.findOne({
                            user: message.author.id
                        });

                        const DBnumber = await fishconfig.get("amount");

                        await fishconfig.updateOne({
                            amount: DBnumber - args[2]
                        }, {new: true});

                        eco.give(message.author.id, message.guild.id, 20 * args[2])
                        message.channel.send(`You have sold the amount of ${args[2]} of dragon and got ${20 * args[2]}! `)
                    }
                })
            }
        }
    }
}