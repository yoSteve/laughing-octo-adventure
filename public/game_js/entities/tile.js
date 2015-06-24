game.Tile = me.DraggableEntity.extend({
  init: function(x, y, type, col, row) {
    var settings = {};
    settings.image = 'crystals-animate';
    settings.width = game.Tile.width;
    settings.height = game.Tile.height;

    this._super(me.DraggableEntity, 'init', [x, y, settings]);

    this.type;
    this.setCrystal(type);

    this.oldPos; 
    this.mousePos = me.input.mouse.pos;
    this.grabbed = false;
    this.moved = false;
    this.matched = false;

    this.col = col;
    this.row = row;
  },

  update: function(dt) {
    this._super(me.DraggableEntity, 'update', [dt]);

    if(game.playScreen.currentPlayer == game.data.player) {
      if(this.grabbed && !this.moved) {
        //if moved left
        if(this.oldPos.x - this.mousePos.x > 10) {
          this.moveHorizontal(false);
          return true;
        //if moved right
        } else if(this.mousePos.x - this.oldPos.x > 10) {
          this.moveHorizontal(true);
          return true;
        }

        //if moved up 
        if(this.oldPos.y - this.mousePos.y > 10) {
          this.moveVertical(false);
          return true;
        //if moved down
        } else if(this.mousePos.y - this.oldPos.y > 10) {
          this.moveVertical(true);
          return true;
        }
      }
    }

    this.body.update();
    return true;
  },

  dragStart: function(event) {
    this._super(me.DraggableEntity, 'dragStart', [event]);
    this.oldPos = this.mousePos.clone();
    this.grabbed = true;
    console.log('col: ' + this.col + ', row: ' + this.row + ', alive: ' + this.alive + ', type: ' + this.type);
  },

  dragEnd: function(event) {
    this._super(me.DraggableEntity, 'dragEnd', [event]);
    this.pos.x = this.col * game.Tile.width;
    this.pos.y = this.row * game.Tile.height;
    this.grabbed = false;
    this.moved = false;
  },

  setCrystal: function(type) {
    this.type = type;
    this.renderable.addAnimation('idle', [type]); 
    this.renderable.addAnimation('vanish', [type, type + 7, type + 14, type + 21, type + 28, type + 35], 75); 
    this.renderable.addAnimation('appear', [type + 35, type + 28, type + 21, type + 14, type + 7, type], 75); 
    this.renderable.setCurrentAnimation('idle');
  },

  vanishCrystal: function() {
    var tile = this;
    game.playScreen.grid.cellsVanishing++;
    this.renderable.setCurrentAnimation('vanish', function() {
      tile.setCrystal(6);
      tile.alive = false;
      game.playScreen.grid.needsShifting = true;
      game.playScreen.grid.cellsVanishing--;
      return false;
    });
  },

  appearCrystal: function(type) {
    var tile = this;
    tile.setCrystal(type);
    game.playScreen.grid.cellsAppearing++;
    this.renderable.setCurrentAnimation('appear', function() {
      tile.renderable.setCurrentAnimation('idle');
      game.playScreen.grid.needsShifting = true;
      game.playScreen.grid.cellsAppearing--;
      tile.alive = true;
      return false;
    });
  },

  moveHorizontal: function(right) {
    this.pos.y = this.row * game.Tile.height;
    game.playScreen.grid.shiftRow(this.row, right);
    this.moved = true;
  },

  moveVertical: function(down) {
    this.pos.x = this.col * game.Tile.width;
    game.playScreen.grid.shiftCol(this.col, down);
    this.moved = true;
  }
});

game.Tile.width = 64;
game.Tile.height = 64;
