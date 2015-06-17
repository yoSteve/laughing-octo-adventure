game.Character = me.Entity.extend({
  init: function(x, y, flipped) {
    var settings = {};
    settings.image = 'characters-lg';
    settings.width = 64;
    settings.height = 64;
    
    this._super(me.Entity, 'init', [x, y, settings]);
    this.chooseCharacter();
    this.renderable.flipX(flipped);
  },

  update: function(dt) {
    this._super(me.Entity, 'update', [dt]);

    return true;
  },

  chooseCharacter: function() {
    var row = ~~(Math.random() * 6);
    this.renderable.addAnimation('idle', [row * 6], 200);
    this.renderable.addAnimation('walk', [row * 6, row * 6 + 2], 200);
    this.renderable.addAnimation('attack', [row * 6 + 1, row * 6 + 2, row * 6 + 3, row * 6 + 4], 200);
    this.renderable.addAnimation('wounded', [row * 6 + 4]);
    this.renderable.addAnimation('dead', [row * 6 + 5]);
    this.renderable.setCurrentAnimation('idle');
  }
});
