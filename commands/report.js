const { SlashCommandBuilder } = require('@discordjs/builders');
const {format} = require("date-fns");
const { Event } = require('../db/sequelize')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report a new team kill')
        .addMentionableOption(option => option.setName('killer').setDescription('Who is the \'s murderous villain?'))
        .addMentionableOption(option => option.setName('victim').setDescription('Who is the \'s abused victim?'))
    ,

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        let now = new Date();
        let formattedDate = format(now, 'dd/MM/yyyy');
        let formattedTime = format(now, 'h');
        let killer = interaction.options.getMentionable('killer');
        let victim = interaction.options.getMentionable('victim');

        const tk = await Event.create({
            killer_id: killer.user.id,
            killer_name: killer.user.globalName ?? killer.user.username,
            victim_id: victim.user.id,
            victim_name: victim.user.globalName ?? victim.user.username,
            date: now
        });

        await interaction.reply({
            ephemeral: true,
            content: `Let it be known that ${killer} killed ${victim} on ${formattedDate} at ${formattedTime} o'clock! Dead men tell no tales.`
        });
    }
}
