require("dotenv/config");

const fs = require("fs");
const path = require("path");

const Discord = require("discord.js");

const client = new Discord.Client();

client.once("ready", function() {
   console.log("Ready!");
   client.commands = new Discord.Collection();
   fs.readdirSync("./commands")
       .filter(file => file.endsWith(".js"))
       .map(file => require(path.join("./commands", file)))
       .forEach(command => client.commands.set(command.name, command));
});

client.on("message", function(message) {
   if (message.mentions.has(client.user)) {
       return message.reply("my prefix for this server is `!`! use `!help` for more information.");
   }
});

client.login().catch(console.error);