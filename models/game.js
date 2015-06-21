var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var GameSchema = new Schema({
  gameId: String,
  io: Object,
  homeUser: Object,
  awayUser: Object,
  home: Object,
  away: Object,
  size: Number,
  board: Array,
  currentPlayer: String
});

GameSchema.statics.create = function (gameVars){
  console.log('new instance of a new game created', gameVars);
  // create clones of the team
  var game = new this(gameVars);
//  gameVars.homeUser.teams.push(1);
//  gameVars.awayUser.teams.push(1);
//  game.home = JSON.parse(JSON.stringify(gameVars.homeUser.teams));
//  game.away = JSON.parse(JSON.stringify(gameVars.awayUser.teams));
//  game.home.hp = game.home.maxHp();
//  game.away.hp = game.away.maxHp();
//  game.home.mana = 0;
//  game.away.mana = 0;
  game.size = 8;
  game.board = new Array(game.size);
  for (var i = game.board.length-1; i >= 0 ; i--) {
    game.board[i] = new Array(game.size);
  }    
  var i = 0;
  setInterval(function() {
    console.log('We are ina  game!!!!!! ', game.gameId);
    i++;
    game.io.to(game.gameId).emit('refresh-board', {home: i, away: game.homeUser.username, gameBoard: game.board});
  //  console.log(io['sockets']);
  
  }, 3000);
  return game;  
}

GameSchema.methods.refreshBoard = function() {
  this.io.to(this.gameId).emit('refresh-board', {home: this.homeUser.username,
    away: this.awayUser.username,
    gameBoard: this.board});
}

module.exports = mongoose.model('Game', GameSchema, 'Game');
