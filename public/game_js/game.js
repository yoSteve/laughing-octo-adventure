var game = {

  data: {
  //set which player is connected
    player: 0 
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

      this.titleScreen = new game.TitleScreen();
      me.state.set(me.state.MENU, this.titleScreen);

      this.playScreen = new game.PlayScreen();
      me.state.set(me.state.PLAY, this.playScreen);

      me.pool.register('tile', game.Tile, true);

      // Start the game.
      me.state.change(me.state.MENU);
  },

  sendMessage: function(command, object) {
    object.gameId = this.gameId;
    socket.emit(command, object);
  }
};
