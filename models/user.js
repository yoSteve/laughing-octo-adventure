var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Team = require('./team');

var User = new Schema({
	username: String,
	email: String,
	password: String,
	stats: {
		wins: Number,
		losses: Number,
		quits: Number
	},
	teams: [Team],
	waiting: Boolean,
  socketID: String
});

mongoose.model('User', User);
module.exports = mongoose.model('User'); 


