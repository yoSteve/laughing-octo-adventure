var express = require('express');
var router = express.Router();
var theGame = require('../app_modules/theGame');
var User = require('../models/user');

var isAuthenticated = function(req, res, next) {
	//checks to see if session is authenticated and
	//lets through to their request
	//else redirects to login (home)
	if(req.isAuthenticated())
    return next();
	res.redirect('/');
}

module.exports = function(passport, io){
	router.get('/', function(req, res) {
    if(res.user)
      res.redirect('game')
		res.render('index', {message: req.flash('message')});
	});

	//google login redirects to google, google directs back
	router.get('/auth/google', passport.authenticate('google-openidconnect'));

	router.get('/auth/google/response',
		passport.authenticate('google-openidconnect', {
			successRedirect: '/lobby',
			failureRedirect: '/'
		}));
		//handle login
	router.post('/login',passport.authenticate('login', {
			successRedirect: '/lobby',
			failureRedirect: '/',
			failureFlash: true
	}));

	//handle Registration
	router.post('/signup', passport.authenticate('signup', {
			successRedirect: '/lobby',
			failureRedirect: '/',
			failureFlash : true
	}));

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/lobby', isAuthenticated, function(req, res) {
		User.find({waiting: true}, function(err, docs){
				res.render('lobby', {waiting: docs});
		});
	});
	
	router.get('/game', isAuthenticated, function(req, res) {
		res.render('game', {user: req.user });
	});

	router.get('/game_canvas', isAuthenticated, function(req, res) {
		res.render('game_canvas');
	});

	//////This is depricated and not used//////
  var nspGame = io.of('/game');
	nspGame.on('connection', function(socket) {
		if (socket.request.session.passport){
			 User.findById(socket.request.session.passport.user, function(err, currentUser) {
        currentUser.socketId = socket.id;
        currentUser.save();
			  console.log("your in the game", currentUser.username, currentUser.socketId, socket.id);
			});
		}

		socket.on('disconnect', function() {
			console.log('someone left the game');
		});
		//start game board
		socket.on('start-game', function(err) {
  		var res = theGame.setUp();
			socket.emit('game-board', res);
		});

		socket.on('move', function(data){
			initialPos = data[0]['value'];
			finalPos = data[1]['value'];      
      var res = theGame.move(initialPos, finalPos);
			socket.emit('return-move', res);
		});
	});
//socket work using lobby namespace
	var nspLobby = io.of('/lobby');
	nspLobby.on('connection', function(socket){
		if (socket.request.session.passport){
			User.findById(socket.request.session.passport.user, function(err, currentUser){
        if(currentUser) {
          console.log("\n\n\n\n\n", currentUser);
          currentUser.socketId = socket.id;
          currentUser.waiting = false;
          currentUser.save();
          console.log("\n\n\n\n\n After setting to false", currentUser);
          User.findOne({waiting: true, username: {'$ne': currentUser.username}}, function(err, user){
            console.log("XXXXXXXXXXXXXXXXXX found", user);
            if(user) {
              console.log('\n\n\n\n\n\n\n', user._id, '\n\n\n', currentUser._id);
              console.log("matchXXXXXXXXXXX", user.username, currentUser.username);
              var gameId = theGame.createGameId(currentUser._id, user._id);
              var game = new theGame.Game(nspLobby, gameId, currentUser, user);
              socket.broadcast.to(user.socketId).emit('match-message', game.gameId);
              socket.emit('match-message', game.gameId);
              user.waiting = false;
              user.save();
            } else {
            currentUser.waiting = true;
            }
            currentUser.save();
          });
          console.log(currentUser.username, " is in the lobby");
        }
			});
		}
    // joining the game lobby, initialized of game with user ids (inprogress)
    socket.on('start-game', function(data){
        console.log(data['gameId'], " XXXXX NEED TO NKNOW OIEUHFDLS");
        socket.join(data['gameId']);
    });

		socket.on('disconnect', function() {
			User.findById(socket.request.session.passport.user, function(err, currentUser){
        if(currentUser) {
          console.log('someone left the lobby');
          currentUser.waiting = false;
          currentUser.save();
        }
      });
		});

		socket.on('starting-game', function(err, data){
			console.log('starting game');
		});
	});	
	return router;
}
