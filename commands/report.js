const { SlashCommandBuilder } = require('@discordjs/builders');
const {format} = require("date-fns");
const { Event } = require('../db/sequelize')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report a new team kill')
        .addUserOption(option => option
            .setName('killer')
            .setDescription('Who is the \'s murderous villain?')
            .setRequired(true)
        )
        .addUserOption(option => option
            .setName('victim')
            .setDescription('Who is the \'s abused victim?')
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName("weapon")
            .setDescription("Weapon used?")
            .setRequired(false)
        )
    ,

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        let now = new Date();
        const guildId = interaction.guildId;
        let formattedDate = format(now, 'dd/MM/yyyy');
        let formattedTime = format(now, 'h');
        let killer = interaction.options.getUser('killer');
        let victim = interaction.options.getUser('victim');
        const weapon = interaction.options.getString("weapon");

        const tk = await Event.create({
            guild_id: guildId,
            killer_id: killer.id,
            killer_name: killer.globalName ?? killer.username,
            victim_id: victim.id,
            victim_name: victim.globalName ?? victim.username,
            weapon: weapon,
            date: now
        });

        await interaction.reply({
            content: `Let it be known that ${killer} killed ${victim} ${weapon ? `with a ${weapon}` : ``} on ${formattedDate} at ${formattedTime} o'clock! Dead men tell no tales.`
        });
    }
}
