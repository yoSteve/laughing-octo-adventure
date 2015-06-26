game.Team = me.Container.extend({
  init: function(object) {
    var settings = {};
    
    this.teamName;
    this.teamNameUI;

    this.manaScores = {
      red: 0,
      blue: 0,
      yellow: 0,
      green: 0,
      white: 0,
      black: 0
    };
    this.manaUI;

    this.playerNum;
    this.characters = [];
    this._super(me.Container, 'init', [0, 0, 0, 0, settings]);

    this.buildFromObject(object);

    this.activeCharacter = this.characters[0];
    this.activeCharacter.setActive();

    this.createUI();
  },

  update: function(dt) {
    this._super(me.Container, 'update', [dt]);

    return true;
  },

  anyAlive: function() {
    for(var i = 0; i < this.characters.length; i++) {
      if(this.characters[i].alive) {
        return true;
      }
    }
    return false;
  },

  attack: function(turnMana) {
    var attacks = [];
    //iterate through colors, creating objects of best characters to attack.
    if(turnMana.red > 0) {
      attacks.push({ type: 0, mana: turnMana.red });
    }

    if(turnMana.blue > 0) {
      attacks.push({ type: 1, mana: turnMana.blue });
    }

    if(turnMana.yellow > 0) {
      attacks.push({ type: 2, mana: turnMana.yellow });
    }

    if(turnMana.green > 0) {
      attacks.push({ type: 3, mana: turnMana.green });
    }

    if(turnMana.white > 0) {
      attacks.push({ type: 4, mana: turnMana.white });
    }

    if(turnMana.black > 0) {
      attacks.push({ type: 5, mana: turnMana.black });
    }

    var team = this;
    //trigger attack animation for each attack object
    attacks.forEach(function(attack) {
      team.getBestAttacker(attack.type).doAttack(attack.type, attack.mana);
    });
  },

  hurt: function(damage) {
    console.log('damage', damage);
    if(game.playScreen.currentPlayer == 2) {
      game.playScreen.team2.activeCharacter.takeDamage(damage);
    } else {
      game.playScreen.team1.activeCharacter.takeDamage(damage);
    }
  },

  setNextAlive: function() {
    for(var i = 0; i < this.characters.length; i++) {
      if(!this.characters[i].alive) {
        this.characters[i].setInactive();
        continue;
      }

      this.activeCharacter = this.characters[i];
      this.characters[i].setActive();
      return true;
    }
    return false;
  },

  buildFromObject: function(object) {
    // { teamName: string, playerNum: int, characters: [ { name: string, charClass: charClass }, * 4 ] }
    this.teamName = object.teamName;
    this.playerNum = object.playerNum;

    var rightSide;
    var x;

    if(this.playerNum == 1) {
      rightSide = true;
      x = -30;
    } else {
      rightSide = false;   
      x = me.game.viewport.width - 230;
    }

    for(var i = 0; i < game.Team.MAX; i++) {
      var tempChar = new game.Character(x, 125 + (i * 125), this, object.characters[i].name, object.characters[i].charClass, rightSide);
      this.characters.push(tempChar);
      this.addChild(tempChar);
    }
  },

  getBestAttacker: function(manaType) {
    var character;
    var max = -1;

    var chars = this.characters.filter(function(character) {
      return character.alive;
    });

    switch(manaType) {
      case 0:
        for(var i = 0; i < chars.length; i++) {
          if(chars[i].manaScores.red > max) {
            character = chars[i];
            max = character.manaScores.red;
          }
        }
        break;
      case 1:
        for(var i = 0; i < chars.length; i++) {
          if(chars[i].manaScores.blue > max) {
            character = chars[i];
            max = character.manaScores.blue;
          }
        }
        break;
      case 2:
        for(var i = 0; i < chars.length; i++) {
          if(chars[i].manaScores.yellow > max) {
            character = chars[i];
            max = character.manaScores.yellow;
          }
        }
        break;
      case 3:
        for(var i = 0; i < chars.length; i++) {
          if(chars[i].manaScores.green > max) {
            character = chars[i];
            max = character.manaScores.green;
          }
        }
        break;
      case 4:
        for(var i = 0; i < chars.length; i++) {
          if(chars[i].manaScores.white > max) {
            character = chars[i];
            max = character.manaScores.white;
          }
        }
        break;
      case 5:
        for(var i = 0; i < chars.length; i++) {
          if(chars[i].manaScores.black > max) {
            character = chars[i];
            max = character.manaScores.black;
          }
        }
        break;
    }

    return character;
  },

  setTeamActive: function() {
    this.characters.forEach(function(character) {
      if(character.health > 100) { 
        character.renderable.setCurrentAnimation('walk');
      }
    });
  },

  setTeamInactive: function() {
    this.characters.forEach(function(character) {
      if(character.health > 100) {
        character.renderable.setCurrentAnimation('idle'); 
      }
    });
  },

  createUI: function() {
    this.teamNameUI = new game.TeamName(this); 
    me.game.world.addChild(this.teamNameUI);
    this.manaUI = new game.ManaUI(this);
    me.game.world.addChild(this.manaUI);
  }
});

game.Team.MAX = 4;
