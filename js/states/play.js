var rob;
var justPressedSpace = false;
var map;

var playState = {
  create: function() {

    // MUSIC PLAYBACK
    // var buffer = game.cache.getBinary('xm');
    // ArtRemix.play(buffer);

    game.stage.backgroundColor = "#EEEEEE";
    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('map1', 16, 16);
    map.addTilesetImage('tiles');
    layer = map.createLayer(0);
    initLayer(layer);
    layerItems = map.createLayer(1);
    initLayer(layerItems);

    rob = game.add.sprite(64, 576 - 128, 'robot');
    rob.animations.add('up', [0, 1, 2, 3, 4]);
    initSprite(rob, [0, 1], [4, 4]);
    game.physics.arcade.enable(rob);
    rob.body.velocity.x = 250;
    game.camera.follow(rob);

    game.renderer.renderSession.roundPixels = true;

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
