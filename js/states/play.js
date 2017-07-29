var rob;
var justPressedSpace = false;
var map, layerGround, layerItems;

var playState = {
  create: function() {

    // MUSIC PLAYBACK
    // var buffer = game.cache.getBinary('xm');
    // ArtRemix.play(buffer);

    game.stage.backgroundColor = "#EEEEEE";
    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('map1', 16, 16);
    map.addTilesetImage('tiles');
    layerGround = map.createLayer('ground');
    initLayer(layerGround);
    layerItems = map.createLayer('item1');
    initLayer(layerItems);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    map.setCollisionBetween(0, 100, true, 0);

    // rob = game.add.sprite(64, 576 - 128, 'robot');
    rob = game.add.sprite(64, 500 - 128, 'robot');
    rob.animations.add('up', [0, 1, 2, 3, 4]);
    initSprite(rob, [0, 1], [4, 4]);
    game.physics.arcade.enable(rob);
    rob.body.velocity.x = 250;
    rob.body.gravity.y = 400;
    rob.body.bounce.y = 0.5;
    rob.body.collideWorldBounds = true;
    game.camera.follow(rob);

    game.renderer.renderSession.roundPixels = true;

  },

  update: function() {
    game.physics.arcade.collide(rob, layerGround);
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
