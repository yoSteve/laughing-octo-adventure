var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var Game = new Schema({
  gameId: String,
  io: Object,
  home: Object,
  away: Object,
  size: Number,
  board: Array,
  currentPlayer: String
})

Game.post('init', function (game){
  game.size = 8;
  game.board = new Array(size);
  for (var i = game.board.length-1; i >= 0 ; i--) {
    game.board[i] = new Array(size);
  }    
  
});

mongoose.model('Game', Game);
module.exports = mongoose.model('Game');
