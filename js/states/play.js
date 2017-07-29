var rob;
var justPressedSpace = false;


var playState = {
  create: function() {

    // MUSIC PLAYBACK
    // var buffer = game.cache.getBinary('xm');
    // ArtRemix.play(buffer);

    game.stage.backgroundColor = "#EEEEEE";

    // TODO : Ne pas créer les persos ici ?
    rob = game.add.sprite(256, 476, 'robot');
    rob.animations.add('up', [0, 1, 2, 3, 4]);
    initSprite(rob, [0.5, 1], [3, 3]);

  },

  update: function() {
    if (spaceKey.isDown) {
      if (!justPressedSpace) {
        rob.animations.play('up', 20, 0);
        justPressedSpace = true;
      }
    } else {
      justPressedSpace = false;
    }
  }
};
