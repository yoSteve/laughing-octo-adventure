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

      this.character = new game.Character(0, me.game.viewport.height / 4, 'Ted', game.charClasses.Fighter, true);
      me.game.world.addChild(this.character);
      me.game.world.addChild(new game.CharName(this.character));
      me.game.world.addChild(new game.CharHealth(this.character));
      this.character.renderable.setCurrentAnimation('walk');

      this.character2 = new game.Character(1200, me.game.viewport.height / 4, 'Bill', game.charClasses.BlackBelt, false);
      me.game.world.addChild(this.character2);
      me.game.world.addChild(new game.CharName(this.character2));
      me.game.world.addChild(new game.CharHealth(this.character2));
    },

    onDestroyEvent: function() {
      me.game.world.removeChild(this.grid); 
    },

    switchTurn: function() {
      if(this.currentPlayer == 1) {
        this.currentPlayer = 2;
        this.character.renderable.setCurrentAnimation('idle');
        this.character2.renderable.setCurrentAnimation('walk');
      } else {
        this.currentPlayer = 1;
        this.character.renderable.setCurrentAnimation('walk');
        this.character2.renderable.setCurrentAnimation('idle');
      }
    }
});
