game.PlayScreen = me.ScreenObject.extend({
    init: function() {
      this.grid;
      this.team1;
      this.team2;
      this._super(me.ScreenObject, 'init', []);
    },

    onResetEvent: function() {
        //add background
        me.game.world.addChild(new me.ColorLayer('background', '#ffffff', 0));
        //me.game.world.addChild(new me.ImageLayer(0, 0, { image: 'background2' }, 0)); 

        var tileColors = [[3,0,0,0,],[1,4,1,4],[2,5,2,5],[0,3,2,3]];

        // add a grid
        this.grid = new game.Grid(4, 4);
        this.grid.assignTiles(tileColors);
        me.game.world.addChild(this.grid, 2);

        /*
        // add teams
        this.team1 = new game.Team(0, 0, 0, 0);
        this.team1.createTeam(true);
        me.game.world.addChild(this.team1, 3);

        this.team2 = new game.Team(0, 0, 0, 0);
        this.team2.createTeam(false);
        me.game.world.addChild(this.team2, 3);
        */
    },

    onDestroyEvent: function() {
      this.removeChild(this.grid);
      this.removeChild(this.team1);
      this.removeChild(this.team2);
    }
});
