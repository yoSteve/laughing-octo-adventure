game.Grid = me.Container.extend({
  init: function(cols, rows) {
    this.COLS = cols;
    this.ROWS = rows; 
    this.board = []; 
    this._super(me.Container, 'init', [me.game.viewport.width / 3.5, 100, this.COLS * game.Tile.width - game.Tile.width / 2, this.ROWS * game.Tile.width - game.Tile.width / 2]);
  },

  assignTiles: function(tileColors) {
    for(var i = 0; i < this.COLS; i++) {
      this.board.push([]);
      for(var j = 0; j < this.ROWS; j++) {
        var tile = me.pool.pull('tile', i * game.Tile.width, j * game.Tile.height, i, j, tileColors[i][j], this);
        this.board[i].push(tile);
        this.addChild(tile);
      }
    }
  },

  shiftLeft: function(row) {
    var tempArray = [];
    for(var i = 0; i < this.COLS; i++) {
       tempArray.push(this.board[i][row]); 
    }

    tempArray.push(tempArray.shift());

    for(var i = 0; i < this.COLS; i++) {
      tempArray[i].pos.x = i * game.Tile.width;

      if(tempArray[i].col == 0) {
        tempArray[i].col = this.COLS - 1;
      } else {
        tempArray[i].col--; 
      }
      
      this.board[i][row] = tempArray[i];
    }

    this.resolveMatches(this.getRowMatches(), this.getColMatches());
  },

  shiftRight: function(row) {
    var tempArray = [];
    for(var i = 0; i < this.COLS; i++) {
       tempArray.push(this.board[i][row]); 
    }

    tempArray.unshift(tempArray.pop());

    for(var i = 0; i < this.COLS; i++) {
      tempArray[i].pos.x = i * game.Tile.width;

      if(tempArray[i].col == this.COLS - 1) {
        tempArray[i].col = 0;
      } else {
        tempArray[i].col++; 
      }
      
      this.board[i][row] = tempArray[i];
    }

    this.resolveMatches(this.getRowMatches(), this.getColMatches());
  },

  shiftUp: function(col) {
    this.board[col].push(this.board[col].shift());

    for(var i = 0; i < this.ROWS; i++) {

      if(this.board[col][i].row == 0) {
        this.board[col][i].row = this.ROWS - 1;
      } else {
        this.board[col][i].row--;
      }

      this.board[col][i].pos.y = i * game.Tile.height;
    }

    this.resolveMatches(this.getRowMatches(), this.getColMatches());
  },

  shiftDown: function(col) {
    this.board[col].unshift(this.board[col].pop());

    for(var i = 0; i < this.ROWS; i++) {

      if(this.board[col][i].row == this.ROWS - 1) {
        this.board[col][i].row = 0;
      } else {
        this.board[col][i].row++;
      }

      this.board[col][i].pos.y = i * game.Tile.height;
    }

    this.resolveMatches(this.getRowMatches(), this.getColMatches());
  },

  getRowMatches: function() {
    var resultArray = [];
    var prevType;
    var currCell;
    var count;

    for(var row = 0; row < this.ROWS; row++) {
      count = 1;
      prevType = this.board[0][row].type;
      for(var col = 1; col < this.COLS; col++) {
        currCell = this.board[col][row];
        if(currCell.type == prevType) {
          count++;
          if(col == this.COLS -1 ) {
            if(count >= 3) {
              resultArray.push({ pattern: 'row', count: count, type: prevType, end: { col: col, row: row }});
            }
          }
        } else { 
            if(count >= 3) {
              resultArray.push({ pattern: 'row', count: count, type: prevType, end: { col: col - 1, row: row }});
            }
          prevType = currCell.type;
          count = 1;
        }
      }
    }

    return resultArray;
  },

  getColMatches: function() {
    var resultArray = [];
    var prevType;
    var currCell;
    var count;

    for(var col = 0; col < this.COLS; col++) {
      count = 1;
      prevType = this.board[col][0].type;
      for(var row = 1; row < this.ROWS; row++) {
        currCell = this.board[col][row]; 
        if(currCell.type == prevType) {
          count++;
          if(row == this.ROWS - 1) {
            if(count >= 3) {
              resultArray.push({ pattern: 'column', count: count, type: prevType, end: { col: col, row: row }});
            }
          }
        } else {
            if(count >= 3) {
              resultArray.push({ pattern: 'column', count: count, type: prevType, end: { col: col, row: row - 1 }});
            }
          prevType = currCell.type;
          count = 1;
        }
      }
    }

    return resultArray;
  },

  resolveMatches: function(rowMatches, colMatches) {
    var matches = rowMatches.concat(colMatches); 

    var match, endCol, endRow, count;
    for(var i = 0; i < matches.length; i++) {
      endCol = matches[i].end.col;
      endRow = matches[i].end.row;
      count = matches[i].count;

      if(matches[i].pattern == 'row') {
        for(var j = endCol; j > endCol - count; j--) {
          this.board[j][endRow].setCrystal(6);
        }
      } else {
        for(var j = endRow; j > endRow - count; j--) {
          this.board[endCol][j].setCrystal(6);
        }
      }
    }

    this.fillEmpties();
  },

  update: function(dt) {
    this._super(me.Container, 'update', [dt]);
    
    return true;
  }
});
