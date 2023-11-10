const { Client, CommandInteraction, Collection} = require("discord.js");
const Embed = require('../helpers/embed');
const embed = new Embed();

/**
 * Listens for the interactionCreate event and tries to respond to the interaction.
 * @type {{once: boolean, name: string, execute(*, *)}}
 */
module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     * Executes the interactionCreate event.
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    execute(interaction, client) {
        // Making sure the interaction is a command interaction.
        if (!interaction.isCommand()) return false;

        const { cooldowns } = client;

        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
            }
        }

        // Making sure the command is bound to a file.
        if (!client.commands.has(interaction.commandName)) {
            interaction.reply({
                embeds: [embed.error('NOT_BOUND')],
                ephemeral: true
            }).catch(console.error);
            return false;
        }

        // Getting the command file.
        const command = client.commands.get(interaction.commandName);

        // Executing the command.
        command.execute(interaction).catch(console.error);
    }
}
