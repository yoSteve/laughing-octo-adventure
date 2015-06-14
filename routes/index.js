var express = require('express');
var router = express.Router();

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
			successRedirect: '/game',
			failureRedirect: '/'
		}));
		//handle login
	router.post('/login',passport.authenticate('login', {
			successRedirect: '/game',
			failureRedirect: '/',
			failureFlash: true
	}));

	//handle Registration
	router.post('/signup', passport.authenticate('signup', {
			successRedirect: '/game',
			failureRedirect: '/',
			failureFlash : true
	}));

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	router.get('/game', isAuthenticated, function(req, res) {
		res.render('game', {user: req.user });
	});

	io.on('connection', function(socket) {
		console.log('somebody is connected!!!');
		socket.on('disconnect', function() {
			console.log('somebody disconnected');
		});
	});
	
	return router;
}
