game.Team = me.Container.extend({
  init: function(object) {
    var settings = {};
    
    this.teamName;
    this.playerNum;
    this.characters = [];
    this._super(me.Container, 'init', [0, 0, 0, 0, settings]);

    this.buildFromObject(object);

    this.activeCharacter = 0;
    this.charSwitched = true;
  },

  update: function(dt) {
    this._super(me.Container, 'update', [dt]);

    if(this.charSwitched) {
      var character = this.characters[this.activeCharacter];
      if(this.playerNum == 1) {
        character.pos.x += 40;
      } else {
        character.pos.x -= 40;
      }
      this.charSwitched = false;
    }

    return true;
  },

  buildFromObject: function(object) {
    // { teamName: string, playerNum: int, characters: [ { name: string, charClass: charClass }, * 4 ] }
    this.teamName = object.teamName;
    this.playerNum = object.playerNum;

    var rightSide;
    var x;

    if(this.playerNum == 1) {
      rightSide = true;
      x = 0;
    } else {
      rightSide = false;   
      x = me.game.viewport.width - 65;
    }

    for(var i = 0; i < game.Team.MAX; i++) {
      var tempChar = new game.Character(x, me.game.viewport.height / 4 + (i * 100), object.characters[i].name, object.characters[i].charClass, rightSide);
      this.characters.push(tempChar);
      this.addChild(tempChar);
    }
  },

  setTeamActive: function() {
    this.characters.forEach(function(character) {
      character.renderable.setCurrentAnimation('walk');
    });
  },

  setTeamInactive: function() {
    this.characters.forEach(function(character) {
      character.renderable.setCurrentAnimation('idle'); 
    });
  },

  setActiveCharacter: function(color) {
    var max = -1;
    var index = -1;
    for(var i = 0; i < this.characters.length; i++) {
      if(this.characters[i].manaScores[color] > max) {
        max = this.characters[i].manaScores[color]; 
        index = i; 
      }
    }
    
    this.activeCharacter = index;
    this.charSwitched = true;
  }
});

game.Team.MAX = 4;
