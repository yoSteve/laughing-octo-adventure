game.StartButton = me.GUI_Object.extend({
  init: function(x, y) {
    var settings = {};
    settings.image = 'StartButton';
    // settings.framewidth = 512;
    // settings.frameheight = 128;

    this._super(me.GUI_Object, 'init', [x, y, settings]);
    this.z = 10;
  },

  onClick: function(event) {
    // this.StartButton.settings.image = "StartButton-pushed";
    game.sendMessage('start-game', game.gameId);
  }
});


