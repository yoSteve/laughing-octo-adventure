var router = require('koa-router');
var User = require('../models/user');
var Game = require('../models/game');
var r = require('../db'); //set up db connection here
var Team = require('../models/team');

var nspLobby;
var games = {};

var getCurrentUser = function(socket, cb){
  var cookies = socket.request.headers.cookie;
  var regEx = /passport"\:\{"user"\:"(.+?)"\}/g;
  var userIdMatches = regEx.exec(cookies);

  if(userIdMatches && userIdMatches.length > 1) {
    var userId = userIdMatches[1];
    if (userId){
      console.log('user id found', userId);
      return User.findById(userId, function(err, currentUser){
        return cb(currentUser);
      });
    }
  }
}

var enterMatchmaking = function(socket, currentUser) {
  User.findOne({waiting: true, username: {'$ne': currentUser.username}}, function(err, user){
    if(user) {
      console.log("matchXXXXXXXXXXX", user.username, currentUser.username);
      var gameId = Game.createGameId(currentUser._id, user._id);
      var game = Game.create({ io: nspLobby, 
        gameId: gameId, 
        homeUser: currentUser, 
        awayUser: user
      });
      currentUser.activeGames.push(gameId);
      user.activeGames.push(gameId);
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
}

function nsp (io) {
  nspLobby = io.of('/lobby'); 
  nspLobby.on('connection', function(socket){
    console.log('new connection, current active games: ',games.length);


    socket.on('team-chosen', function(teamInfo) {
      console.log(teamInfo.characters);
      getCurrentUser(socket, function(currentUser) {
        if(currentUser) {
          currentUser.team = new Team({
            teamName: teamInfo.teamName,
            champions: teamInfo.characters
          }); 
          //assign current team
          currentUser.socketId = socket.id;
          currentUser.waiting = false;
          currentUser.save();
          enterMatchmaking(socket, currentUser);
        }
      });
    });

    // joining the game lobby, initialized of game with user ids (inprogress)
    socket.on('start-game', function(gameId){
        socket.join(gameId);
        games[gameId].refreshBoard();
    });

    socket.on('special-attack', function(attackData) {
     //uses special attack happens mid turn  
    });

    socket.on('move', function(data) {
      console.log(data.gameId);
      games[data.gameId].move(data);
      //receives the move information
      //emits matches to room,
      //emits refreshed board (game state) to room 
    });

    socket.on('disconnect', function() {
      console.log('someone left the lobby');
      //for performance boost should store logged in users in memory
      getCurrentUser(socket, function(currentUser) {
        console.log('it was ', currentUser);
          if(currentUser) {
            currentUser.activeGames.forEach(function(game) {
              console.log(game, 'why I print soo much');
              if(games[game]){
                console.log(games[game].gameId, ' in process of being set inactive');
                games[game].active = false;
                games[game].save;
                delete games[game];
              }
            });
            currentUser.activeGames = [];
            currentUser.waiting = false;
            currentUser.save();
          }
      });
    });
  });	
}

module.exports = nsp;
