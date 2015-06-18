game.PlayScreen = me.ScreenObject.extend({
    init: function() {
      this.grid;
    }, 

    onResetEvent: function() {
      me.game.world.addChild(new me.ColorLayer('background', '#33bbcc', 0)); 

      /*
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
      */

      tiles = [
        [0, 1, 2, 3],
        [4, 5, 0, 1],
        [2, 3, 4, 5],
        [0, 1, 2, 3]
      ]

      this.grid = new game.Grid(4, 4);  
      this.grid.populate(tiles);
      me.game.world.addChild(this.grid, 1);
    },

    onDestroyEvent: function() {
      me.game.world.removeChild(this.grid); 
    }
});
