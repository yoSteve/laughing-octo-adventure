game.ManaUI = me.Renderable.extend({
  init: function(team) {
    this._super(me.Renderable, 'init', [0, 0, 0, 0]);

    this.floating = true;
    this.team = team;

    this.redFont = new me.Font('Press Start 2P', 20, '#f00', 'right'); 
    this.blueFont = new me.Font('Press Start 2P', 20, '#00f', 'right'); 
    this.yellowFont = new me.Font('Press Start 2P', 20, '#f4e60d', 'right'); 
    this.greenFont = new me.Font('Press Start 2P', 20, '#0f0', 'right'); 
    this.whiteFont = new me.Font('Press Start 2P', 20, '#fff', 'right'); 
    this.blackFont = new me.Font('Press Start 2P', 20, '#000', 'right'); 

    if(this.team.activeCharacter.flipped) {
      this.x = 150; 
    } else {
      this.x = me.game.viewport.width - 300; 

      this.redFont.textAlign = 'left';
      this.blueFont.textAlign = 'left';
      this.yellowFont.textAlign = 'left';
      this.greenFont.textAlign = 'left';
      this.whiteFont.textAlign = 'left';
      this.blackFont.textAlign = 'left';
    }

    this.y = 40;
  },

  draw: function(renderer) {
    this.redFont.draw(renderer, this.team.manaScores.red, this.x, this.y);
    this.blueFont.draw(renderer, this.team.manaScores.blue, this.x + 40, this.y);
    this.yellowFont.draw(renderer, this.team.manaScores.yellow, this.x + 80, this.y);
    this.greenFont.draw(renderer, this.team.manaScores.green, this.x + 120, this.y);
    this.whiteFont.draw(renderer, this.team.manaScores.white, this.x + 160, this.y);
    this.blackFont.draw(renderer, this.team.manaScores.black, this.x + 200, this.y);
  }
});
