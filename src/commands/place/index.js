const Discord = require("discord.js");
const config = require("./../../config.json");
const MSS = require("./../../functions/");
const request = require("request");

module.exports = function place(message) {
	let input = message.content.replace (/\n/g, "").split(" ");
	var user = encodeURI(input[1]);

	request('http://moustacheminer.com/place/searchapi.php?username=' + user, function(error, response, body) {
		if(error) {
			message.reply("An error occured while retrieving the data: " + error);
		}

		var data = JSON.parse(body);
		var response = "/r/place info for " + input[1] + "\n";
		var overflow;

		data.info.forEach(function(element) {
			var colour;
			switch(element.colour) {
				case 1:
					colour = "Light Grey";
					break;
				case 2:
					colour = "Grey";
					break;
				case 3:
					colour = "Black";
					break;
				case 4:
					colour = "Pink";
					break;
				case 5:
					colour = "Red";
					break;
				case 6:
					colour = "Orange";
					break;
				case 7:
					colour = "Brown";
					break;
				case 8:
					colour = "Yellow";
					break;
				case 9:
					colour = "Lime";
					break;
				case 10:
					colour = "Green";
					break;
				case 11:
					colour = "Cyan";
					break;
				case 12:
					colour = "Blue";
					break;
				case 13:
					colour = "Dark Blue";
					break;
				case 14:
					colour = "Magenta";
					break;
				case 15:
					colour = "Purple";
					break;
				default:
					colour = "Invalid Colour ID";
					break;
			}

			if (response < 1900) {
				response += "Coloured (" + element.x + "," + element.y + ") " + colour + " at " + new Date(parseInt(element.time)) + "\n";
			} else {
				overflow = true;
			}
		});

		//Yes, false is a string. I'm so sorry
		if(data.error != "false") {
			message.reply(data.error);
		} else {
			if(overflow) {
				response += "The response is too large to display here: Please click the URL in the embed to view the rest.";
			}

			var embed = new Discord.RichEmbed()
				.setTitle(input[1])
				.setAuthor("/r/place", "http://moustacheminer.com/mss.png")
				.setColor("#00AE86")
				.setDescription(response)
				.setFooter("MSS-Discord, " + config.MSS.version, "")
				.setTimestamp()
				.setURL("http://moustacheminer.com/place/?username=" + user);



			message.channel.sendEmbed(embed, "", { disableEveryone: true });
		}
	});
}
