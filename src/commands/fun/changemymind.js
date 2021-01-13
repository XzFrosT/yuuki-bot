const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {angrybear} = require('../../settings/emojis.json')
const fetch = require('node-fetch')

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['cmg'],
            description: '',
            category: `${angrybear} Fun`,
            ratelimit: {
              // how many times this command can be ran before getting limited.
              bucket: 1,
              // the time (in milliseconds) before the command can be used again, in this case: seven seconds
              reset: 20 * 1000,
              // whether the reset time should stack.
              stack: false
          },

        })
    }
        async run(message, args) {
            let texzt = args.slice(0).join(" ");
            fetch(
              `https://nekobot.xyz/api/imagegen?type=changemymind&text=${texzt}`
            )
              .then((res) => res.json())
              .then((body) => {
                console.log(body);
                let embed = new MessageEmbed()
                  .setImage(body.message)
                  .setColor("RANDOM");
                message.channel.send(embed);
              });
        }
    }