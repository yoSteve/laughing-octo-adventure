game.TitleScreen = me.ScreenObject.extend({
    onResetEvent: function() {
      me.game.world.addChild(new me.ColorLayer('background', '#ffffff', 0));
    },

    onDestroyEvent: function() {

    }
});
