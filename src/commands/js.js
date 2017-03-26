const config = require("./../config.json");
const MSS = require("./../functions/");
const Sandbox = require("sandbox");
const Discord = require("discord.js");

module.exports = function(message) {
	var s = new Sandbox;

	if(message.author.id === config.MSS.sysadmin) {
		let input = message.content.replace (/\n/g, " ").split(" ");
		input[0] = input[0].substring(config.MSS.prefix.length);
		try {
			let command = message.content.substring(config.MSS.prefix.length + input[0].length + 1);
			s.run(command, function(output) {
				var embed = new Discord.RichEmbed()
					.setTitle("MSS-Discord JS Sandbox")
					.setAuthor(message.author.username, "http://moustacheminer.com/mss.png")
					.setColor("#00AE86")
					.setDescription(command || "No command input.")
					.setFooter("MSS-Discord, " + config.MSS.version, "")
					.setTimestamp()
					.setURL("http://moustacheminer.com/")
					.addField("Result", output.result || "No output")
					.addField("Console", output.console || "No output");

				message.channel.sendEmbed(embed, 'MSS-Discord JS Sandbox', { disableEveryone: true });
			});
		} catch(err) {
			message.reply("Something happened and an ACTUAL ERROR happened outside the sandbox.");
		}
	} else {
		MSS.msg.react(message, false, "X");
	}
}

