const { SlashCommandBuilder } = require('@discordjs/builders');
const {format} = require("date-fns");
const { Event } = require('../db/sequelize')
const AsciiTable = require('ascii-table')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('List all team kills reports')
        .addUserOption(option => option
            .setName('killer')
            .setDescription('Who is the \'s murderous villain?')
            .setRequired(false)
        )
        .addBooleanOption((option) => option
            .setName("all")
            .setDescription("List all reports")
            .setRequired(false)
        )
    ,

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        let now = new Date();
        const guildId = interaction.guildId;
        let filter = { guild_id: guildId }

        const all = interaction.options.getBoolean('all');
        const killer = interaction.options.getUser('killer');

        if (killer) {
            filter.killer_id = killer.id;
        } else if (!all) {
            await interaction.reply(
                "Tell us who is the murderous villain or choose to list all reports!"
            );
            return;
        }

        try {
            const count = await Event.count({
                where: filter
            });

            if (count < 1) {
                await interaction.reply({
                    content: `Hmm... there are no such reports!`
                });

                return;
            }

            const records = await Event.findAll({
                where: filter
            });

            const table = new AsciiTable('💀\n')
                .setHeading('ID', 'Murderer', 'Victim', 'Weapon', 'Date')
                .setHeadingAlign(AsciiTable.LEFT)
            ;

            records.forEach((record) => {
                const event = record.dataValues
                let formattedDate = format(event.date, 'dd/MM/yyyy');
                let formattedTime = format(event.date, 'h');

                table.addRow(event.id, event.killer_name, event.victim_name, event.weapon, `${formattedDate} at ${formattedTime} o'clock`);
            });

            const response = '```'+table.removeBorder().toString()+'```';

            await interaction.reply({
                content: response
            });
        } catch (e) {
            console.log(e.message);
            await interaction.reply(
                'There was an error trying to list the reports.'
            );
        }
    }
}
