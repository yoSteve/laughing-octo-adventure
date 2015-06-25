game.ChooseTeam2 = me.GUI_Object.extend({
  init: function(x, y) {
    var settings = {};
    settings.image = 'StartButton';

    this._super(me.GUI_Object, 'init', [x, y, settings]);
  },

  onClick: function(event) {
    game.sendMessage('team-chosen', game.data.team2);
    me.state.change(me.state.MENU);
  }
});
