game.Grid = me.Container.extend({
  init: function() {
    this.COLS = 8;
    this.ROWS = 8; 
    this.board = []; 
    this._super(me.Container, 'init', [me.game.viewport.width / 4, game.Tile.width, this.COLS * game.Tile.width - game.Tile.width / 2, this.ROWS * game.Tile.width - game.Tile.width / 2]);
  },

  createTiles: function() {
    for(var i = 0; i < this.COLS; i++) {
      this.board.push([]);
      for(var j = 0; j < this.ROWS; j++) {
        var tile = me.pool.pull('tile', i * game.Tile.width, j * game.Tile.height, i, j, this);
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
  },

  update: function(dt) {
    this._super(me.Container, 'update', [dt]);
    
    return true;
  }
});
