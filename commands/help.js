const fs = require('fs');
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('봇 커맨드를 확인하실 수 있습니다.'),
    execute(interaction) {
        const embed = new MessageEmbed()
            .setTitle(':information_source: **Help!**')
            .setDescription('명령어 리스트 입니다.')
            .setColor('BLUE')
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });

        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            embed.addField(`**${command.data.name}**`, `${command.data.description}`, true);
        }

        return void interaction.reply({ embeds : [embed] });
    },
};