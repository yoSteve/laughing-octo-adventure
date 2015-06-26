game.TeamName = me.Renderable.extend({
  init: function(team) {
    this._super(me.Renderable, 'init', [0, 0, 0, 0]);

    this.font = new me.Font('Press Start 2P', 20, '#fff', 'right');
    this.floating = true;

    this.team = team;

    this.x;
    this.y = 15;

    if(this.team.activeCharacter.flipped) {
      this.x = 350;
    } else {
      this.x = me.game.viewport.width - 350; 
      this.font.textAlign = 'left';
    }
  },

  draw: function(renderer) {
    this.font.draw(renderer, this.team.teamName, this.x, this.y); 
  }
});
