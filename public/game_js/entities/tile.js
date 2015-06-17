game.Tile = me.DraggableEntity.extend({
  init: function(x, y, col, row, grid) {
    var settings = {};
    settings.image = 'crystals-lg';
    settings.width = game.Tile.width;
    settings.height = game.Tile.height;

    this.mousePos = me.input.mouse.pos;

    this.oldX, this.oldY;
    this.col = col;
    this.row = row;
    this.grid = grid;
    this.selected = [];
    this.moved = false;
    this.type;

    this._super(me.DraggableEntity, 'init', [x, y, settings]);
    this.chooseCrystal();
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
    }

    this.body.update();
    me.collision.check(this);

    return true;
  },

  chooseCrystal: function() {
    var frame = ~~(Math.random() * 6);
    this.type = frame;
    this.renderable.addAnimation('idle', [frame], 1);
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
