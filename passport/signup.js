var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bCrypt-node.js');

module.exports = function(passport){

	passport.user('signup', new LocalStrategy({ 
		passReqToCallback: true },
		function(req, username, password, done) {
			findOrCreateUser = function(){
				User.findOne({ 'username': username }, function(err, user){
				if (err) {
					console.error(('Error in signup : ' + err);
					return done(err);
				}

				if (user) {
					console.log('User already exists with username: ' + username);
					return done(null, false, req.flash('message', 'User Already Exists'));
				} else {
					var newUser = new User();
					//set credentials
					newUser.username = username;
					newUser.password = createHash(password);
					newUser.email = req.param('email');

					//save user
					newUser.save(function(err) {
						if (err){
							console.log('Error in Saving user: ' + err);
							return done(null, newUser);
						}
						console.log('User Registration succesful');
						return done(null, newUser);
					});
				}
			});
		};
	//Gen hash for password
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}
