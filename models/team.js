var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChampionsSchema = new Schema({
	maxHp: Number,
	attr: {},//add in the colors, set values
	specialAttacks: {}, //add mana match moves
	class: String,
	name: String,
}); 

var TeamSchema = new Schema({
	mp: Number,
	champions: [ChampionsSchema]
});

TeamSchema.methods.maxHp = function(){
  return this.champions.reduce(function(total, champ){
    return total + champ.maxHp;
  });
}
module.exports = mongoose.model('Team', TeamSchema, 'Team');
