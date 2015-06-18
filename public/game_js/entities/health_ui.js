game.HealthUI = me.Renderable.extend({
    init: function(x, y, team, leftSide) {
        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        //create a font
        this.font = new me.BitmapFont('32x32_font', 32);
        //this.font = new me.BitmapFont('16x16_font', 16);
        if(leftSide) {
          this.font.set('left');
        } else {
          this.font.set('right');
        }

        this.team = team;

        //set to -1 so it gets updated at 0
        this.score = -1;
    },

    update: function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== this.team.score) {
            this.score = this.team.score;
            return true;
        }
        return false;
    },

    draw: function (context) {
      this.font.draw(context, this.player.score, this.pos.x, this.pos.y);
    }

});
