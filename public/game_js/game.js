var game = {
  data: {
  //set which player is connected
    player: 1
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
      this.playScreen = new game.PlayScreen();
      me.state.set(me.state.PLAY, this.playScreen);

      me.pool.register('tile', game.Tile, true);

      // Start the game.
      me.state.change(me.state.PLAY);
  },

  sendMessage: function(command, object) {
//    console.log(command); 
 //   console.log(object);
  }
};
