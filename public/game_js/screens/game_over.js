game.GameOverScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    var settings = {};
    settings.image = 'arena';

    this.background = new me.ImageLayer(0, 0, settings);
    me.game.world.addChild(this.background);

    this.winner;

    this.button;

    this.team1 = new game.Team(game.data.team1);
    this.team2 = new game.Team(game.data.team2);

    me.game.world.addChild(this.team1);
    me.game.world.addChild(this.team2);
  },



  onDestroyEvent: function() {
    me.game.world.removeChild(this.background); 
  }
});
