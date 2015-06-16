game.Team = me.Container.extend({
  init: function(x, y, w, h) {
    var settings = {};
    
    this._super(me.Container, 'init', [x, y, w, h, settings]);
  },

  createTeam: function() {
    
  }
});
