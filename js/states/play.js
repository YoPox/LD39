var rob;
var justPressedSpace = false;
var map;
var layerGround;
var layerItems;
var layerScenery;

var playState = {
    create: function() {
        // MUSIC PLAYBACK
        // var buffer = game.cache.getBinary('xm');
        // ArtRemix.play(buffer);

        game.stage.backgroundColor = "#181225";
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Map init
        map = game.add.tilemap('map1');
        map.addTilesetImage('tiles');
        map.setCollisionBetween(0, 100, true);
        layerGround = map.createLayer('ground');
        game.physics.arcade.enable(layerGround);
        layerGround.resizeWorld();
        // initLayer(layerGround);

        layerItems = map.createLayer('item1');
        layerScenery = map.createLayer('scenery');

        rob = game.add.sprite(64, 288 - 136, 'robot');
        initSprite(rob, [0, 0]);
        game.physics.arcade.enable(rob);
        rob.body.setSize(10, 32, 3, 32);
        rob.body.velocity.x = 125;
        rob.body.gravity.y = 400;
        rob.body.bounce.y = 0.2;
        rob.body.collideWorldBounds = true;
        game.camera.follow(rob);

        game.renderer.renderSession.roundPixels = true;
    },

    update: function() {
        console.log(rob.body.blocked.down);
        game.physics.arcade.collide(rob, layerGround);
        input();
    },

    render: function() {
        game.debug.body(rob);
    }
};

function collect1(sprite, tile) {
    tile.alpha = 0;
    console.log("test");
}

function input() {
    if (spaceKey.isDown) {
      if (!justPressedSpace) {
        jump();
        justPressedSpace = true;
      }
    } else {
      justPressedSpace = false;
    }
}

function jump() {
    if (rob.body.blocked.down) {
        rob.body.velocity.y = -200;
    }
}
