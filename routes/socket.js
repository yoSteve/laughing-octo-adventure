var router = require('koa-router');
var User = require('../models/user');
var theGame = require('../app_modules/theGame');
var r = require('../db'); //set up db connection here
function socket (io) {
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
}

module.exports = socket;
