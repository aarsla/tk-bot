const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show information about the team kill bot commands')
        .addStringOption((option) => option
            .setName("command")
            .setDescription("Show information about the specific command")
            .setRequired(false)
        )
    ,

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        let response = '';
        const command = interaction.options.getString('command');
        const availableCommands = ['ago', 'ahoy', 'help', 'last', 'list', 'report'];

        if (!command) {
            response = `
**TeamKill Bot Commands:**

**/ago**: Shows the time since the last reported team kill.
**/ahoy**: Politely says hello.
**/help**: Shows information about the team kill bot commands.
**/last**: Shows the last reported team kill.
**/list**: Lists all team kills reports.
**/report**: Reports a team kill to the database.
`;
            await interaction.reply(response);
            return;
        }

        if (!availableCommands.includes(command)) {
            response = `**Command not available**`;
            await interaction.reply(response);
            return;
        }

        switch (command) {
            case 'help':
                response = `
**/help**: Shows information about the team kill bot commands.
- Options:
  - **command**: Shows options of a specific command. 
`;
                break;
            case 'list':
                response = `
**/list**: Lists all team kills or all teamk ills from one individual.
- Options:
  - **killer**: The Discord user whose team kills should be listed. 
  - **all**: Lists all team kills from the database.
`;
                break;
            case 'report':
                response = `
**/report**: Reports a team kill to the database.
- Required fields
  - **killer**: The Discord user who performed the team kill.
  - **victim**: The Discord user who was killed.
- Optional fields:
  - **weapon**: Weapon of the team kill.
`;
                break;
            default:
                response = `**Command does not require any options**`;
                break;
        }

        await interaction.reply(response);
    }
}
