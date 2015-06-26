game.GameOverScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    var settings = {};
    settings.image = 'gameboard-bg';

    this.background = new me.ImageLayer(0, 0, settings);
    me.game.world.addChild(this.background);

    this.team1 = game.data.team1;
    this.team2 = game.data.team2;

    this.winningTeam;

    this.button;

    me.game.world.addChild(this.team1);
    me.game.world.addChild(this.team2);
  },

  onDestroyEvent: function() {
    me.game.world.removeChild(this.background); 
  },

  setWinner: function(winner) {
    var team;
    var otherTeam;

    if(winner == 1) {
      team = this.team1;
      otherTeam = this.team2;
    } else {
      team = this.team2;
      otherTeam = this.team1;
    }

    //team.characters.forEach(function(character) {
    //  character.renderable.setCurrentAnimation('dance');
    //});

    //otherTeam.characters.forEach(function(character) {
    //  character.renderable.setCurrentAnimation('dead');
    //});

    //if(game.data.player == winner) {
    //  me.game.world.addChild(new game.winOrLoseSign(500, 500, 0));
    //} else {
    //  me.game.world.addChild(new game.winOrLoseSign(500, 500, 1));
    //}
  }
});
