/*
  On screen load, say waiting for game.
  Once match found, display 'Play Game' button.
  Clicking button switches state to PLAY
*/
game.TitleScreen = me.ScreenObject.extend({
    onResetEvent: function() {
      this.background = new me.ColorLayer('background', '#ffffff', 0);
      me.game.world.addChild(this.background);

      this.message = 'Waiting...';

      this.messageUI = new game.MessageUI();
      me.game.world.addChild(this.messageUI);

      game.socket.on('match-message', function(gameId) {
        game.gameId = gameId; 
        this.message = 'Game Found! :D';

        this.startButton = new game.StartButton(50, 50);
        me.game.world.addChild(this.startButton);
      });
    },

    onDestroyEvent: function() {
      me.game.world.removeChild(this.background); 
      me.game.world.removeChild(this.message); 
    }
});
