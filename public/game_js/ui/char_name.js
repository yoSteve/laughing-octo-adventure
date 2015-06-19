game.CharName = me.Renderable.extend({
  init: function() {
    this._super(me.Renderable, 'init', [0, 0, 0, 0]);

    this.font = new me.Font('Press Start 2P', 16, '#fff', 'center'); 
    this.floating = true;
  },

  draw: function (renderer) {
    this.font.draw(renderer, game.playScreen.character.name, 80, 5);
  }
});
