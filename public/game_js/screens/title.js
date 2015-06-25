/*
  On screen load, say waiting for game.
  Once match found, display 'Play Game' button.
  Clicking button switches state to PLAY
*/
game.TitleScreen = me.ScreenObject.extend({
    onResetEvent: function() {
      var settings = {};
      settings.image = 'lobby-bg';
      this.background = new me.ImageLayer(0,0, settings);
      me.game.world.addChild(this.background);


      this.message = 'Waiting ...';

      this.messageUI = new game.MessageUI();
      me.game.world.addChild(this.messageUI);


      var charX = (me.game.viewport.width / 4) - 96;
      var charY = (me.game.viewport.height / 4) *2;


      this.waitingEntity = new game.waitingEntity(charX, charY, true);
      me.game.world.addChild(this.waitingEntity);
      this.waitingEntity.renderable.setCurrentAnimation('walk');


      game.socket.on('match-message', function(gameId) {
        game.data.player = 1;
        game.gameId = gameId; 
        game.titleScreen.message = 'Match found! :D';
        this.startButton = new game.StartButton(me.game.viewport.width / 3, me.game.viewport.height / 3);
        me.game.world.addChild(this.startButton);
      }); 

      game.socket.on('refresh-board', function(gameObject) {
        game.gameId = gameObject.gameId;
        
        if(game.data.player == 0) {
          game.data.player = 2; 
        }
        game.data.gameObject = gameObject;

        game.socket.removeListener('refresh-board');

        me.state.change(me.state.PLAY);
      });
    },


    onDestroyEvent: function() {
      me.game.world.removeChild(this.background); 
      me.game.world.removeChild(this.messageUI); 
      me.game.world.removeChild(this.message); 
    }
});
