game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // reset the score
        game.data.score = 0;

        // change bg
        me.game.world.addChild(new me.ColorLayer('background', '#333333'), 0);

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        // add a grid
        this.grid = new game.Grid();
        this.grid.createTiles();
        me.game.world.addChild(this.grid, 2);

        //add a sprite
        me.game.world.addChild(new game.Character(0, 0));
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});
