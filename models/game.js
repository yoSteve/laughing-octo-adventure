var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var Game = new Schema({
  gameId: String,
  io: Object,
  playerOne: Object,
  playerTwo: Object,
  home: Object,
  away: Object,
  size: Number,
  board: Array,
  currentPlayer: String
})

Game.post('init', function (game){
  // create clones of the team
  game.home = JSON.parse(JSON.stringify(game.playerOne.team));
  game.away = JSON.parse(JSON.stringify(game.playerTwo.team));
  game.home.Hp = game.home.maxHp();
  game.away.hp = game.away.maxHp();
  game.home.mana = 0;
  game.away.mana = 0;
  game.size = 8;
  game.board = new Array(size);
  for (var i = game.board.length-1; i >= 0 ; i--) {
    game.board[i] = new Array(size);
  }    
  
});

mongoose.model('Game', Game);
module.exports = mongoose.model('Game');
