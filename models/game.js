var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');
var deepClone = require('../app_modules/deepClone');

var GameSchema = new Schema({
  gameId: String,
  io: Object,
  homeUser: Object,
  awayUser: Object,
  home: Object,
  away: Object,
  size: Number,
  board: Array,
  currentPlayer: Number,
  active: Boolean,
  lastMove: Object
});

GameSchema.statics.create = function (gameVars){
  console.log('new instance of a new game created', gameVars.gameId);
  // create clones of the team
  var game = new this(gameVars);
//  game.home = JSON.parse(JSON.stringify(gameVars.homeUser.teams));
//  game.away = JSON.parse(JSON.stringify(gameVars.awayUser.teams));
//  game.home.hp = game.home.maxHp();
//  game.away.hp = game.away.maxHp(); 
//
  game.active = true;
  game.matches = [];
  game.currentPlayer = 1;
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
  if (this.currentPlayer == 1) {
    this.currentPlayer = 2;
  } else {
    this.currentPlayer = 1;
  }
  if(data['pattern'] === 'row')
    this.shiftRow(data['row'], data['movedRight']);
  else
    this.shiftCol(data['col'], data['movedDown']);
  console.log('moving');
  this.lastMove = data;
  this.refreshBoard();
  //respond with emit matches and board state
  return [this.gameBoard, this.mana];
}

var countMana = function(allMatches) {
  var mana = [0,0,0,0,0,0];
  allMatches.forEach(function(matches){
    matches.forEach(function(match){
      mana[match.type] = match.count; 
    });
  });  
  return mana;
}

GameSchema.statics.createGameId = function(id1, id2) {
  console.log(id1);
  console.log(id2);
  if(id1 > id2)
    return id1 + id2;
  return id2 + id1;
}

GameSchema.methods.boardSetup = function(){
  mana = new Array(6);
  this.assignCrystalsToBoard();
  this.refreshBoard();
}

GameSchema.methods.zeroMana = function(mana){
  var i = 5;
  while(i >= 0) {
    this.mana[i] = 0;
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

GameSchema.methods.refreshBoard = function() {
  var allMatches = [];
  var cascadeBoards = [];
  do { 
    var cascade = this.resolveMatches();
    if(cascade && cascade[0] && cascade[0].length > 0) {
        allMatches.push(cascade[0]);
        cascadeBoards.push(cascade[1]);
    }
  } while(cascade[0].length > 0);
  this.io.to(this.gameId).emit('refresh-board', {
    homeMana: this.homeMana,
    awayMana: this.awayMana,
    gameId: this.gameId, 
    home: this.awayUser.username, 
    away: this.homeUser.username, 
    matches: allMatches,
    turnMana: countMana(allMatches),
    cascadeBoards: cascadeBoards,
    gameBoard: this.board,
    turn: this.currentPlayer,
    lastMove: this.lastMove
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
  var matches;
  console.log('BOARD BEFORE RESOLVE', this.board)
  matches = this.getRowMatches().concat(this.getColMatches()); 

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
  console.log('current matches', matches);
  console.log('BOARD AFTER RESOLVE', this.board);
  this.checkNullSpace();      
  console.log('BOARD AFTER MOVING NULL SPACE', this.board);
  this.assignCrystalsToBoard();
  console.log('BOARD AFTER ASSIGN CRYSTALS', this.board);
  var boardCascade = deepClone(this.board); 
  //add matches to current matches this turn
  return [matches, boardCascade];
}


GameSchema.methods.getCol = function(col) {
  return this.board[col]; 
}

GameSchema.methods.getRow = function(row) {
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
