game.Grid = me.Container.extend({
  init: function(cols, rows) {
    this.COLS = cols;
    this.ROWS = rows;
    this.board = [];
    this.needsShifting = false;

    this.cellsVanishing = 0;
    this.cellsAppearing = 0;
    this.charactersAttacking = 0;

    this.dataReady = false;

    this.lastBoard = null;
    this.lastMove;

    this.attacked = false;

    this.turnMana = {
      red: 0,
      blue: 0,
      yellow: 0,
      green: 0,
      white: 0,
      black: 0
    }

    this.currentMatch = 0;
    this.cascadeMatches = [];

    this.currentBoard = 0;
    this.cascadeBoards = [];

    this.grabbedCrystal;

    this._super(me.Container, 'init', [me.game.viewport.width / 3.5, 100, this.COLS * game.Tile.width - game.Tile.width / 2, this.ROWS * game.Tile.width - game.Tile.width / 2]);
  },

  update: function(dt) {
    this._super(me.Container, 'update', [dt]);

    if(!this.dataReady) {
      return true;
    }

    if(this.lastMove != null && game.playScreen.currentPlayer == game.data.player) {
      this.handleMove();    
    } 

    this.lastMove = null;
    
    //if animating appearance or vanishes
    if(this.cellsVanishing > 0 || this.cellsAppearing > 0) {
      return true;
    }

    if(this.charactersAttacking > 0) {
      console.log('characters attacking: ', this.charactersAttacking);
      return true;
    }

    //after animations, shift
    if(this.needsShifting) {
      this.shiftEmpties();

      return true;
    }
    
    if(this.cascadeMatches.length > 0) {
      if(this.currentMatch == this.currentBoard && this.currentMatch < this.cascadeMatches.length) {
        this.handleCascadeMatch(this.currentMatch);
        this.currentMatch++;
      } else if(this.currentMatch != this.currentBoard && this.currentBoard < this.cascadeBoards.length) {
        this.handleCascadeBoard(this.currentBoard);
        this.currentBoard++;
      }

      //if it's done the last change
      if(this.currentMatch == this.cascadeMatches.length && this.currentBoard == this.cascadeBoards.length && !this.attacked) {
        var team;
        if(game.playScreen.currentPlayer == 2) {
          team = game.playScreen.team1; 
        } else {
          team = game.playScreen.team2;
        }

        console.log('extra thing');
        console.log(this.grabbedCrystal);
        team.getBestAttacker(this.grabbedCrystal).setActive();
        team.attack(this.turnMana); 

        this.attacked = true;
      }
    } else {
      if(this.lastBoard != null) {
        this.replaceBoard(this.lastBoard);
        this.lastBoard = null;
      }
    }

    return true;
  },

  resetTurnMana: function() {
    this.turnMana.red = 0;
    this.turnMana.blue = 0;
    this.turnMana.yellow = 0;
    this.turnMana.green = 0;
    this.turnMana.white = 0;
    this.turnMana.black = 0;
  },

  handleMove: function() {
    var move = this.lastMove;

    if(move.pattern == 'row') {
      this.shiftRow(move.row, move.movedRight);
    } else {
      this.shiftCol(move.col, move.movedDown);
    }
  },

  handleCascadeMatch: function(index) {
    var matchSet = this.cascadeMatches[index];
    var turnMana = this.turnMana;

    //handle one set
    matchSet.forEach(function(matchObject) {
      game.playScreen.grid.clearTiles(matchObject);

      var team;
      if(game.playScreen.currentPlayer == 2) {
        team = game.playScreen.team1;
      } else {
        team = game.playScreen.team2;
      }

      var type = matchObject.type;
      switch(type) {
        case 0: 
          turnMana.red += matchObject.count;
          team.manaScores.red += matchObject.count;    
          break;
        case 1:
          turnMana.blue += matchObject.count;
          team.manaScores.blue += matchObject.count;    
          break;
        case 2:
          turnMana.yellow += matchObject.count;
          team.manaScores.yellow += matchObject.count;    
          break;
        case 3:
          turnMana.green += matchObject.count;
          team.manaScores.green += matchObject.count;    
          break;
        case 4:
          turnMana.white += matchObject.count;
          team.manaScores.white += matchObject.count;    
          break;
        case 5:
          turnMana.black += matchObject.count;
          team.manaScores.black += matchObject.count;    
          break;
      }
    });
  },

  handleCascadeBoard: function(index) {
    var diffBoard = game.playScreen.grid.cascadeBoards[index];  

    game.playScreen.grid.tileFall(diffBoard);
  },

  populate: function(tiles) {
    for(var col = 0; col < this.COLS; col++) {
      this.board.push([]);
      for(var row = 0; row < this.ROWS; row++) {
        var tile = me.pool.pull('tile', col * game.Tile.width, row * game.Tile.height, tiles[col][row], col, row);
        this.board[col].push(tile);
        this.addChild(tile);
      }
    }
  },

  replaceBoard: function(board) {
    for(var col = 0; col < this.COLS; col++) {
      for(var row = 0; row < this.ROWS; row++) {
        this.board[col][row].alive = true;
        this.board[col][row].setCrystal(board[col][row]);
      }
    }
  },

  getCol: function(col) {
    return this.board[col]; 
  },

  getRow: function(row) {
    var tempArray = [];
    for(var col = 0; col < this.COLS; col++) {
      tempArray.push(this.board[col][row]);
    }
    return tempArray;
  },

  shiftRow(rowIndex, right) {
    var row = this.getRow(rowIndex);

    if(right) {
      //shift right
      row.unshift(row.pop());
      row.forEach(function(cell) {
        if(cell.col == row.length - 1) {
          cell.col = 0;
        } else {
          cell.col++;
        }
        cell.pos.x = cell.col * game.Tile.width;
      });
    } else {
      //shift left
      row.push(row.shift());
      row.forEach(function(cell) {
        if(cell.col == 0) {
          cell.col = row.length - 1;
        } else {
          cell.col--;
        }
        cell.pos.x = cell.col * game.Tile.width;
      });
    }

    for(var i = 0; i < this.COLS; i++) {
      this.board[i][rowIndex] = row[i];
    }
  },

  shiftCol(colIndex, down) {
    var col = this.getCol(colIndex);

    if(down) {
      //shift down
      col.unshift(col.pop());
      col.forEach(function(cell) {
        if(cell.row == col.length - 1) {
          cell.row = 0;
        } else {
          cell.row++;
        }
        cell.pos.y = cell.row * game.Tile.height;
      });
    } else {
      //shift up 
      col.push(col.shift());
      col.forEach(function(cell) {
        if(cell.row == 0) {
          cell.row = col.length - 1;
        } else {
          cell.row--; 
        }
        cell.pos.y = cell.row * game.Tile.height;
      });
    }

    this.board[colIndex] = col;
  },

  clearTiles: function(object) {
    // { pattern: row/column, end: { col: col, row: row }, count: > 3 }
    if(object.pattern == 'row') {
      var row = this.getRow(object.end.row);
      for(var i = object.end.col; i > object.end.col - object.count; i--) {
        if(row[i].alive) {
          row[i].vanishCrystal();
        }
      }
    } else {
      var col = this.getCol(object.end.col);
      for(var i = object.end.row; i > object.end.row - object.count; i--) {
        if(col[i].alive) {
          col[i].vanishCrystal();
        }
      }
    }
  },

  tileFall: function(diffBoard) {
    //get differences in boards
    for(var col = 0; col < this.COLS; col++) {
      for(var row = 0; row < this.ROWS; row++) {
        var cell = this.board[col][row];
        if(cell.type == 6) {
          cell.appearCrystal(diffBoard[col][row]);
        }
      }
    }

  },

  shiftEmpties: function() {
    var col;
    var swapped = false;
    var temp;
    for(var i = 0; i < this.COLS; i++) {
      col = this.getCol(i);
      for(var j = 1; j < this.ROWS; j++) {
        if(!col[j].alive && col[j-1].alive) {
          temp = col[j-1].type;
          col[j-1].setCrystal(col[j].type); 
          col[j-1].alive = false;
          col[j].setCrystal(temp);
          col[j].alive = true;
          swapped = true; 
        }
      }
    }
    this.needsShifting = swapped;
  }
});
