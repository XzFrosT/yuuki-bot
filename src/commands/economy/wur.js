const Command = require('../../Structures/Command')
const {MessageEmbed, ReactionUserManager} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const {question} = require("../../settings/trivia/wouldurather.json")

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
            let q = question[Math.floor(Math.random() * question.length)];
            let i = 0;
            const Embed = new MessageEmbed()
              .setTitle(q.title)
              .setDescription(
                q.options.map((opt) => {
                  i++;
                  return `${i} - ${opt}\n`;
                })
              )
              .setColor(`GREEN`)
              .setFooter(
                `Reply to this message with the correct question number! You have 15 seconds.`
              );
            message.channel.send(Embed);
            try {
              let msgs = await message.channel.awaitMessages(
                (u2) => u2.author.id === message.author.id,
                { time: 15000, max: 1, errors: ["time"] }
              );
              if (parseInt(msgs.first().content) == q.correct) {
                return message.channel.send(q.brother);
              } else {
                return message.channel.send(q.friend);
              }
            } catch (e) {
              return message.channel.send(`What a jerk never answered in time?`);
            }
        }
    }