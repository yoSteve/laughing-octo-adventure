var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	user: String,
	email: String,
	password: String
});
