game.ChooseTeam2 = me.GUI_Object.extend({
  init: function(x, y) {
    var settings = {};
    settings.image = 'button';
    settings.framewidth = 512;
    settings.frameheight = 128;

    this._super(me.GUI_Object, 'init', [x, y, settings]);
  },

  onClick: function(event) {
    game.sendMessage('team-chosen', game.data.team2);
  }
});
