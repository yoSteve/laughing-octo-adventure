game.TileGroup = me.DraggableEntity.extend({
  init: function(x, y) {
    var settings = {};
    this.tiles = [];
    
    this._super(me.DraggableEntity, 'init', [x, y, settings]);
  },

  update: function(dt) {
    this._super(me.DraggableEntity, 'update', [dt]);
  },

  addTile: function(tile) {
    this.tiles.push(tile);
  },

  dragStart: function(event) {
    this._super(me.DraggableEntity, 'dragStart', [event]);
  },

  dragEnd: function(event) {
    this._super(me.DraggableEntity, 'dragStart', [event]);
  }
});
