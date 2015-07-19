game.PlayScreen = me.ScreenObject.extend({
    init: function() {
      this.grid;
      this.currentPlayer = 1;
    }, 

    onResetEvent: function() {
      var gameObject = game.data.gameObject;
      var settings = {};
      settings.image = 'gameboard-bg';
      this.background = new me.ImageLayer(0, 0, settings);
      me.game.world.addChild(this.background);

      this.grid = new game.Grid(8, 8);  
      this.grid.populate(gameObject.gameBoard);
      me.game.world.addChild(this.grid, 1);

      var team1Object = game.data.team1;
      this.team1 = new game.Team(team1Object);
      this.team1.setTeamActive();
      me.game.world.addChild(this.team1);

      this.user1Name = new game.UserName(game.data.user1, 25, 120, 'left'); 
      this.user1Name.setActive();
      me.game.world.addChild(this.user1Name);

      var team2Object = game.data.team2; 
      this.team2 = new game.Team(game.data.team2);
      this.team2.setTeamInactive();
      me.game.world.addChild(this.team2);

      this.user2Name = new game.UserName(game.data.user2, 1260, 120, 'right'); 
      me.game.world.addChild(this.user2Name);

      game.socket.on('refresh-board', function(gameObject) {
        //makes grid wait until data is ready before updating
        game.playScreen.grid.dataReady = false;
        
        if (gameObject.lastMove) {
          game.playScreen.grid.grabbedCrystal = gameObject.lastMove.firstCrystal;
        }
        game.playScreen.grid.currentMatch = 0;
        game.playScreen.grid.currentBoard = 0;
        game.playScreen.grid.charactersAttacking = 0;

        game.playScreen.grid.attacked = false;

        game.playScreen.grid.resetTurnMana();

        game.playScreen.grid.lastBoard = gameObject.gameBoard;
        game.playScreen.grid.lastMove = gameObject.lastMove;
        game.playScreen.grid.cascadeMatches = gameObject.matches;
        game.playScreen.grid.cascadeBoards = gameObject.cascadeBoards;

        game.playScreen.currentPlayer = gameObject.turn;
        game.playScreen.switchTurn();

        game.playScreen.grid.dataReady = true;
      });

      game.socket.on('dc', function(winner){
        alert("somebody disconnected" );
        console.log(winner, " has won the game due to a disconnect");
        me.state.change(me.state.READY);
        //should really reset the game somehow here...
      });
    },

    onDestroyEvent: function() {
      me.game.world.removeChild(this.grid); 
      me.game.world.removeChild(this.team1); 
      me.game.world.removeChild(this.team2); 
      me.game.world.removeChild(this.user1Name);
      me.game.world.removeChild(this.user2Name);
    },

    switchTurn: function() {
      if(this.currentPlayer == 1) {
        this.team1.setTeamActive();
        this.user1Name.setActive();
        this.team2.setTeamInactive();
        this.user2Name.setInactive();
      } else {
        this.team2.setTeamActive();
        this.user2Name.setActive();
        this.team1.setTeamInactive();
        this.user1Name.setInactive();
      }
    }
});
