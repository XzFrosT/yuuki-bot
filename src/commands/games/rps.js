const Command = require('../../Structures/Command');
const rpg = require('../../models/rpg');
const {fun} = require("../../settings/emojis.json")
const { MessageCollector, MessageEmbed } = require("discord.js")
const random = require("random");
const ms = require("ms")

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['rpg'],
			description: 'This is the rpg command!',
			category: `${fun} Games`
		});
	}

	async run(message, args) {
        if (message.mentions.members.first()) {
            if (message.mentions.members.first().user.bot == true) return message.reply("You can't play with Bots")
            let one = message.author;
            let two = message.mentions.members.first();
            let cone = "";
            let ctwo = "";
            let a = 0;
            let done = 0;
            let coll = new MessageCollector(message.channel, m => m.author.id == two.id, { time: 15000 })
            coll.on('end',async(c)=>{
                if(done == 0){
                message.channel.send("The user you challenge seems like a coward he didn't answer in time, game cancelled.")
                }
                })
            message.channel.send(`${one.username} challenged you for a Rock Paper Scissor Tournament!\nType \`Yes\` or \`Yea\` to play!\nType \`No\` or \`Nah\`to deny and cancel the tournament!`);
            coll.on('collect', mess => {
                if (mess.content.toLowerCase() == "yes" || mess.content.toLowerCase() == "yea") {
                    done++;
                    coll.stop();
                    one.send("Get ready!")
                        .catch(() => {
                            return message.reply("Your dm is close");
                        })
                    two.user.send("Get ready!")
                        .catch(() => {
                            return message.reply(`${two.user.username}\'s dm are closed`)
                        })
                    message.channel.send(`Game starts! Check Dm To play!`)
                    one.createDM()
                        .then((dmchannel) => {
                            let colc = new MessageCollector(dmchannel, m => m.author.id == one.id);
                            one.send("Choose your move\n> \`Rock\` or \`paper\` or \`scissor\`");
                            colc.on('collect', msg => {
                                if (msg.content.toLowerCase() == "rock") {
                                    cone = "rock";
                                    colc.stop();
                                }
                                else if (msg.content.toLowerCase() == "paper") {
                                    cone = "paper";
                                    colc.stop();
                                }
                                else if (msg.content.toLowerCase() == "scissor") {
                                    cone = "scissor";
                                    colc.stop();
                                }
                                else {
                                    one.send("I asked to choose move from the following options : \`Rock\` or \`paper\` or \`scissor\`")
                                }
                            });
                            colc.on('end', lol => {
                                a++;
                                if(cone == ""){
                                    dmchannel.send("You took too long to respond! game cancelled!");
                                    a =0;
                                    }
                                if (a == 2) {
                                    if ((cone == "rock" && ctwo == "scissor") || (cone == "paper" && ctwo == "rock") || (cone == "scissor" && ctwo == "paper")) {
                                        message.channel.send(`Congrats **${one.username}** You won! EPICC, and sad ${two.user.username} lost\n> ${one.username}'s move is **${cone}**\n> ${two.user.username}'s move is **${ctwo}**\n${one.username} won!`)
                                    }
                                    else if (cone == ctwo) {
                                        message.channel.send("Whoa they both choose the same choices that's why its a tie\n" + `> ${one.username}'s move is **${cone}** and ${two.user.username}'s move is **${ctwo}**\n**No one actually won.**`)
                                    }
                                    else {
                                        message.channel.send(`Congrats **${two.user.username}** You won and the brave challanger lost this match oof.\n> ${one.username}'s move is **${cone}**\n> ${two.user.username}'s move is **${ctwo}**\n${one.username} lost and ${two.user.username} wons!`)
                                    }
                                }
                            })
                        })
                    two.createDM()
                        .then((dmchannel) => {
                            let collc = new MessageCollector(dmchannel, m => m.author.id == two.id, { time: 20000 });
                            two.user.send("Choose your move! \n> \`Rock\` or \`paper\` or \`scissor\`")
                            collc.on('collect', msg => {
                                if (msg.content.toLowerCase() == "rock") {
                                    ctwo = "rock";
                                    collc.stop();
                                }
                                else if (msg.content.toLowerCase() == "paper") {
                                    ctwo = "paper";
                                    collc.stop();
                                }
                                else if (msg.content.toLowerCase() == "scissor") {
                                    ctwo = "scissor";
                                    collc.stop();
                                }
                                else {
                                    two.user.send("Please choose a valid move from the following options: \`Rock\` or \`paper\` or \`scissor\`")
                                }
                            });
                            collc.on('end', lol => {
                                a++;
                                if(ctwo == ""){
                                    dmchannel.send("You took too long to respond! game cancelled!");
                                    a =0;
                                    }
                                if (a == 2) {
                                    if ((cone == "rock" && ctwo == "scissor") || (cone == "paper" && ctwo == "rock") || (cone == "scissor" && ctwo == "paper")) {
                                        message.channel.send(`Congrats **${one.username}** You won! EPICC, and sad ${two.user.username} lost\n> ${one.username}'s move is **${cone}**\n> ${two.user.username}'s move is **${ctwo}**\n${one.username} won!`)
                                    }
                                    else if (cone == ctwo) {
                                        message.channel.send("Whoa they both choose the same choices that's why its a tie\n" + `> ${one.username}'s move is **${cone}** and ${two.user.username}'s move is **${ctwo}**\n**No one actually won.**`)
                                    }
                                    else {
                                        message.channel.send(`Congrats **${two.user.username}** You won and the brave challanger lost this match oof.\n> ${one.username}'s move is **${cone}** \n> ${two.user.username}'s move is **${ctwo}**\n${one.username} lost and ${two.user.username} wons!`)
                                    }
                                }
                            })
                        });

                }
                else if (mess.content.toLowerCase() == "no" | mess.content.toLowerCase() == "nah") {
                    done++;
                    coll.stop();
                    message.reply(`Welp ${two.user.username} did not accept the fight...`);
                }
                else {
                    mess.reply("Uh, i ask if its \`Yes\` or \`No\`")
                }
            });
        }
        else {
            const chooseArr = ["🗻", "📃", "✂️"];
            let embed = new MessageEmbed()
                .setTitle("Rock Paper Scissor Tournament")
                .setColor("RANDOM")
                .setDescription("🗻 - Stone, 📃 - paper, ✂️ - scissors.\nReact on emoji to choose your move!")
                .setFooter(`${message.author.username} vs Me`);
            const m = await message.channel.send(embed);
            const reacted = await promptMessage(m, message.author, 15, chooseArr);
            const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
            if (reacted == undefined) {
                let reply = ["You coward why you didn't chose your move!", "Bruh you didn't choose your move...", "Don\'t you know how to play this game? HUH?", "React so that we can play bruh, cancelled.", "You ask for a game but didn't react. WTF."];
                message.reply(reply[random.int(0, reply.length-1)])
            }
            else {
                const result = await getResult(reacted, botChoice);
                embed
                    .setTitle("RPS Tournament Ended")
                    .setDescription(`**Result**\n${message.author.username} chose:` + reacted + "\n I choose: " + botChoice)
                    .setFooter("Game Over")
                m.edit(embed);
                function getResult(me, clientChosen) {
                    if ((me === "🗻" && clientChosen === "✂️") ||
                        (me === "📃" && clientChosen === "🗻") ||
                        (me === "✂️" && clientChosen === "📃")) {
                        return message.reply("You won EPICC!");
                    } else if (me === clientChosen) {
                        return message.reply("Wow! its a tie how did you read my brain....");
                    } else {
                        return message.reply("BOOOOO you lose haha!");
                    }
                }
            }
        }
    }
}

async function promptMessage (message, author, time, validReactions) {
        time *= 1000;
        for (const reaction of validReactions) await message.react(reaction);
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
        return message
            .awaitReactions(filter, { max: 1, time: time })
            .then(collected => collected.first() && collected.first().emoji.name);
    }
