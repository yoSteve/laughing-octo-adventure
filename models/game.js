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
//  game.home = JSON.parse(JSON.stringify(gameVars.homeUser.teams));
//  game.away = JSON.parse(JSON.stringify(gameVars.awayUser.teams));
//  game.home.hp = game.home.maxHp();
//  game.away.hp = game.away.maxHp();
  game.homeMana = 0;
  game.awayMana = 0;
  game.size = 8;
  game.board = new Array(game.size);
  for (var i = game.board.length-1; i >= 0 ; i--) {
    game.board[i] = new Array(game.size);
  }    
  return game;  
}

GameSchema.methods.Board = function() {
  
}

GameSchema.methods.refreshBoard = function() {
  //sends out new game board, hps, mana pools, and current player turn
    this.io.to(game.gameId).emit('refresh-board', {homeMana: this.homeMana,
      awayMana: this.awayMana,
      gameId: this.gameId, 
      home: this.awayUser.username, 
      away: this.homeUser.username, 
      gameBoard: this.board,
      turn: this.turn
    });
}

module.exports = mongoose.model('Game', GameSchema, 'Game');
