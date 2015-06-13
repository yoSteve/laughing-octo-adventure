var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	username: String,
	email: String,
	password: String
});
