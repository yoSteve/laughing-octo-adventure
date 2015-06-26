game.winLoseSign = me.Entity.extend({
  init: function(x, y, flipped, winOrLose) {
    var settings = {};
    settings.image = 'victoryDefeatSignSprites';
    settings.width = 416;
    settings.height = 213;
    
    this._super(me.Entity, 'init', [x, y, settings]);

    this.startPos = { x: x, y: y};
    this.flipped = flipped;
    this.renderable.flipX(this.flipped);

    this.winOrLose = winOrLose;

    this.buildSignEntity(this.winOrLose);
},

  
  update: function(dt) {
    this._super(me.Entity, 'update', [dt]);
    this.body.update();
    return true;
  },

  setAnimations: function(num) {
    this.renderable.addAnimation('win', [num, num+1], 250);
    this.renderable.addAnimation('lose', [num+2, num+2], 250);
    this.renderable.setCurrentAnimation('walk');
  },

  buildSignEntity: function(winOrLose) {
      switch(winOrLose) {
        case 0:
        // win
          this.setAnimations(0);
          break;
        case 1:
        // lose
          this.setAnimations(2);
          break;
      }
  }
});