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

	router.post('logout', function() {
		console.log('logout');
	});

	io.on('connection', function(socket) {
		console.log('somebody is connected!!!');
		socket.on('disconnect', function() {
			console.log('somebody disconnected');
		});
	});
	
	return router;
}
