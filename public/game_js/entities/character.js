game.Character = me.Entity.extend({
  init: function(x, y, flipped) {
    var settings = {};
    settings.image = 'characters-lg';
    settings.width = 64;
    settings.height = 64;
    
    this._super(me.Entity, 'init', [x, y, settings]);

    this.chooseCharacter();
    this.renderable.flipX(flipped);

    this.name;
    this.health = 100;
    this.healthUI ;
    this.charClass;
    this.specials = [];
    this.manaScores = [];
    this.initScores();
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
  },

  initScores: function() {
    this.manaScores['red'] = 0;
    this.manaScores['blue'] = 0;
    this.manaScores['yellow'] = 0;
    this.manaScores['green'] = 0;
    this.manaScores['white'] = 0;
    this.manaScores['black'] = 0;
  }
});
