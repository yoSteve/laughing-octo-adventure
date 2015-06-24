game.TeamScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    this.background = new me.ColorLayer('background', '#ffffff', 0);
    me.game.world.addChild(this.background);

    this.pageTitle = 'Choose your Team';
    this.pageTitleUI = new game.PageTitle();
    me.game.world.addChild(this.pageTitleUI);

    game.sendMessage('team-chosen', game.data.team1); 
    game.sendMessage('team-chosen', game.data.team2);
  },

  onDestroyEvent: function() {
    me.game.world.removeChild(this.background);
    me.game.world.removeChild(this.pageTitleUI);
    me.game.world.removeChild(this.pageTitle);
  }
});
