var rob;
var justPressedSpace = false;
var map;

var playState = {
  create: function() {

    // MUSIC PLAYBACK
    // var buffer = game.cache.getBinary('xm');
    // ArtRemix.play(buffer);

    game.stage.backgroundColor = "#EEEEEE";

    map = game.add.tilemap('map1', 16, 16);
    map.addTilesetImage('tiles');
    layer = map.createLayer(0);
    layer.resizeWorld();
    layer.smoothed = false;
    layer.scale.x = 2;
    layer.scale.y = 2;

    rob = game.add.sprite(64, 576 - 128, 'robot');
    rob.animations.add('up', [0, 1, 2, 3, 4]);
    initSprite(rob, [0, 1], [4, 4]);

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
