const Player = require("./player.js");
const MSS = require('./../../functions/');

const Players = [];

exports.init = init;
exports.add = add;
exports.stop = stop;
exports.skip = skip;
exports.list = list;

function init(message) {
	console.log(typeof Players[message.guild.id]);
	if(typeof Players[message.guild.id] === 'undefined') {
		Players[message.guild.id] = new Player(message);
	}
}

function add(message, type, url, title, thumb) {
	if (!message.guild) return guildError(message);
	init(message);
	Players[message.guild.id].add(type, url, title, thumb);
}

function stop(message) {
	if (!message.guild) return guildError(message);
	init(message);
	if (!botCheck(message)) return;
	if (!adminCheck(message)) return;
	Players[message.guild.id].stop();
}

function skip(message) {
	if (!message.guild) return guildError(message);
	init(message);
	if (!botCheck(message)) return;
	if (!adminCheck(message)) return;
	Players[message.guild.id].skip();
}

function list(message) {
	if (!message.guild) return;
	init(message);
	if (!botCheck(message)) return;
	if(Players[message.guild.id].playlist.length > 0) {
		var string = "Playlist\n"
		string += Players[message.guild.id].playlist.join("\n");
		Players[message.guild.id].channel.send(string)
	} else {
		Players[message.guild.id].channel.send("The Playlist is empty")
	}
}

function guildError(message) {
	message.channel.send("You cannot run this command outside a guild!");
}

function botCheck(message) {
	if (Players[message.guild.id].voicechannel && Players[message.guild.id].voicechannel.connection) {
		return true;
	} else {
		Players[message.guild.id].channel.send("There is no bot in your channel");
		return false;
	}
}

function adminCheck(message) {
	if(MSS.msg.isadmin(message)) {
		return true;
	} else {
		Players[message.guild.id].channel.send("You are not an Administrator!");
		return false;
	}
}
