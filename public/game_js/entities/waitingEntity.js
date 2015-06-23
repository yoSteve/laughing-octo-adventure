game.waitingEntity = me.Entity.extend({
  init: function(x, y, flipped) {
    var settings = {};
    settings.image = 'CharFightingSprites';
    settings.width = 256;
    settings.height = 256;
    
    this._super(me.Entity, 'init', [x, y, settings]);

    this.startPos = { x: x, y: y};
    this.flipped = flipped;
    this.renderable.flipX(this.flipped);

    this.name = name;

    this.rando = Math.floor((Math.random()*5) +1);

    console.log("rando: " + this.rando);
    console.log("width: " + me.game.viewport.width);
    console.log("height: " + me.game.viewport.height);
    console.log("atBeginning: " + this.atBeginning);
    console.log("atEnd: " + this.atEnd);
    
    this.buildRandomEntity(this.rando);

    this.speed = 0.15;
    this.atBeginning = (me.game.viewport.width / 4) - 96;
    this.atEnd = (me.game.viewport.width / 4) *3 - 96;


},

  
  update: function(dt) {
    this._super(me.Entity, 'update', [dt]);
    
    if (this.pos.x >= this.atEnd) {
      console.log("atEnd: " + this.atEnd);
      this.speed = -0.15;
      this.renderable.setCurrentAnimation('standReady', 'walk');
      this.renderable.flipX (!this.flipped);
    };
    if (this.pos.x <= this.atBeginning) {
      console.log("atBeginning: " + this.atBeginning);
      this.speed = 0.15;
      this.renderable.setCurrentAnimation('standReady', 'walk');
      this.renderable.flipX(this.flipped);
    };
    this.pos.x += this.speed*[dt];
    return true;
  },

  setAnimations: function(num) {
    this.renderable.addAnimation('idle', [num]);
    this.renderable.addAnimation('standReady', [num+1, num+1], 75);
    this.renderable.addAnimation('walk', [num, num+2, num, num+4], 200);
    this.renderable.addAnimation('walkWithWeapon', [num+13, num+14, num+15, num+14], 250);
    this.renderable.addAnimation('attackWithWeapon', [num+11, num+12], 250);
    this.renderable.addAnimation('wounded', [num+8]);
    this.renderable.addAnimation('takeDamage', [num+9, num+8], 250);
    this.renderable.addAnimation('dead', [num+10]);
    this.renderable.addAnimation('whisper', [num+5, num+6], 250);
    this.renderable.addAnimation('wink', [num, num+6], 250);
    this.renderable.addAnimation('punch', [num+4, num+3], 250);
    this.renderable.addAnimation('dance', [num, num+7], 200);
    this.renderable.setCurrentAnimation('walk');
  },

  buildRandomEntity: function(randomNumber) {
      switch(randomNumber) {
        case 0 :
        this.setAnimations(0);
        break;
        case 1 :
        this.setAnimations(16);
        break;
        case 2 :
        this.setAnimations(32);
        break;
        case 3 :
        this.setAnimations(48);
        break;
        case 4 :
        this.setAnimations(64);
        break;
        case 5 :
        this.setAnimations(80);
        break;
      }
  },

});
