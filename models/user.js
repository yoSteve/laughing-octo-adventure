var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	username: String,
	email: String,
	password: String
});



User.statics.findOrCreate = function(profile, done) {
	this.findOne({'password' : profile.id}, function(err, user) {
		if (err)
			return done(err)
		if(user)
			return done(null, user)
	});

	var newUser = this();
	newUser.username = profile.displayName;
	newUser.password = profile.id;
	newUser.email = profile.name.familyName; //placeholder

	newUser.save(function(err){
		if (err)
			return done(err);
		return done(null, newUser);
	})
	
	console.log('shouldnt get here');	
}

mongoose.model('User', User);
module.exports = mongoose.model('User'); 


