const { SlashCommandBuilder } = require('@discordjs/builders');
const { formatDistance} = require("date-fns");
const { Event } = require('../db/sequelize')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ago')
        .setDescription('Show the time since the last reported team kill')
    ,

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const tk = await Event.findOne({
            order: [ [ 'createdAt', 'DESC' ]],
        })

        let lastTkDate = tk.date;
        let timeDistance = formatDistance(lastTkDate, new Date(), { addSuffix: true });

        await interaction.reply({
            ephemeral: true,
            content: `The last team kill was reported ${timeDistance}.`
        });
    }
}
