game.Character = me.Entity.extend({
  init: function(x, y, name, charClass, flipped) {
    var settings = {};
    settings.image = 'characters-lg';
    settings.width = 64;
    settings.height = 64;
    
    this._super(me.Entity, 'init', [x, y, settings]);

    this.renderable.flipX(flipped);

    this.name = name;
    this.health;
    this.healthUI;
    this.charClass;
    this.specials;
    this.manaScores;

    this.buildFromClass(charClass);
  },

  update: function(dt) {
    this._super(me.Entity, 'update', [dt]);

    this.body.update();

    return true;
  },

  setAnimations: function(num) {
    this.renderable.addAnimation('idle', [num * 6]);
    this.renderable.addAnimation('walk', [num * 6 + 2, num * 6], 250);
    this.renderable.addAnimation('attack', [num * 6 + 3]);
    this.renderable.addAnimation('wounded', [num * 6 + 4]);
    this.renderable.addAnimation('dead', [num * 6 + 5]);
    this.renderable.setCurrentAnimation('idle');
  },

  buildFromClass: function(charClass) {
    switch(charClass) {
      case game.charClasses.Fighter:
        this.health = game.charClasses.Fighter.health;
        this.manaScores = game.charClasses.Fighter.manaScores;
        this.specials = game.charClasses.Fighter.specials;
        this.setAnimations(0);
        break;
      case game.charClasses.Thief:
        this.health = game.charClasses.Thief.health;
        this.manaScores = game.charClasses.Thief.manaScores;
        this.specials = game.charClasses.Thief.specials;
        this.setAnimations(4);
        break;
      case game.charClasses.BlackBelt:
        this.health = game.charClasses.BlackBelt.health;
        this.manaScores = game.charClasses.BlackBelt.manaScores;
        this.specials = game.charClasses.BlackBelt.specials;
        this.setAnimations(5);
        break;
      case game.charClasses.BlackMage:
        this.health = game.charClasses.BlackMage.health;
        this.manaScores = game.charClasses.BlackMage.manaScores;
        this.specials = game.charClasses.BlackMage.specials;
        this.setAnimations(1);
        break;
      case game.charClasses.WhiteMage:
        this.health = game.charClasses.WhiteMage.health;
        this.manaScores = game.charClasses.WhiteMage.manaScores;
        this.specials = game.charClasses.WhiteMage.specials;
        this.setAnimations(3);
        break;
      case game.charClasses.RedMage:
        this.health = game.charClasses.RedMage.health;
        this.manaScores = game.charClasses.RedMage.manaScores;
        this.specials = game.charClasses.RedMage.specials;
        this.setAnimations(2);
        break;
    }
  }
});
