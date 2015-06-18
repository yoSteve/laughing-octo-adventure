var router = require('koa-router')();
var theGame = require('../app_modules/theGame');
var User = require('../models/user');

var isAuthenticated = function(){}
module.exports = function(passport, io){
	router.get('/', function *(next) {
    console.log(this.response, "ashdflakjdshfluaihsdlisuhdflahhhhhhaa");
    //redirects logged in users to the lobby, i
    //but assigns the new socket to the useri
    // socket id, may run into problems if 
    // user has multiple windows or if the user
    // disconnects and reconnects, maybe store
    // current game in array and on connect have
    // the user join the current game,  would then
    // have to make user the game is active, or have
    // the user select from a list of active games 
    // if we want them to be able to be playing multiple games at once.
		this.response.render('index');
	});

	//google login redirects to google, google directs back
	router.get('/auth/google', passport.authenticate('google'));

	router.get('/auth/google/response',
		passport.authenticate('google', {
      successRedirect: '/game_canvas',
      failureRedirect: '/'
    })
  )
		//handle login
	router.post('/login',passport.authenticate('login', {
			successRedirect: '/lobby',
			failureRedirect: '/',
	}));

	//handle Registration
	router.post('/signup', passport.authenticate('signup', {
			successRedirect: '/lobby',
			failureRedirect: '/',
	}));

	router.get('/logout', function *(next) {
		req.logout();
		res.redirect('/');
	});

	router.get('/lobby', isAuthenticated, function *(next) {
		User.find({waiting: true}, function(err, docs){
				res.render('lobby', {waiting: docs});
		});
	});
	
	router.get('/game', isAuthenticated, function *(next) {
		res.render('game', {user: req.user });
	});

	router.get('/game_canvas', isAuthenticated, function *(next) {
		res.render('game_canvas');
	});

//socket work using lobby namespace
	var nspLobby = io.of('/lobby');
  var games = {};
	nspLobby.on('connection', function(socket){
    console.log(games);
    console.log(socket.request.session);
		if (socket.request.session.passport){
			User.findById(socket.request.session.passport.user, function(err, currentUser){
        if(currentUser) {
          currentUser.socketId = socket.id;
          currentUser.waiting = false;
          currentUser.save();
          User.findOne({waiting: true, username: {'$ne': currentUser.username}}, function(err, user){
            if(user) {
              console.log("matchXXXXXXXXXXX", user.username, currentUser.username);
              var gameId = theGame.createGameId(currentUser._id, user._id);
              var game = new theGame.Game(nspLobby, gameId, currentUser, user);
              socket.broadcast.to(user.socketId).emit('match-message', game.gameId);
              socket.join(game.gameId);
              user.waiting = false;
              user.save();
              games[gameId] = game;
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
        console.log('logging data passed back ' + games);
        games[data['gameId']].refreshBoard();
    });

		socket.on('disconnect', function() {
      console.log('someone left the lobby');
      if(socket.request.session.passport){
        User.findById(socket.request.session.passport.user, function(err, currentUser){
          if(currentUser) {
            currentUser.waiting = false;
            currentUser.save();
          }
        });
      }
		});

	});	
	return router;
}
