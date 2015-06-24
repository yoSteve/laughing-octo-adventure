game.PlayScreen = me.ScreenObject.extend({
    init: function() {
      this.grid;
      this.currentPlayer = 1;
    }, 

    onResetEvent: function() {
      var gameObject = game.data.gameObject;
      me.game.world.addChild(new me.ColorLayer('background', '#33bbcc', 0)); 

      this.grid = new game.Grid(8, 8);  
      this.grid.populate(gameObject.gameBoard);
      me.game.world.addChild(this.grid, 1);

      me.game.world.addChild(new game.TurnUI());

      var team1Object = { teamName: 'Squatpump', playerNum: 1, characters: [ 
        { name: 'Stinky Pete', charClass: game.charClasses.Fighter },
        { name: 'Shteven', charClass: game.charClasses.RedMage },
        { name: 'Wheel', charClass: game.charClasses.Thief },
        { name: 'Kervin', charClass: game.charClasses.BlackMage }
      ] };

      this.team1 = new game.Team(team1Object);
      this.team1.setTeamActive();
      me.game.world.addChild(this.team1);

      var team2Object = { teamName: 'Derpyderp', playerNum: 2, characters: [ 
        { name: 'Benji', charClass: game.charClasses.WhiteMage },
        { name: 'Shames', charClass: game.charClasses.Fighter },
        { name: 'Brody', charClass: game.charClasses.Thief },
        { name: 'Vance', charClass: game.charClasses.BlackBelt }
      ] };

      this.team2 = new game.Team(team2Object);
      this.team2.setTeamInactive();
      me.game.world.addChild(this.team2);

      game.socket.on('refresh-board', function(gameObject) {
        game.playScreen.grid.currentMatch = 0;
        game.playScreen.grid.currentBoard = 0;

        game.playScreen.grid.doStuff = false;

        game.playScreen.grid.lastBoard = gameObject.gameBoard;
        game.playScreen.grid.lastMove = gameObject.lastMove;
        console.log(gameObject.matches);
        game.playScreen.grid.cascadeMatches = gameObject.matches;
        game.playScreen.grid.cascadeBoards = gameObject.cascadeBoards;

        game.playScreen.grid.doStuff = true;

        game.playScreen.currentPlayer = gameObject.turn;
        game.playScreen.switchTurn();
      });
    },

    onDestroyEvent: function() {
      me.game.world.removeChild(this.grid); 
      me.game.world.removeChild(this.team1); 
      me.game.world.removeChild(this.team2); 
    },

    switchTurn: function() {
      if(this.currentPlayer == 1) {
        this.team1.setTeamActive();
        this.team2.setTeamInactive();
      } else {
        this.team2.setTeamActive();
        this.team1.setTeamInactive();
      }
    }
});
