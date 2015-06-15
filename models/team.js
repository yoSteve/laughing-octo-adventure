var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Champions = new Schema({
	hp: Number,
	attr: {},//add in the colors, set values
	specialAttacks: {}, //add mana match moves
	class: String,
	name: String,
}); 

var Team = new Schema({
	mp: Number,
	champions: [Champions],
});
mongoose.model('Team', Team);
module.exports = mongoose.model('Team');
