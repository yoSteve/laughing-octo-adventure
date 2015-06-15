game.Character = me.Sprite.extend({
  init: function(x, y) {
    var settings = {};
    settings.image = 'characters';
    settings.spritewidth = 32;
    settings.spriteheight = 32;
    
    this._super(me.Sprite, 'init', [x, y, settings]);
  },

  update: function(dt) {
    this._super(me.Sprite, 'update', [dt]);

    return true;
  },

  chooseCharacter: function() {
    var frame = ~~(Math.random() * 6);
    this.renderable.addAnimation('idle', [frame], 1);
    this.renderable.setCurrentAnimation('idle');
  }
});
