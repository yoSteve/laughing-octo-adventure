game.Team = me.Container.extend({
  init: function(x, y, w, h) {
    var settings = {};
    
    this._super(me.Container, 'init', [x, y, w, h, settings]);
  },

  createTeam: function(leftSide) {
    if(leftSide) {
      for(var i = 0; i < game.Team.MAX; i++) {
        this.addChild(me.pool.pull('character', 10, me.game.viewport.height / 5 * i + 100, leftSide));
      }
    } else {
      for(var i = 0; i < game.Team.MAX; i++) {
        this.addChild(me.pool.pull('character', me.game.viewport.width - 74, me.game.viewport.height / 5 * i + 100, leftSide));
      }
    }
  }
});

game.Team.MAX = 4;
