var scrollSprite;
var justPressedSpace = false;
var background;
var rob;
var map;
var layerGround;
var layerItems;
var layerScenery;
var eqPos; //equilibrium position of the character during the scroll

var playState = {
    create: function() {
        // MUSIC PLAYBACK
        // var buffer = game.cache.getBinary('xm');
        // ArtRemix.play(buffer);

        background = game.add.tileSprite(0, 0, 4096, 512, "background");

        game.stage.backgroundColor = "#181225";
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Map init
        map = game.add.tilemap('map1');
        map.addTilesetImage('tiles');
        map.setCollisionBetween(0, 100, true);
        layerGround = map.createLayer('ground');
        game.physics.arcade.enable(layerGround);
        layerGround.resizeWorld();

        layerItems = map.createLayer('item1');
        layerScenery = map.createLayer('scenery');

        rob = game.add.sprite(64, 288 - 136, 'robot');
        initSprite(rob, [0, 0]);
        game.physics.arcade.enable(rob);
        rob.body.setSize(10, 32, 3, 32);
        rob.body.velocity.x = 125;
        rob.body.gravity.y = 400;
        rob.body.bounce.y = 0.1;

        // Invisible scroll sprite
        scrollSprite = game.add.sprite(game.width / 2, game.height / 2);
        game.physics.arcade.enable(scrollSprite);
        scrollSprite.body.velocity.x = 80;
        scrollSprite.body.collideWorldBounds = true;
        game.camera.follow(scrollSprite);

        game.renderer.renderSession.roundPixels = true;
    },

    update: function() {
        game.physics.arcade.collide(rob, layerGround);
        input();
        recall();
        checkDeath();
    },

    render: function() {
        // game.debug.body(rob);
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

    if (rightKey.isDown) {
        eqPos = -30;
    } else if (leftKey.isDown) {
        eqPos = 60;
    } else {
        eqPos = 15;
    }
}

function jump() {
    if (rob.body.blocked.down) {
        rob.body.velocity.y = -200;
    }
}

function recall() {
    rob.body.velocity.x = (scrollSprite.x - rob.x - eqPos)*1.5;
}

function checkDeath() {
    if (scrollSprite.x - rob.x > 300 || rob.y > 310) { //310 and not 288 which is the screen height
        scrollSprite.body.velocity.x = 0;
    }
}
