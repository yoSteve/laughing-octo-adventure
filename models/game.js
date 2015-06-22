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
  game.turn = game.randomPlayer();
  game.homeMana = 0;
  game.awayMana = 0;
  game.size = 8;
  game.board = new Array(game.size);
  for (var i = game.board.length-1; i >= 0 ; i--) {
    game.board[i] = new Array(game.size);
  }    
  game.boardSetup(); 
  return game;  
}

GameSchema.methods.randomPlayer = function() {
 
}

//GameSchema.methods.refreshBoard = function() {
//  //sends out new game board, hps, mana pools, and current player turn
//    this.io.to(this.gameId).emit('refresh-board', {homeMana: this.homeMana,
//      awayMana: this.awayMana,
//      gameId: this.gameId, 
//      home: this.awayUser.username, 
//      away: this.homeUser.username, 
//      gameBoard: this.board,
//      turn: this.turn
//    });
//}



GameSchema.methods.move = function(initPos, finPos) {
  initialPos = initPos;
  finalPos = finPos;
  getMoveFromUser();
  findAllMatches(gameBoard);
  refreshBoard(gameBoard);
  addMana();
  zeroMatches();
  console.log(mana);

  this.io.to(this.gameId).emit('switch-turn');
  return [gameBoard, mana];
}

GameSchema.methods.boardSetup = function(){
      mana = new Array(6);
      this.assignCrystalsToBoard();
      this.refreshBoard();
  }

GameSchema.methods.zeroMana = function(mana){
  	var i = 5;
  	while(i >= 0){
  		mana[i] = 0;
  		i--;
  	}
  }

GameSchema.methods.addMana =function() {
  	var i = 5;
  	while(i >= 0){
      if (matches[i])
    		mana[i] += matches[i];
  		i--;
    }
  }

GameSchema.methods.zeroMatches = function(){
  	var i = 5;
  	while(i >= 0){
  		matches[i] = 0;
  		i--;
  	}
  }
  ///////GAME BOARD LOGIC//////////////////
GameSchema.methods.getRandomCrystal = function() {
      return Math.round(Math.random() * 5);
  }

GameSchema.methods.assignCrystalsToBoard = function() {
      for (var col = 0; col < this.board.length; col++) {
          for (var row = 0; row < this.board[col].length; row++) {
              if (this.board[col][row] == null) {
                  this.board[col][row] = this.getRandomCrystal();
              }
          } 
      }
  }

GameSchema.methods.checkNullSpace = function() {
    for (var col = this.size -1; col >= 0; col--) {
        var nullCount = 0;
        for (var row = this.size -1 ; row >= 0; row--) {
            if (this.board[col][row] == null) {
                nullCount++;
            } else if (this.board[col][row] != null && nullCount > 0) { this.board[col][row + nullCount] = this.board[col][row];
            }
        } 
        for (var i = 0; i <= nullCount-1; i++) {
            this.board[col][i] = null;
        }
    } 
  }

GameSchema.methods.dropNewCrystals = function(board) {
      for (var col = 0; col < SIZE; col++) {
          if (board[col][0] == null) {
              board[col][0] = getRandomCrystal;
          };
      } console.log("inside dropNewCrystals");
      return board;
  }

GameSchema.methods.refreshBoard = function() {
       for (var col = 0; col < this.size; col++) {
          for (var row = 0; row < this.size; row++) {
              do {
                  //this.findAllMatches();
                  this.checkNullSpace();      
                  this.assignCrystalsToBoard();
              } while (this.board[col][row] == null);
          } 
      } 

    this.io.to(this.gameId).emit('refresh-board', {homeMana: this.homeMana,
      awayMana: this.awayMana,
      gameId: this.gameId, 
      home: this.awayUser.username, 
      away: this.homeUser.username, 
      gameBoard: this.board,
      turn: this.turn
    });
  }

module.exports = mongoose.model('Game', GameSchema, 'Game');
