const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');
const storage = require(`../../models/storage`)
const fisherman = require(`../../models/fish`);
const hunt = require('../../models/hunt');

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['inv'],
            description: 'Check your inventory!',
            category: `${stinkybear} Economy`,
            ratelimit: {//limit for each command!
                bucket: 1,
                reset: 30 * 1000,
                stack: false,
            },

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

            const poleconfig = await fisherman.findOne({
                user: message.author.id
            });

            const polenumber = await poleconfig.get("pole")//pole conig

            const fishconfig = await fisherman.findOne({
                user: message.author.id
            });

            const DBnumber = await fishconfig.get("amount");//fish config

            const huntconfig = await hunt.findOne({
                user: message.author.id
            })
            const huntdbnumber = await huntconfig.get("amount")///hut config

            const rifleconfig = await hunt.findOne({
                user: message.author.id
            });
            const riflenumber = await rifleconfig.get("rifle")

            const em = new MessageEmbed()
            .setColor("RED")
            .addFields(
                {
                    name: `Owned Items`,
                    value: `🐟 Fish - \`${DBnumber}\` \n ID - \`fish\` - collectable \n\n 🐲 Dragon - \`${huntdbnumber}\` \n ID -\`dragon\` - collectable \n\n 🎣 Pole - \`${polenumber}\` \n ID - \`pole\` - instrument \n\n 🔫 Rifle - \`${riflenumber}\` \n ID - \`rifle\` - instrument`,
                    inline: false
                }
            )
            message.channel.send(em)
        }
    }