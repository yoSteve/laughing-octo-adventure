game.GameOverScreen = me.ScreenObject.extend({
  onResetEvent: function() {
      var settings = {};
      settings.image = 'gameboard-bg';
      this.background = new me.ImageLayer(0, 0, settings);
      me.game.world.addChild(this.background);
  },



  onDestroyEvent: function() {
    me.game.world.removeChild(this.background); 
  }
});
