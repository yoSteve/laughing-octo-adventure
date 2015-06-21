game.TitleScreen = me.ScreenObject.extend({
    onResetEvent: function() {
      me.game.world.addChild(new me.ColorLayer('background', '#ffffff', 0));
      me.game.world.addChild(new game.StartButton(me.game.viewport.width / 2 - 128, 100));
    },

    onDestroyEvent: function() {

    }
});
