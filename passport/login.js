var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-node');

module.exports = function(passport){

	passport.use('login', new LocalStrategy(
		function(username, password, done) {
			var loginError = done(null, false, req.flash("login error: username and password do not match)"));

			User.findOne({ 'username' : username }, function(err, user){ 
				if (err)
					return done(err);
				if(!user){
					console.log('User not found', username);
					return loginError;
				}
				if(!isValidPassword(user, password)) {
					console.log('Invalid Password');
					return loginError;
				}
				return done(null, user);
			});
		})
	);

	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	}
}
