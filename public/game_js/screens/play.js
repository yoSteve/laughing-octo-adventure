game.PlayScreen = me.ScreenObject.extend({
    init: function() {
      this.grid;
      this.currentPlayer = 1;
    }, 

    onResetEvent: function() {
      me.game.world.addChild(new me.ColorLayer('background', '#33bbcc', 0)); 

      tiles = [
        [0, 1, 2, 3, 4, 5, 0, 1], 
        [4, 5, 0, 1, 2, 3, 4, 5], 
        [2, 3, 4, 5, 0, 1, 2, 3],
        [0, 1, 2, 3, 4, 5, 0, 1],
        [2, 3, 4, 5, 0, 1, 2, 3],
        [4, 5, 0, 1, 2, 3, 4, 5],
        [0, 1, 2, 3, 4, 5, 0, 1],
        [2, 3, 4, 5, 0, 1, 2, 3]
      ]

      me.input.bindKey(me.input.KEY.X, 'clear', true);
      me.input.bindKey(me.input.KEY.C, 'appear', true);
      me.input.bindKey(me.input.KEY.F1, 'setPlayer1', true);
      me.input.bindKey(me.input.KEY.F2, 'setPlayer2', true);
      me.input.bindKey(me.input.KEY.V, 'hurtChar', true);

      this.grid = new game.Grid(8, 8);  
      this.grid.populate(tiles);
      me.game.world.addChild(this.grid, 1);

      me.game.world.addChild(new game.TurnUI());

      var team1Object = { teamName: 'Squatpump', playerNum: 1, characters: [ 
        { name: 'Stinky Pete', charClass: game.charClasses.Fighter },
        { name: 'Shteven', charClass: game.charClasses.RedMage },
        { name: 'Wheel', charClass: game.charClasses.Thief },
        { name: 'Kervin', charClass: game.charClasses.BlackMage }
      ] };

      me.game.world.addChild(new game.Team(team1Object));

      var team2Object = { teamName: 'Derpyderp', playerNum: 2, characters: [ 
        { name: 'Benji', charClass: game.charClasses.WhiteMage },
        { name: 'Shames', charClass: game.charClasses.Fighter },
        { name: 'Brody', charClass: game.charClasses.Thief },
        { name: 'Vance', charClass: game.charClasses.BlackBelt }
      ] };

      me.game.world.addChild(new game.Team(team2Object));

      /*
      this.character = new game.Character(0, me.game.viewport.height / 4, 'Ted', game.charClasses.Fighter, true);
      me.game.world.addChild(this.character);
      me.game.world.addChild(new game.CharName(this.character));
      me.game.world.addChild(new game.CharHealth(this.character));
      this.character.renderable.setCurrentAnimation('walk');

      this.character2 = new game.Character(1200, me.game.viewport.height / 4, 'Bill', game.charClasses.BlackBelt, false);
      me.game.world.addChild(this.character2);
      me.game.world.addChild(new game.CharName(this.character2));
      me.game.world.addChild(new game.CharHealth(this.character2));
      */
    },

    onDestroyEvent: function() {
      me.game.world.removeChild(this.grid); 
    },

    switchTurn: function() {
      if(this.currentPlayer == 1) {
        this.currentPlayer = 2;
      } else {
        this.currentPlayer = 1;
      }
    }
});
