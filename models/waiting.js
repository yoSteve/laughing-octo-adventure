var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var Waiting = new Schema({
	user: Array
})

mongoose.model('Waiting', Waiting);
module.exports = mongoose.model('Waiting');