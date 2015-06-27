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

    this.team1Entity = new game.chooseTeamEntity(50, 400, false, 0);
    me.game.world.addChild(this.team1Entity);
    this.team1Entity.renderable.setCurrentAnimation('walk');

    this.team2Button = new game.ChooseTeam2(700, 175); 
    me.game.world.addChild(this.team2Button);

    this.team2Entity = new game.chooseTeamEntity(700, 400, false, 1);
    me.game.world.addChild(this.team2Entity);
    this.team2Entity.renderable.setCurrentAnimation('walk');
  },

  onDestroyEvent: function() {
    me.game.world.removeChild(this.team1Entity);
    me.game.world.removeChild(this.team2Entity);
    me.game.world.removeChild(this.background);
    me.game.world.removeChild(this.pageTitleUI);
    me.game.world.removeChild(this.pageTitle);
  }
});

