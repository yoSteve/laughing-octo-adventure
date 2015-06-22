var router = require('koa-router');
var User = require('../models/user');
var theGame = require('../app_modules/theGame');
var r = require('../db'); //set up db connection here
function socket (io, app, session) {
    var nspLobby = io.of('/lobby');
    var games = {};
    nspLobby.on('connection', function(socket){
      console.log(games);

      var cookies = socket.request.headers.cookie;
      console.log(cookies);
      var regEx = /passport"\:\{"user"\:"(.+?)"\}/g
      var userIdMatches = regEx.exec(cookies);

      if(userIdMatches && userIdMatches.length > 1) {
        var userId = userIdMatches[1];
        if (userId){
          console.log('user id found', userId);
          User.findById(userId, function(err, currentUser){
            if(currentUser) {
              currentUser.socketId = socket.id;
              currentUser.waiting = false;
              currentUser.save();
              User.findOne({waiting: true, username: {'$ne': currentUser.username}}, function(err, user){
                if(user) {
                  console.log("matchXXXXXXXXXXX", user.username, currentUser.username);
                  var gameId = theGame.createGameId(currentUser._id, user._id);
                  var game = new theGame.Game(nspLobby, gameId, currentUser, user);
                  //broadcast to the opponent (away)
                  socket.broadcast.to(user.socketId).emit('match-message', game.gameId);
                  //automatically joins the game room, when the opponent joins the game, he will automatically be taken to the 
                  //game page on start game
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
      }
      // joining the game lobby, initialized of game with user ids (inprogress)
      socket.on('start-game', function(gameId){
          socket.join(gameId);
          console.log('logging data passed back ' + gameId);
          games[gameId].refreshBoard();
      });

      socket.on('move', function(data) {
        console.log(data.gameId);
        games[data.gameId].move({ initPos: 'fake', finPos: 'fake' });
        //receives the move information
        //emits matches to room,
        //emits refreshed board (game state) to room 
      });

      socket.on('disconnect', function() {
        console.log('someone left the lobby');
        if(app.request.user){
          User.findById(app.request.user, function(err, currentUser){
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
