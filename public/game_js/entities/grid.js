game.Grid = me.Container.extend({
  init: function(cols, rows) {
    this.COLS = cols;
    this.ROWS = rows;
    this.board = [];
    this._super(me.Container, 'init', [me.game.viewport.width / 3.5, 100, this.COLS * game.Tile.width - game.Tile.width / 2, this.ROWS * game.Tile.width - game.Tile.width / 2]);
  },

  update: function(dt) {
    this._super(me.Container, 'update', [dt]);

    return true;
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

  shiftCol(column, down) {
    var col = this.getCol(column);

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

    this.board[column] = col;
  }
});
