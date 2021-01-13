const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const {stinkybear} = require('../../settings/emojis.json')
const eco = require('discord-mongoose-economy');
const {mongoPath} = require('../../../config.json');
const fisherman = require('../../models/fish');

module.exports = class extends Command{
    constructor(...args) {
        super(...args, {
            aliases: ['shop'],
            description: 'Visit the store grab discounted items and more :D',
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
            /** 
             * pole : {
             * basic pole = 1000 [1250]
             * mystic pole = 5000 [5500]
             * legendary pole = 10000 [12000]
             * rare pole = 50000 [25000]
             * finders pole = 2500 [2100]
             * }
            */
           
            const fishconfig = await fisherman.findOne({
                user: message.author.id
            });
            const basem = new MessageEmbed()
            .setColor("#FFFFFF")
            .setFooter("Donate us - Lili")
            .setTimestamp()
            if(["pole", "basicpole"].includes(args[0])) {
                const dbnumber = await fishconfig.get("pole")
                const strength = await fishconfig.get("polestrength")
                basem.setTitle(`Pole [ Owned: ${dbnumber}]`)
                basem.setDescription(`This is the pole which you can fish magical or marvlous sea creatures from the sea! \n\n **Buy: 10000** \n **Sell: 4000** \n\n **Strength left**: ${strength}`)
                basem.setThumbnail(`https://twemoji.maxcdn.com/v/latest/72x72/1f3a3.png`)
                message.channel.send(basem)
            } else if(args[0] === "rifle") {
                basem.setDescription(`A instrument used to catch animals such as dragons. Hunt more and get more money by selling them \n\n **Buy: 10000** \n **Sell: 4000**`)
                basem.setThumbnail()
                message.channel.send(basem)
            } else if(args[0] === "tiktok") {
                basem.setDescription(`A device used to post tiktoks on internet and get money! \n\n **Buy: 4000** \n **Sell: 500**`)
                basem.setThumbnail()
                message.channel.send(basem)
            }else if(args[0] === "fish") {
                const DBnumber = await fishconfig.get("amount");

                basem.setTitle(`Fish(${DBnumber} Owned)`)
                basem.setDescription(`A object which you can sell at the community store! \n\n **Buy: cannot be afforded** \n **Sell: 200**`)
                basem.setThumbnail()
                message.channel.send(basem)
            }else if(args[0] === "dragon") {
                basem.setDescription(`A object which you can sell at the community shop for many goodies \n\n **Buy: cannot be afforded** \n **Sell: 450**`)
                basem.setThumbnail()
                message.channel.send(basem)
            } else {
                const em = new MessageEmbed()
                .setTitle(`> Community shop - Lili`)
                .setColor(`GOLD`)
                .setDescription(`See the stuff you can buy in the shop!`)
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true}))
                .setTimestamp()
                .addFields(
                    {
                        name: `<:fishingpole:791195268749721650> Basic Pole`,
                        value: `Buy this to catch fish and sell fish for a great amount! \n`,
                        inline: false
                    },
                    {
                        name: `🔫 Hunting Rifle`,
                        value: `Hunt animals with this and get more cash! \n`,
                        inline: false
                    },
                    {
                        name: `📱 Tik Tok`,
                        value: `Post Tik Toks using this and get cash depending on the community! \n`,
                        inline: false,
                    },
    
                )
                .setFooter(`asked by ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
    
                message.channel.send(em)
    
            }
        }
    }