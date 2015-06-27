game.GameOverScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    var settings = {};
    settings.image = 'arena';

    this.background = new me.ImageLayer(0, 0, settings);
    me.game.world.addChild(this.background);

    this.victorySign = new game.winLoseSign(x, y, flipped, winOrLose);


    this.winner;
  },

  onDestroyEvent: function() {
    me.game.world.removeChild(this.background); 
  },

  setWinner: function(winner) {
    this.team1Entity = new game.chooseTeamEntity(50, 400, false, 0);
    me.game.world.addChild(this.team1Entity);

    this.team2Entity = new game.chooseTeamEntity(700, 400, false, 1);
    me.game.world.addChild(this.team2Entity);

    if(winner == 2) {
      this.team1Entity.renderable.setCurrentAnimation('dance'); 
      this.team2Entity.renderable.setCurrentAnimation('dead'); 
    } else {
      this.team2Entity.renderable.setCurrentAnimation('dance'); 
      this.team1Entity.renderable.setCurrentAnimation('dead'); 
    }

    if(game.data.player == winner) {
      me.game.world.addChild(new game.winLoseSign(me.game.viewport.width / 3, me.game.viewport.height / 3, true, 0)); 
    } else {
      me.game.world.addChild(new game.winLoseSign(me.game.viewport.width / 3, me.game.viewport.height / 3, true, 1)); 
    }
  }
});
