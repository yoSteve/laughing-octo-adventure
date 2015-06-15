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
			User.findOrCreate(profile, function (err, user) {
				return done(err, user);
			});
		}
	));
}

