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

	io.on('connection', function(socket) {
		console.log('somebody is connected!!!');
		socket.on('disconnect', function() {
			console.log('somebody disconnected');
		});
	});

	//handle login
	io.on('login', passport.authenticate('login', {
		successRedirect: '/game',
		failureRedirect: '/',
		failureFlash: true
	}));

	//handle Registration
	io.on('signup', passport.authenticate('signup', {
		successRedirect: '/game',
		failureRedirect: '/',
		failurFlash : true
	}));

	io.on('logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	return router;
}
