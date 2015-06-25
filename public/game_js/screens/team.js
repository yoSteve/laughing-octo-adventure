game.TeamScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    this.background = new me.ColorLayer('background', '#ffffff', 0);
    me.game.world.addChild(this.background);

    this.pageTitle = 'Choose your Team';
    this.pageTitleUI = new game.PageTitle();
    me.game.world.addChild(this.pageTitleUI);

    this.team1Button = new game.ChooseTeam1(0, 300); 
    me.game.world.addChild(this.team1Button);

    this.team2Button = new game.ChooseTeam2(650, 300); 
    me.game.world.addChild(this.team2Button);
  },

  onDestroyEvent: function() {
    me.game.world.removeChild(this.background);
    me.game.world.removeChild(this.pageTitleUI);
    me.game.world.removeChild(this.pageTitle);
  }
});
