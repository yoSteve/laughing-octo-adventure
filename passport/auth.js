var passport = require('koa-passport');
var secrets = require('../secrets');
var User = require('../models/user');
var bCrypt = require('bcrypt-node');
var sanitize = require('sanitize-html');

passport.serializeUser(function(user, done) {
  console.log('serialized');
  done(null, user.id);
})

passport.deserializeUser(function(id, done) { User.findById(id, function(err, user) {
    done(null, user);
  })
})

var LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function(username, password, done) {
  //retrieve user
  findOrCreateUser(username, password, done);
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
  findOrCreateUser(profile.displayName, profile.id, done, true);
  }
))


var findOrCreateUser = function(username, password, done, oauth){
  oauth = typeof oauth !== 'undefined' ?  oauth : false;
  User.findOne({ 'username': sanitize(username) }, function(err, user){
    if (err) {
      console.error(('Error in signup : ' + err));
      return done(err);
    }

    if (user) {
      if(!oauth){
				if(!isValidPassword(user, password)) {
					console.log('Invalid Password');
					return done(null, false);
				}
      } else {
        if(!isValidToken(user, password)) {
          console.log('google oauth issue');
            console.log('Invalid Passowrd');
            return done(null, false);
        }
      }
				return done(null, user);
    } else {
      var newUser = new User();
      //set credentials
      //placeholder
      newUser.username = password;
      if (!oauth)
        newUser.password = createHash(sanitize(password));
      else
        newUser.password = password;

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
  password = sanitize(password);
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


var isValidPassword = function(user, password){
  password = sanitize(password);
  return bCrypt.compareSync(password, user.password);
}

var isValidToken = function(user, password){
  password = sanitize(password);
  console.log(password, user.password);
  return (0 === user.password.localeCompare(password));
}
