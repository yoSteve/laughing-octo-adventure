game.Tile = me.DraggableEntity.extend({
  init: function(x, y, col, row, type, grid) {
    var settings = {};
    settings.image = 'crystals-lg';
    settings.width = game.Tile.width;
    settings.height = game.Tile.height;

    this._super(me.DraggableEntity, 'init', [x, y, settings]);

    this.mousePos = me.input.mouse.pos;
    this.oldX, this.oldY;
    this.col = col;
    this.row = row;
    this.grid = grid;
    this.moved = false;
    this.type = type;

    this.setCrystal(this.type);
  },

  update: function(dt) {
    this._super(me.DraggableEntity, 'update', [dt]);

    //if grabbed
    if(this.grabbed && !this.moved) {
      if(this.oldX - this.pos.x > game.Tile.width / 2) {
        this.grid.shiftLeft(this.row);
        this.moved = true;
      } else if(this.pos.x - this.oldX > game.Tile.width / 2) { 
        this.grid.shiftRight(this.row);
        this.moved = true;
      } else if(this.oldY - this.pos.y > game.Tile.height / 2) {
        this.grid.shiftUp(this.col);
        this.moved = true;
      } else if(this.pos.y - this.oldY > game.Tile.height / 2) {
        this.grid.shiftDown(this.col);
        this.moved = true;
      }
      
      // if moved a lot on the x value, lock y
      if(Math.abs(this.oldX - this.pos.x) > 5) {
        this.lockY();
      // else if moved on y, lock x
      } else if(Math.abs(this.oldY - this.pos.y) > 5) {
        this.lockX();
      } 
      return true;
    }

    this.body.update();
    me.collision.check(this);

    return true;
  },

  setCrystal: function(type) {
    this.type = type;
    this.renderable.addAnimation('idle', [type], 1);
    this.renderable.setCurrentAnimation('idle');
  },

  dragStart: function(event) {
    this._super(me.DraggableEntity, 'dragStart', [event]);
    this.oldX = this.pos.x;
    this.oldY = this.pos.y;
    this.grabbed = true;
    this.moved = false;
  },

  dragEnd: function(event) {
    this._super(me.DraggableEntity, 'dragEnd', [event]);
    this.pos.x = this.col * game.Tile.width;
    this.pos.y = this.row * game.Tile.height;
    this.grabbed = false;
  },

  lockX: function() {
    this.pos.x = this.oldX;
  },

  lockY: function() {
    this.pos.y = this.oldY;
  }

});

game.Tile.width = 64;
game.Tile.height = 64;
