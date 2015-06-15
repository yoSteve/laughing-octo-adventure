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
	
	router.get('/engine/index', isAuthenticated, function(req, res) {
		res.render('game', {user: req.user });
	});

	router.get('/game_canvas', isAuthenticated, function(req, res) {
		res.render('game_canvas');
	});

	//////socket work//////
  var nspGame = io.of('/game');
	nspGame.on('connection', function(socket) {
		if (socket.request.session.passport){
<<<<<<< HEAD
			 User.findById(socket.request.session.passport.user, function(err, currentUser) {
			console.log("your in the game", currentUser.username);
=======
			 User.findById(socket.request.session.passport.user, function(err, doc) {
			var currentUser = doc;
			console.log(currentUser);
			if(currentUser)
				console.log("your user id if", currentUser.username);
>>>>>>> 91653e246c3d8e0024994a782761ea3077159c83
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

	var nspLobby = io.of('/lobby');
	nspLobby.on('connection', function(socket){
		if (socket.request.session.passport){
			User.findById(socket.request.session.passport.user, function(err, currentUser){
				console.log(currentUser.username, " is in the lobby");
			});
		}

		socket.on('disconnect', function() {
			console.log('someone left the lobby');
		});

		socket.on('starting-game', function(err, data){
			console.log('starting game');
		});
	});	
	return router;
}
