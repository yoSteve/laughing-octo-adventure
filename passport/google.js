var StrategyGoogle = require('passport-google-openidconnect').Strategy;
var User = require('../models/user');
var secrets = require('../secrets');
module.exports = function(passport) {

	passport.use(new StrategyGoogle({
			clientID: secrets['GOOGLE_CLIENT_ID'],
			clientSecret: secrets['GOOGLE_CLIENT_SECRET'],
			callbackURL: "http://localhost:3000/auth/google/response"
		},
		function(iss, sub, profile, accessToken, refreshToken, done) {
			
			var findOrCreateUser = function(){
				User.findOne({'password' : profile.id}, function(err, user) {
					if (err)
					return done(err)
				if(user)
					return done(null, user)
				});
				var newUser = new User();
				//set credentials
				newUser.username = profile.displayName;
				newUser.password = profile.id;
				newUser.email = profile.name.familyName; //placeholder 

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
			process.nextTick(findOrCreateUser);
//			User.findOrCreate(profile, function (err, user) {
//				return done(err, user);
//			});
		}
	));
}

