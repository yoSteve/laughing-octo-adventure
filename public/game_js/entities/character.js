game.Character = me.Entity.extend({
  init: function(x, y, name, charClass, flipped) {
    var settings = {};
    settings.image = 'CharFightingSprites';
    settings.width = 256;
    settings.height = 256;
    
    this._super(me.Entity, 'init', [x, y, settings]);

    this.startPos = { x: x, y: y};
    this.flipped = flipped;
    this.renderable.flipX(this.flipped);

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

    if(this.health > 0 && me.input.isKeyPressed('hurtChar')) {
      this.renderable.setCurrentAnimation('takeDamage');
      this.health -= 100;
    }

    if(this.health <= 100) {
      this.renderable.setCurrentAnimation('wounded');
    }

    if(this.health <= 0) {
      this.renderable.setCurrentAnimation('dead');
    }

    this.body.update();

    return true;
  },

  setAnimations: function(num) {
    this.renderable.addAnimation('idle', [num]);
    this.renderable.addAnimation('standReady', [num+1]);
    this.renderable.addAnimation('walk', [num, num+2, num, num+4], 250);
    this.renderable.addAnimation('walkWithWeapon', [num+13, num+14, num+15, num+14], 250);
    this.renderable.addAnimation('attackWithWeapon', [num+11, num+12], 500);
    this.renderable.addAnimation('wounded', [num+8]);
    this.renderable.addAnimation('takeDamage', [num+9, num+8], 500);
    this.renderable.addAnimation('dead', [num+10]);
    this.renderable.addAnimation('whisper', [num+5, num+6], 500);
    this.renderable.addAnimation('wink', [num, num+6], 500);
    this.renderable.addAnimation('punch', [num+4, num+3], 500);
    this.renderable.addAnimation('dance', [num, num+7], 500);
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
        this.setAnimations(16);
        break;
      case game.charClasses.BlackBelt:
        this.health = game.charClasses.BlackBelt.health;
        this.manaScores = game.charClasses.BlackBelt.manaScores;
        this.specials = game.charClasses.BlackBelt.specials;
        this.setAnimations(32);
        break;
      case game.charClasses.RedMage:
        this.health = game.charClasses.RedMage.health;
        this.manaScores = game.charClasses.RedMage.manaScores;
        this.specials = game.charClasses.RedMage.specials;
        this.setAnimations(48);
        break;
      case game.charClasses.WhiteMage:
        this.health = game.charClasses.WhiteMage.health;
        this.manaScores = game.charClasses.WhiteMage.manaScores;
        this.specials = game.charClasses.WhiteMage.specials;
        this.setAnimations(64);
        break;
      case game.charClasses.BlackMage:
        this.health = game.charClasses.BlackMage.health;
        this.manaScores = game.charClasses.BlackMage.manaScores;
        this.specials = game.charClasses.BlackMage.specials;
        this.setAnimations(80);
        break;
     
    }
  },

  setActive: function() {
    if(this.flipped) {
      this.pos.x = this.startPos.x + 60;
    } else {
      this.pos.x = this.startPos.x - 60;
    }
  },

  setInactive: function() {
    this.pos.x = this.startPos.x;
  }
});
