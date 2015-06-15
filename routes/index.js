var express = require('express');
var router = express.Router();
var theGame = require('../app_modules/theGame');
var Waiting = require('../models/waiting')


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
		res.render('lobby', {waiting: Waiting.find(), user: req.user});
	});
	
	router.get('/game', isAuthenticated, function(req, res) {
		res.render('game', {user: req.user });
	});

	//////socket work//////
  var nspGame = io.of('/game');
	nspGame.on('connection', function(socket) {
		if (socket.request.session.passport)
			var userId = socket.request.session.passport.user;
		console.log("your user id if", userId);
		socket.on('disconnect', function() {
			console.log('somebody disconnected');
		});
		//start game board
		socket.on('start-game', function(err) {
  		var res = theGame.setUp();
			socket.emit('game-board', res);
		})

		socket.on('move', function(data){
			initialPos = data[0]['value'];
			finalPos = data[1]['value'];      
      var res = theGame.move(initialPos, finalPos);
			socket.emit('return-move', res);
		});
	});
	
	return router;


}
