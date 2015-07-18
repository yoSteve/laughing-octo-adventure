game.UserName = me.Renderable.extend({
  init: function(userName, x, y, alignment) {
    this._super(me.Renderable, 'init', [0, 0, 0, 0]);
    this.font = new me.Font('Press Start 2P', 16, '#fff', alignment); 
    this.floating = true;

    this.name = userName;
    this.x = x;
    this.y = y;
  },
  setActive: function() {
    this.font.setFont('Press Start 2P', 16, '#339900');
  },
  setInactive: function() {
    this.font.setFont('Press Start 2P', 16, '#fff');
  },
  draw: function (renderer) {
    this.font.draw(renderer, this.name, this.x, this.y);
  }
});
