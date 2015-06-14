var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-node');
var User = require('../models/user');
module.exports = function(passport){

	passport.use('login', new LocalStrategy({
		passReqToCallback : true
	},
		function(req, username, password, done) {

			console.log("hey", username);
			User.findOne({ 'username' : username }, function(err, user){ 
				if (err)
					return done(err);
				if(!user){
					console.log('User not found', username);
					return done(null, false, req.flash('message', "login error: user not found"));
				}
				if(!isValidPassword(user, password)) {
					console.log('Invalid Password');
					return done(null, false, req.flash('message', "login error: username and password do not match)"));
				}
				return done(null, user);
			});
		})
	);

	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	}
}
