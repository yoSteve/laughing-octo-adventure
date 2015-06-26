game.GameOverScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    this.background = new me.ColorLayer('background', '#fff', 0);
    me.game.world.addChild(this.background);
  },

  onDestroyEvent: function() {
    me.game.world.removeChild(this.background); 
  }
});
