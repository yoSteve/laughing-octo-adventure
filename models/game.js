var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var Game = new Schema({
	playerr0: ObjectId,
	player1: ObjectId,
	board: Array
})

mongoose.model('Game', Game);
module.exports = mongoose.model('Game');
