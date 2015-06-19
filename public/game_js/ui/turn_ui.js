game.TurnUI = me.Renderable.extend({
  init: function() {
    this._super(me.Renderable, 'init', [0, 0, 0, 0]);

    this.font = new me.Font('Press Start 2P', 24, '#fff', 'center'); 
    this.floating = true;
  },

  draw: function (renderer) {
    this.font.draw(renderer, 'Player ' + game.playScreen.currentPlayer + "'s turn", me.game.viewport.width / 2 - 20, 40);
  }
});
