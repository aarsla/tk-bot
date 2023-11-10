const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ahoy')
        .setDescription('Politely say hello'),

    async execute(interaction) {
        await interaction.reply({
            ephemeral: true,
            content: 'Aye, Aye!'
        });
    }
}
