game.TeamScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    var settings = {};
    settings.image = 'arena';
    this.background = new me.ImageLayer(0, 0, settings);
    me.game.world.addChild(this.background);
    // this.background = new me.ColorLayer('background', '#ffffff', 0);
    // me.game.world.addChild(this.background);

    this.pageTitle = 'Choose your Team';
    this.pageTitleUI = new game.PageTitle();
    me.game.world.addChild(this.pageTitleUI);

    this.team1Button = new game.ChooseTeam1(200, 175); 
    me.game.world.addChild(this.team1Button);

    this.team2Button = new game.ChooseTeam2(700, 175); 
    me.game.world.addChild(this.team2Button);
  },

  onDestroyEvent: function() {
    me.game.world.removeChild(this.background);
    me.game.world.removeChild(this.pageTitleUI);
    me.game.world.removeChild(this.pageTitle);
  }
});

