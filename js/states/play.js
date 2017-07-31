var scrollSprite;
var uranium;
var steam;
var tutoScreens_jump;
var tutoScreens_crouch;
var tutoScreens_forward;
var tutoScreens_backward;
var uraniumCount;
var justPressedSpace = false;
var background;
var backerground;
// var foreground;
var rob;
var map;
var gui = [];
var layerGround;
var layerScenery;
var eqPos; // equilibrium position of the character during the scroll
var isCrouching = false;

var foes = [];

var playState = {
    create: function() {
        // MUSIC PLAYBACK
        // var buffer = game.cache.getBinary('xm');
        // music.play(buffer);

        // Backerground
        backerground = game.add.tileSprite(0, 0, 4096, 288, "backerground");

        // Background
        background = game.add.tileSprite(0, 0, 4096, 288, "background");

        // Map init
        map = game.add.tilemap('map' + levelSelector);
        map.addTilesetImage('tiles');
        map.setCollisionBetween(0, 100, true);
        // Layers
        layerGround = map.createLayer('ground');
        game.physics.arcade.enable(layerGround);
        layerGround.resizeWorld();
        layerScenery = map.createLayer('scenery');

        // Tutorial
        if (levelSelector == 0) {
            var tutoScreens_jump = game.add.group();
            var tutoScreens_crouch = game.add.group();
            var tutoScreens_forward = game.add.group();
            var tutoScreens_backward = game.add.group();
            tutoScreens_jump.enableBody = true;
            tutoScreens_crouch.enableBody = true;
            tutoScreens_forward.enableBody = true;
            tutoScreens_backward.enableBody = true;
            map.createFromObjects('tuto', 35, 'tutoScreens_jump', 0, true, false, tutoScreens_jump);
            map.createFromObjects('tuto', 36, 'tutoScreens_crouch', 0, true, false, tutoScreens_crouch);
            map.createFromObjects('tuto', 38, 'tutoScreens_forward', 0, true, false, tutoScreens_forward);
            map.createFromObjects('tuto', 37, 'tutoScreens_backward', 0, true, false, tutoScreens_backward);
            tutoScreens_jump.callAll('animations.add', 'animations', 'idle', [0, 1, 2], 2, true);
            tutoScreens_jump.callAll('animations.play', 'animations', 'idle');
            tutoScreens_crouch.callAll('animations.add', 'animations', 'idle', [0, 1, 2], 2, true);
            tutoScreens_crouch.callAll('animations.play', 'animations', 'idle');
            tutoScreens_forward.callAll('animations.add', 'animations', 'idle', [0, 1, 2], 2, true);
            tutoScreens_forward.callAll('animations.play', 'animations', 'idle');
            tutoScreens_backward.callAll('animations.add', 'animations', 'idle', [0, 1, 2], 2, true);
            tutoScreens_backward.callAll('animations.play', 'animations', 'idle');
        }

        // Steam
        steam = game.add.group();
        steam.enableBody = true;
        map.createFromObjects('steam', 34, 'steam', 0, true, false, steam);
        steam.callAll('animations.add', 'animations', 'idle', [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, true);
        steam.callAll('animations.play', 'animations', 'idle');

        // Player
        rob = game.add.sprite(-64, 288 - 136, 'robot');
        rob.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 14, true);
        rob.animations.add('crouch', [8, 9, 10, 11, 12, 13], 14, true);
        initSprite(rob, [0, 0]);
        rob.animations.play('walk');
        game.physics.arcade.enable(rob);
        rob.body.setSize(10, 24, 3, 8);
        rob.body.velocity.x = 125;
        rob.body.gravity.y = 800;
        rob.body.bounce.y = 0;

        // foes
        foes = game.add.group();
        staticsFoes = game.add.group();
        foes.add(staticsFoes);
        fallingFoes = game.add.group();
        foes.add(fallingFoes);


        // Invisible scroll sprite
        scrollSprite = game.add.sprite(game.width / 2 - 128, game.height / 2);
        game.physics.arcade.enable(scrollSprite);
        scrollSprite.body.velocity.x = 80;
        scrollSprite.body.collideWorldBounds = true;
        game.camera.follow(scrollSprite);
        game.camera.roundPx = false;

        // Collectibles
        uranium = game.add.group();
        uranium.enableBody = true;
        map.createFromObjects('uranium', 2, 'uranium', 0, true, false, uranium);
        uranium.callAll('animations.add', 'animations', 'idle', [0, 1, 0, 2], 4, true);
        uranium.callAll('animations.play', 'animations', 'idle');
        uraniumCount = 0;

        // GUI
        gui.push(game.add.sprite(32, 16, 'counter'));
        gui[0].fixedToCamera = true;
        gui.push(game.add.bitmapText(68, 32, 'SullyVerge', 'x00', 16));
        gui[1].fixedToCamera = true;

        // Sound effects
        downKey.onDown.add(function() { sfx[1].play(false); });

        game.renderer.renderSession.roundPixels = true;
    },

    update: function() {
        backerground.tilePosition.x = layerGround.position.x / 1.1;
        background.tilePosition.x = layerGround.position.x / 2;
        game.physics.arcade.collide(rob, layerGround);
        game.physics.arcade.collide(rob, uranium, collectUranium, null, this);
        game.physics.arcade.collide(fallingFoes, layerGround);
        game.physics.arcade.collide(rob, foes, end, null, true);
        input();
        recall();
        checkDeath();
        checkEnd();
    },

    render: function() {
        // game.debug.body(rob);
    }
};

function input() {
    jump();
    crouch();
    move();
}

function cleanPlay() {
    gui = [];
}