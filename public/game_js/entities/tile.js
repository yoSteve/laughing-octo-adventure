game.Tile = me.DraggableEntity.extend({
  init: function(x, y, type, col, row) {
    var settings = {};
    settings.image = 'crystals-lg';
    settings.width = game.Tile.width;
    settings.height = game.Tile.height;

    this._super(me.DraggableEntity, 'init', [x, y, settings]);

    this.type;
    this.setCrystal(type);

    this.oldPos; 
    this.newPos;
    this.mousePos = me.input.mouse.pos;
    this.grabbed = false;
    this.moved = false;

    this.col = col;
    this.row = row;
  },

  update: function(dt) {
    this._super(me.DraggableEntity, 'update', [dt]);

    if(game.playScreen.player1Turn) {
      if(this.grabbed && !this.moved) {
        //if moved left
        if(this.oldPos.x - this.mousePos.x > 10) {
          this.moveHorizontal(false);
          game.playScreen.player1Turn = false;
        //if moved right
        } else if(this.mousePos.x - this.oldPos.x > 10) {
          this.moveHorizontal(true);
          game.playScreen.player1Turn = false;
        }

        //if moved up 
        if(this.oldPos.y - this.mousePos.y > 10) {
          this.moveVertical(false);
          game.playScreen.player1Turn = false;
        //if moved down
        } else if(this.mousePos.y - this.oldPos.y > 10) {
          this.moveVertical(true);
          game.playScreen.player1Turn = false;
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
    this.renderable.setCurrentAnimation('idle');
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
