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
        game.data.player = 1;
        game.gameId = gameId; 
        game.titleScreen.message = 'Game Found! :D';

        this.startButton = new game.StartButton(me.game.viewport.width / 2, me.game.viewport.height / 2);
        me.game.world.addChild(this.startButton);
      });

      game.socket.on('refresh-board', function(gameObject) {
        game.gameId = gameObject.gameId;
        
        if(game.data.player == 0) {
          game.data.player = 2; 
        }
        game.data.gameObject = gameObject;
        me.state.change(me.state.PLAY);
      });
    },

    onDestroyEvent: function() {
      me.game.world.removeChild(this.background); 
      me.game.world.removeChild(this.message); 
    }
});
