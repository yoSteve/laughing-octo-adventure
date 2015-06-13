var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');

module.exports = function(passport){
//serialize the user
	passport.serializeUser(function(user, done) {
		console.log('serializing user: ', user);
		done(null, user._id);
	});

	passport.desrializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			console.log('deserializing user: ', user);
			done(err, user);
		});
	});

	//set up login/signup
	login(passport);
	signup(passport);
}
