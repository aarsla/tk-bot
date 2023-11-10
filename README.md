<p align="center">
    <a href="https://github.com/aarsla/tk-bot" target="_blank">
        <img src="https://raw.githubusercontent.com/aarsla/tk-bot/main/logo/tk-bot-logo.png" width="400">        
    </a>
</p>

<p align="center">
    <img src="https://img.shields.io/github/v/release/aarsla/tk-bot?color=red&style=for-the-badge" alt="release">
    <img src="https://img.shields.io/npm/v/discord.js?color=5865f2&label=discord.js&style=for-the-badge" alt="discord.js">
</p>

# About tk-bot
tk-bot is discord bot you can use to report a teamkill to. Based on a [package-skeleton-discordjs](https://github.com/JakyeRU/package-skeleton-discordjs) template.

# Commands
- `/ahoy` - Politely say hello;
- `/last` - Show the last reported team kill;
- `/report` - Report a new team kill;
- `/ago` - Show the time since tha last reported team kill;
- ... to be expanded?

# Installation
### Step 1: Create a new repository using this template.
Press the green button "Use this template" or [click here](https://github.com/aarsla/tk-bot/generate).

### Step 2: Download your newly created repository and install the dependencies.
After downloading your repository, you need to install the dependencies. At the root directory of your project, run the following command:
```bash
yarn install
```

### Step 3: Copy .env.example to .env and update the values.
> DISCORD_AUTH_TOKEN= <> (Your Discord bot token)

### Step 4: Run the bot.
At the root directory of your project, run the following command:
```bash
yarn start
```

Your bot is now running and ready to use.

# About configuration.json
`DISCORD_CLIENT_ID` - This is the client id of your Discord bot. _You shouldn't worry about setting it manually as we will automatically set it for you._

`DISCORD_TESTING_GUILD_ID` - This is the id of the guild where [guild slash commands](https://discordjs.guide/interactions/registering-slash-commands.html#guild-commands) will be registered.

### Why do I need a testing guild?
> Global commands are cached for one hour. New global commands will fan out slowly across all guilds and will only be guaranteed to be updated after an hour. Guild commands update instantly. As such, we recommend you use guild-based commands during development and publish them to global commands when they're ready for public use. ~ https://discordjs.guide

# The `yarn run deploy` command
The `yarn run deploy` command will deploy the slash commands from your project to Discord. Upon running this command, it will ask you if you want to deploy the commands to the testing guild or globally.
> Do you want to deploy the commands globally? If yes, type "YES", otherwise don't type anything:

If you say "YES", the commands will be deployed globally, otherwise they will be deployed to the testing guild provided in the `configuration.json` file (`DISCORD_TESTING_GUILD_ID`).
