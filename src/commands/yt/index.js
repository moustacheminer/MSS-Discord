const config = require("./../../config.json");
const API = require("./../../api.json");
const MSS = require("./../../functions/");
const searchYT = require('youtube-node');
const searchYTClient = new searchYT();
const yt = require('ytdl-core');
searchYTClient.setKey(API.youtube);

module.exports = function yt(message) {
	let input = message.content.replace (/\n/g, "").split(" ");
	//Get the voice channel that it's going to play to.
	let voiceChannel = message.member.voiceChannel;

	input.shift();
	input.shift();
	let search = input.join(" ");

	searchYTClient.search(search, 1, function(error, result) {
		if (error) {
			console.log(error);
			message.reply(error);
			MSS.msg.react(message, false, "bomb");
			return false;
		} else if (!result["items"][0]) {
			message.reply("No search results found.");
			MSS.msg.react(message, false, "X");
			return false;
		} else {
			MSS.msg.react(message, true);
			MSS.music.add(message, "youtube", "https://youtube.com/watch?v=" + result["items"][0]["id"]["videoId"], result["items"][0]["snippet"]["title"], result["items"][0]["snippet"]["thumbnails"]["default"]["url"]);
		}
	});
}

