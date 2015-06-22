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
  game.matches = [];
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
  return this.homeUser; 
}

GameSchema.methods.move = function(data) {
  if (this.currentplayer == 1)
    this.currentPlayer = 2;
  else
    this.currentPlayer = 1;
  console.log(data);
  //if row shiftRow(index, right?)
  //if col shiftCol(index, down)?
  console.log('moving');
  this.resolveMatches();
  this.addMana();
  this.zeroMatches();
  console.log(this.mana);
  this.refreshBoard();

  //this.io.to(this.gameId).emit('switch-turn', { derp: 'derp' } );

  //respond with emit matches and board state
  return [this.gameBoard, this.mana];
}

GameSchema.methods.boardSetup = function(){
      mana = new Array(6);
      this.assignCrystalsToBoard();
      this.refreshBoard();
  }

GameSchema.methods.zeroMana = function(mana){
  	var i = 5;
  	while(i >= 0){
  		this.mana[i] = 0;
  		i--;
  	}
  }

GameSchema.methods.addMana =function() {
  	var i = 5;
  	while(i >= 0){
      if (this.matches[i])
        this.mana[i] += this.matches[i];
  		i--;
    }
  }

GameSchema.methods.zeroMatches = function(){
  	var i = 5;
  	while(i >= 0){
  		this.matches[i] = 0;
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

GameSchema.methods.dropNewCrystals = function() {
      for (var col = 0; col < this.size; col++) {
          if (this.board[col][0] == null) {
              this.board[col][0] = this.getRandomCrystal;
          };
      } console.log("inside dropNewCrystals");
      return board;
  }

GameSchema.methods.refreshBoard = function() {

    while (this.resolveMatches().length > 0){}
    this.io.to(this.gameId).emit('refresh-board', {homeMana: this.homeMana,
      awayMana: this.awayMana,
      gameId: this.gameId, 
      home: this.awayUser.username, 
      away: this.homeUser.username, 
      gameBoard: this.board,
      turn: this.currentPlayer
    });
  }

GameSchema.methods.getRowMatches = function() {
  var resultArray = [];
  var prevType;
  var currCell;
  var count;

  for(var row = 0; row < this.size; row++) {
    count = 1;
    prevType = this.board[0][row];
    for(var col = 1; col < this.size; col++) {
      currCell = this.board[col][row];
      if(currCell == prevType) {
        count++;
        if(col == this.size -1 ) {
          if(count >= 3) {
            resultArray.push({ pattern: 'row', count: count, type: prevType, end: { col: col, row: row }});
          }
        }
      } else { 
        if(count >= 3) {
          resultArray.push({ pattern: 'row', count: count, type: prevType, end: { col: col - 1, row: row }});
        }
        prevType = currCell;
        count = 1;
      }
    }
  }

  return resultArray;
} 

GameSchema.methods.getColMatches = function() {
  var resultArray = [];
  var prevType;
  var currCell;
  var count;

  for(var col = 0; col < this.size; col++) {
    count = 1;
    prevType = this.board[col][0];
    for(var row = 1; row < this.size; row++) {
       currCell = this.board[col][row]; 
       if(currCell == prevType) {
         count++;
         if(row == this.size - 1) {
           if(count >= 3) {
             resultArray.push({ pattern: 'column', count: count, type: prevType, end: { col: col, row: row }});
           }
         }
       } else {
         if(count >= 3) {
           resultArray.push({ pattern: 'column', count: count, type: prevType, end: { col: col, row: row - 1 }});
         }
         prevType = currCell;
         count = 1;
       }
    }
  }
  return resultArray;
}

GameSchema.methods.resolveMatches = function() {
  var matches = [];
  matches = this.getRowMatches().concat(this.getColMatches()); 
  console.log(matches);
  var match, endCol, endRow, count;
  for(var i = 0; i < matches.length; i++) {
    endCol = matches[i].end.col;
    endRow = matches[i].end.row;
    count = matches[i].count;

    if(matches[i].pattern == 'row') {
      for(var j = endCol; j > endCol - count; j--) {
        this.board[j][endRow] = null;
      }
    } else {
      for(var j = endRow; j > endRow - count; j--) {
        this.board[endCol][j] = null;
      }
    }
  }

  this.checkNullSpace();      
  this.assignCrystalsToBoard();
  //add matches to current matches this turn
  if (matches) {
    this.matches.concat(matches);
  }
  return matches;
}


GameSchema.statics.getCol = function(col) {
  return this.board[col]; 
}

GameSchema.statics.getRow = function(row) {
  var tempArray = [];
  for(var col = 0; col < this.size; col++) {
    tempArray.push(this.board[col][row]);
  }
  return tempArray;
}

GameSchema.methods.shiftRow = function(rowIndex, right) {
  var row = this.getRow(rowIndex);

  if(right) {
    //shift right
    row.unshift(row.pop());
  } else {
    //shift left
    row.push(row.shift());
  }

  for(var i = 0; i < this.size; i++) {
    this.board[i][rowIndex] = row[i];
  }
}

GameSchema.methods.shiftCol = function(colIndex, down) {
  var col = this.getCol(colIndex);

  if(down) {
    //shift down
    col.unshift(col.pop());
  } else {
    //shift up 
    col.push(col.shift());
  }

  this.board[colIndex] = col;
}

module.exports = mongoose.model('Game', GameSchema, 'Game');
