const discord = require('discord.js-commando');
const { Client, Attachment, RichEmbed  } = require('discord.js');
const client = new Client();
const TOKEN = "NTM4NTUwMjkzMjE0OTIwNzA0.Dy1iqw.mSZhZ3qoj9ijR-FzH-gpOoKvO3A";
const YTDL = require("ytdl-core");
var bot = new discord.Client();
var servers = {};

const PREFIX = "-"

function play(connection, message){
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var fortunes = ["Yes,", "No", "Maybe", "Fuck you cunt", "Stop talking to me you son of a whore", "I fucked your mom you ugly bastard", "WOOF! That's what I sound like in your ass negro", "You kiss your mother with that mouth?", "OwO", "https://cdn.discordapp.com/attachments/496105016743165953/540412590694858772/thats_how_it_is.png", "https://cdn.discordapp.com/attachments/496105016743165953/540412197256560640/time_to_die.jpg"];

bot.registry.registerGroup('random', 'Random')
bot.registry.registerDefaults();

bot.on("ready", function(){
    console.log("Ready!");

}); 

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").sendMessage.toString() + " Welcome to hell niggy"

    member.addRole(member.guild.roles.find("name", "Negro" ));

});

bot.on("message", function(message){
    if (message.author.equals(bot.user)) return;

    if (message.content == "hello") {
        message.channel.sendMessage("Hi, there! I am Drafter's Slave bought on the seventh seas of bravos. Use me as you'd like :) ");
    }

});

            bot.on("message", function(message){
                if (message.author.equals(bot.user)) return;

                if (!message.content.startsWith(PREFIX)) return;

                var args = message.content.substring(PREFIX.length).split(" ");

                switch (args[0]) {
                    case "ping":
                        message.channel.sendMessage("Pong!");
                        break;
                    case "version":
                     message.channel.send(embed);
                     break;

                    case "info":
                          const embed = new RichEmbed()
                            .setTitle('Drafters Bot Support')
                            .setColor(0xFF0000)
                            .setDescription("Drafter's Slave created with Java Script, Node.js and discord.js")
                            .setFooter("Commands:" + "\n -Roll, " + "\n -Bot, " + "\n -OwO, " + "\n -Info");
                          message.channel.send(embed);
                        break;
                    case "roll":
                        var roll = Math.floor(Math.random()* 6) + 1;
                         message.reply("You rolled a " + roll);
                         break;
                    case "bot":
                        if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]); 
                        else message.channel.sendMessage("Can't read that retard!");
                        break;
                    case "OwO":
                        const attachment = new Attachment('https://cdn.discordapp.com/attachments/496105016743165953/540412590694858772/thats_how_it_is.png');
                        message.channel.send(attachment);
                        break;
                    case "play":
                    if(!args[1]) {
                        message.channel.sendMessage("Please provide a valid link");
                        return;
                    }

                    if(!message.member.voiceChannel) {
                        message.channel.sendMessage("You must be in a voice channel you fucking stupid mother fucker.");
                        return;
                    }

                    if(!servers[message.guild.id]) servers[message.guild.id] = {
                        queue: []

                    };

                    var server = servers[message.guild.id];

                    server.queue.push(args[1]);

                    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                        play(connection, message);

                        message.channel.sendMessage("Now playing your link master!");
                    });
                    break;
                case("skip"):
                    var server = servers[message.guild.id];
                    if (server.dispatcher) server.dispatcher.end();
                break;
                case "stop":
                    if (message.guild.voiceConnection)
                    {
                        for (var i = server.queue.length - 1; i >= 0; i--) 
                       {
                        server.queue.splice(i, 1);
                    }                  
                    server.dispatcher.end();
                    console.log("[" + new Date().toLocaleString() + "] Stopped the queue.");
                }                   
                break;
                
                    default:
                        message.channel.sendMessage("[!] Sorry! I do not know this command. Please try looking at our info page for commands by using -info.");
                }

            });



bot.login(TOKEN);
        