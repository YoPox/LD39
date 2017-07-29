var scrollSprite;
var uranium;
var justPressedSpace = false;
var background;
var rob;
var map;
var layerGround;
var layerItems;
var layerScenery;
var eqPos; //equilibrium position of the character during the scroll
var isCrouching = false;

var playState = {
    create: function() {
        // MUSIC PLAYBACK
        // var buffer = game.cache.getBinary('xm');
        // music.play(buffer);

        game.stage.backgroundColor = "#181225";
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Background
        background = game.add.tileSprite(0, 0, 4096, 288, "background");
        // game.physics.arcade.enable(background);
        // background.body.velocity.x = 30;

        // Map init
        map = game.add.tilemap('map1');
        map.addTilesetImage('tiles');
        map.setCollisionBetween(0, 100, true);
        // Layers
        layerGround = map.createLayer('ground');
        game.physics.arcade.enable(layerGround);
        layerGround.resizeWorld();
        layerScenery = map.createLayer('scenery');

        // Player
        rob = game.add.sprite(-64, 288 - 136, 'robot');
        initSprite(rob, [0, 0]);
        game.physics.arcade.enable(rob);
        rob.body.setSize(10, 24, 3, 8);
        rob.body.velocity.x = 125;
        rob.body.gravity.y = 800;
        rob.body.bounce.y = 0;

        // Invisible scroll sprite
        scrollSprite = game.add.sprite(game.width / 2 - 128, game.height / 2);
        game.physics.arcade.enable(scrollSprite);
        scrollSprite.body.velocity.x = 80;
        scrollSprite.body.collideWorldBounds = true;
        game.camera.follow(scrollSprite);

        // Collectibles
        uranium = game.add.group();
        uranium.enableBody = true;
        map.createFromObjects('uranium', 2, 'uranium', 0, true, false, uranium);
        uranium.callAll('animations.add', 'animations', 'idle', [0, 2, 2, 0, 1, 0, 3, 3, 0, 1], 5, true);
        uranium.callAll('animations.play', 'animations', 'idle');

        game.renderer.renderSession.roundPixels = true;
    },

    update: function() {
        // background.tilePosition.x -= 0.001*scrollSprite.body.velocity.x;
        background.tilePosition.x = layerGround.position.x/2;
        game.physics.arcade.collide(rob, layerGround);
        game.physics.arcade.collide(rob, uranium, collectUranium, null, this);
        input();
        recall();
        checkDeath();
    },

    render: function() {
        game.debug.body(rob);
    }
};

function collectUranium(sprite, ura) {
    // TODO: Compteur
    ura.kill();
}

function input() {
    jump();
    crouch();
    move();
}
