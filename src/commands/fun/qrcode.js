const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {angrybear} = require('../../settings/emojis.json')

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: '',
            category: `${angrybear} Fun`,

        })
    }
        async run(message, args) {
            let text = args.slice(0).join(" ");
            if (args.length < 2) {
              message.channel.send(
                "You must add text to your command, so I can convert it to a QR code.\nEg: `.qr This message is now encoded as a QR code` "
              );
            } else {
              var user_text = text.replace(/ /g,"%20");;
        
              var qr_generator = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user_text}`;
              console.log(qr_generator)
              const embed = new MessageEmbed()
              .setTitle("QR Code")
              .setColor("#3440eb")
              .setDescription("Here is your QR Code!")
              .setImage(qr_generator+".png")
              message.channel.send(embed);
            }
            function getRandomNumber(min, max) {
              return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
    }