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


    var texture = me.loader.getImage('particle-black');
    this.emitter = new me.ParticleEmitter(this._absPos.x + game.Tile.width*6+14, this._absPos.y + game.Tile.height*2, {
      image: texture,
      minLife: 1000,
      maxLife: 2000,
      height: 16,
      width: 16,
      totalParticles: 32,
      angle: 2.324,
      angleVariation: 1.55,
      speed: 0,
      speedVariation: 4,
      maxRotation: 3.14159265358979,
      framesToSkip: 3
    }); 
    this.emitter.z = 23;
    me.game.world.addChild(this.emitter);
    me.game.world.addChild(this.emitter.container);

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
    game.playScreen.grid.grabbedCrystal = this.type;
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
    tile.alive = false;
    game.playScreen.grid.cellsVanishing++;
    tile.emitter.burstParticles();
    this.renderable.setCurrentAnimation('vanish', function() {
      tile.setCrystal(6);
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
    game.sendMessage('move', { pattern: 'row', row: this.row, movedRight: right, firstCrystal: game.playScreen.grid.grabbedCrystal });
    this.moved = true;
  },

  moveVertical: function(down) {
    this.pos.x = this.col * game.Tile.width;
    game.playScreen.grid.shiftCol(this.col, down);
    game.sendMessage('move', { pattern: 'column', col: this.col, movedDown: down, firstCrystal: game.playScreen.grid.grabbedCrystal });
    this.moved = true;
  }
});

game.Tile.width = 64;
game.Tile.height = 64;

