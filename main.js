// environment variables
import "dotenv/config";

// discord.js library
import { Client, GatewayIntentBits, Partials } from "discord.js";

// discord.js/voice library
import { joinVoiceChannel } from "@discordjs/voice";

// create a new client and set the commands
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel],
});

// log in the bot
client.on("ready", function () {
  console.log(`Logged in as ${client.user.tag}!`);
});

// respond to messages
client.on("messageCreate", async function (msg) {
  if (msg.content === "Hello") {
    msg.reply("Hey!");
  } else if (msg.content === "join") {
    if (msg.member.voice.channel) {
      joinVoiceChannel({
        channelId: msg.member.voice.channel.id,
        guildId: msg.guild.id,
        adapterCreator: msg.guild.voiceAdapterCreator,
      });
      msg.reply("Joined the voice channel!");
    } else {
      msg.reply("You need to join a voice channel first!");
    }
  }
});

// logout of bot
setTimeout(() => {
  client.destroy();
  console.log("Bot has logged out.");
}, 120000); // milliseconds

// token authentication
client.login(process.env.DISCORD_TOKEN);
