game.PageTitle = me.Renderable.extend({
  init: function() {
    this._super(me.Renderable, 'init', [me.game.viewport.width / 2, me.game.viewport.height / 2, 0, 0]);

    this.font = new me.Font('Press Start 2P', 32, '#000');
    this.floating = true;
  },

  draw: function(renderer) {
    this.font.draw(renderer, game.teamScreen.pageTitle, me.game.viewport.width / 3 - 25, 50);
  }
});
