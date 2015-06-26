var game = {

  data: {
  //set which player is connected
    player: 0,
    team1: null, 
    team2: null, 
    user1: null,
    user2: null
  },

  onload: function () {
    // Initialize the video.
    if (!me.video.init(1280, 720, {wrapper : "screen", scale : "auto"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // add "#debug" to the URL to enable the debug Panel
    if (me.game.HASH.debug === true) {
        window.onReady(function () {
            me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
        });
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);

    // disable gravity
    me.sys.gravity = 0;
  },

  // Run on game resources loaded.
  loaded: function () {
      this.socket = io('http://localhost:3000/lobby');
      
      this.data.team1 = { teamName: 'Atomic Puppies', playerNum: 1, characters: 
        [ 
          { name: 'Scrappy', charClass: game.charClasses.Fighter },
          { name: 'Rufus', charClass: game.charClasses.RedMage },
          { name: 'Rover', charClass: game.charClasses.Thief },
          { name: 'Shadow', charClass: game.charClasses.BlackMage }
        ]
      }

      this.data.team2 = { teamName: 'Battle Kittens', playerNum: 2, characters: 
        [ 
          { name: 'Boots', charClass: game.charClasses.Fighter },
          { name: 'Pockets', charClass: game.charClasses.Thief },
          { name: 'Tiger', charClass: game.charClasses.BlackBelt },
          { name: 'Muffin', charClass: game.charClasses.WhiteMage }
        ] 
      }

      this.gameOverScreen = new game.GameOverScreen();
      me.state.set(me.state.GAMEOVER, this.gameOverScreen);

      this.teamScreen = new game.TeamScreen();
      me.state.set(me.state.READY, this.teamScreen);

      this.titleScreen = new game.TitleScreen();
      me.state.set(me.state.MENU, this.titleScreen);

      this.playScreen = new game.PlayScreen();
      me.state.set(me.state.PLAY, this.playScreen);

      me.pool.register('tile', game.Tile, true);

      // Start the game.
      me.state.change(me.state.READY);
  },

  sendMessage: function(command, object) {
    object.gameId = this.gameId;
    this.socket.emit(command, object);
  }
};
