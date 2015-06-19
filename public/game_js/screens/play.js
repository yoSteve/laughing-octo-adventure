game.PlayScreen = me.ScreenObject.extend({
    init: function() {
      this.grid;
      this.player1Turn = true;
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

      /*
      tiles = [
        [0, 1, 2, 3],
        [4, 5, 0, 1],
        [2, 3, 4, 5],
        [0, 1, 2, 3]
      ]
      */

      me.input.bindKey(me.input.KEY.X, 'clear', true);

      this.grid = new game.Grid(8, 8);  
      this.grid.populate(tiles);
      me.game.world.addChild(this.grid, 1);
    },

    onDestroyEvent: function() {
      me.game.world.removeChild(this.grid); 
    }
});
