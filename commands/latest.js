const { SlashCommandBuilder } = require('@discordjs/builders');
const {format} = require("date-fns");
const { Event } = require('../db/sequelize')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('latest')
        .setDescription('Show the last reported team kill')
    ,

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const tk = await Event.findOne({
            order: [ [ 'createdAt', 'DESC' ]],
        })

        let formattedDate = format(tk.date, 'dd/MM/yyyy');
        let formattedTime = format(tk.date, 'h');

        await interaction.reply({
            ephemeral: true,
            content: `${tk.victim_name} was brutally murdered by ${tk.killer_name} on ${formattedDate} at ${formattedTime} o'clock. RIP my fair friend.`
        });
    }
}
