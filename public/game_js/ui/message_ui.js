game.MessageUI = me.Renderable.extend({
  init: function() {
    this._super(me.Renderable, 'init', [me.game.viewport.width / 2 - 50, me.game.viewport.height / 2, 0, 0]);  

    this.font = new me.Font('Press Start 2P', 32, '#000', 'center');
    this.floating = true;
  },

  draw: function(renderer) {
    this.font.draw(renderer, game.titleScreen.message, me.game.viewport.width / 3, 50);
  }
});
