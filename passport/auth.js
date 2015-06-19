var passport = require('koa-passport');
var secrets = require('../secrets');
var User = require('../models/user');
var bCrypt = require('bcrypt-node');

passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(function(id, done) {
  done(null, user);
})

var LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function(username, password, done) {
  //retrieve user
  findOrCreateUser(username, password, false, done);
  }
))

var GoogleStrategy = require('passport-google-auth').Strategy
passport.use(new GoogleStrategy({
  clientId: secrets['GOOGLE_CLIENT_ID'],
  clientSecret: secrets['GOOGLE_CLIENT_SECRET'],
  callbackURL: "http://localhost:3000/auth/google/response"
  },
  function(token, tokenSecret, profile, done) {
  //retrieve user
  findOrCreateUser(profile.displayName, profile.id, true, done);
  }
))


var findOrCreateUser = function(username, password, oauth, done){
  User.findOne({ 'username': username }, function(err, user){
    if (err) {
      console.error(('Error in signup : ' + err));
      return done(err);
    }

    if (user) {
				if(!isValidPassword(user, password)) {
					console.log('Invalid Password');
					return done(null, false)
				}
				return done(null, user);
    } else {
      var newUser = new User();
      //set credentials
      newUser.username = username;
      if (!oauth)
        newUser.password = createHash(password);
      else
        newUser.password = password

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


var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}
