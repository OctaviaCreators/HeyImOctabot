const Eris = require("eris");

// Replace BOT_TOKEN with your bot account's token
var bot = new Eris.CommandClient("MzE2NjMyMjczNzE1NzI0Mjg4.DAYGTQ.l59QFE13MFH3F-su4RdQ7vIk730", {}, {
    description: "A simple bot made in Eris.",
    owner: "HeyImOctavia (AzureLgx)#6339",
    prefix: "octabot-"
});

bot.on("ready", () => { // When the bot is ready
    console.log("Ready!"); // Log "Ready!"
});

bot.registerCommandAlias("halp", "help"); // Alias !halp to !help

bot.registerCommand("ping", "Pong!", { // Make a ping command
// Responds with "Pong!" when someone says "!ping"
    description: "Pong!",
    fullDescription: "This command could be used to check if the bot is up. Or entertainment when you're bored."
});

bot.registerCommand("pong", ["Pang!", "Peng!", "Ping!", "Pung!"], { // Make a pong command
// Responds with a random version of "Ping!" when someone says "!pong"
    description: "Ping!",
    fullDescription: "This command could also be used to check if the bot is up. Or entertainment when you're bored."
});

var echoCommand = bot.registerCommand("echo", (msg, args) => { // Make an echo command
    if(args.length === 0) { // If the user just typed "!echo", say "Invalid input"
        return "Invalid input";
    }
    var text = args.join(" "); // Make a string of the text after the command label
    return text; // Return the generated string
}, {
    description: "Make the bot say something",
    fullDescription: "The bot will echo whatever is after the command label.",
    usage: "<text>"
});

echoCommand.registerSubcommand("reverse", (msg, args) => { // Make a reverse subcommand under echo
    if(args.length === 0) { // If the user just typed "!echo reverse", say "Invalid input"
        return "Invalid input";
    }
    var text = args.join(" "); // Make a string of the text after the command label
    text = text.split("").reverse().join(""); // Reverse the string
    return text; // Return the generated string
}, {
    description: "Make the bot say something in reverse",
    fullDescription: "The bot will echo, in reverse, whatever is after the command label.",
    usage: "<text>"
});

bot.on("guildMemberAdd", (guild, member) => { // When a member joins a guild
    var response = `Please give a warm welcome to ${member.mention} to ${guild.name}!`;
    // Make a welcome string with the member mention and guild name

    bot.createMessage(guild.defaultChannel.id, response);
    // Send the response in the guild's default channel
});

bot.on("guildMemberRemove", (guild, member) => { // When a member leaves a guild
    var response = `@${member.user.username} has left us... Force them to join back please!`;
    // Make a farewell string with the member's username

    bot.createMessage(guild.defaultChannel.id, response);
    // Send the response in the guild's default channel
});

echoCommand.registerSubcommandAlias("backwards", "reverse"); // Alias "!echo backwards" to "!echo reverse"

bot.connect();
