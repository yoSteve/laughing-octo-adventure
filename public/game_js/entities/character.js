game.Character = me.Entity.extend({
  init: function(x, y, team, name, charClass, flipped) {
    var settings = {};
    settings.image = 'CharFightingSprites';
    settings.width = 256;
    settings.height = 256;
    
    this._super(me.Entity, 'init', [x, y, settings]);

    this.startPos = { x: x, y: y};
    this.flipped = flipped;
    this.renderable.flipX(this.flipped);

    this.team = team;
    this.name = name;
    this.nameUI;

    this.health;
    this.healthUI;

    this.charClass;
    this.specials;
    this.manaScores;

    this.buildFromClass(charClass);
    this.createUI();
  },

  update: function(dt) {
    this._super(me.Entity, 'update', [dt]);

    this.body.update();

    return true;
  },

  isDead: function() {
    return this.health <= 0;
  },

  takeDamage: function(damage) {
    this.health -= damage; 

    if(this.health <= 0) {
      this.renderable.setCurrentAnimation('dead');
      //if no more alive, game is over
      if(!this.team.setNextAlive()) {
        game.sendMessage('game-over', { winner: this.playerNum % 2 + 1 }); 
      }
    } else if(this.health < 25) { //100 for realz
      this.renderable.setCurrentAnimation('wounded'); 
    }
  },

  doAttack: function(type, amount) {
    var prevAnimation = 'walk';
    var damage = 0;

    switch(type) {
      case 0:
        damage += this.manaScores.red * amount; 
        break;
      case 1:
        damage += this.manaScores.blue * amount; 
        break;
      case 2:
        damage += this.manaScores.yellow * amount; 
        break;
      case 3:
        damage += this.manaScores.green * amount; 
        break;
      case 4:
        damage += this.manaScores.white * amount; 
        break;
      case 5:
        damage += this.manaScores.black * amount; 
        break;
    }

    if(this.renderable.isCurrentAnimation('idle')) {
      prevAnimation = 'idle';
    } else if(this.renderable.isCurrentAnimation('wounded')) {
      prevAnimation = 'wounded';
    }

    var character = this;

    if(!this.renderable.isCurrentAnimation('attackWithWeapon')) {
      game.playScreen.grid.charactersAttacking++;
    }

    var team;

    if(game.playScreen.currentPlayer == 2) {
      team = game.playScreen.team1;
    } else {
      team = game.playScreen.team2;
    }

    var targetName = team.activeCharacter.name; 

    this.renderable.setCurrentAnimation('attackWithWeapon', function() {
      //deal damage
      character.team.hurt(damage);

      //send message to server about damage
      game.sendMessage('attack', { player: character.team.playerNum, damage: damage, target: targetName });  

      game.playScreen.grid.charactersAttacking--;
            
      character.renderable.setCurrentAnimation(prevAnimation); 
    });
  },

  setAnimations: function(num) {
    this.renderable.addAnimation('idle', [num]);
    this.renderable.addAnimation('standReady', [num+1]);
    this.renderable.addAnimation('walk', [num, num+2, num, num+4], 250);
    this.renderable.addAnimation('walkWithWeapon', [num+13, num+14, num+15, num+14]);
    this.renderable.addAnimation('attackWithWeapon', [num+11, num+12]);
    this.renderable.addAnimation('wounded', [num+8]);
    this.renderable.addAnimation('takeDamage', [num+9, num+8]);
    this.renderable.addAnimation('dead', [num+10]);
    this.renderable.addAnimation('whisper', [num+5, num+6]);
    this.renderable.addAnimation('wink', [num, num+6]);
    this.renderable.addAnimation('punch', [num+4, num+3]);
    this.renderable.addAnimation('dance', [num, num+7]);
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
  },

  createUI: function() {
    this.nameUI = new game.CharName(this);
    me.game.world.addChild(this.nameUI);
    this.healthUI = new game.CharHealth(this);
    me.game.world.addChild(this.healthUI);
  }
});
