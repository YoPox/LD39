var scrollSprite;
var uranium;
var barrel;
var steam;
var tutoGroup;
var tutoScreens_jump;
var tutoScreens_crouch;
var tutoScreens_forward;
var tutoScreens_backward;
var blocker;
var stander;
var canStand;
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
            tuto();
        }

        // Steam
        steam = game.add.group();
        steam.enableBody = true;
        map.createFromObjects('objects', 34, 'steam', 0, true, false, steam);
        steam.callAll('animations.add', 'animations', 'idle', [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, true);
        steam.callAll('animations.play', 'animations', 'idle');

        // Player
        rob = game.add.sprite(-64, 288 - 136, 'robot');
        rob.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 14, true);
        rob.animations.add('crouching', [8, 9, 10, 11, 12, 13], 48, false);
        rob.animations.add('crouch', [14, 15, 16, 17, 18, 19], 14, true);
        rob.animations.add('standing', [13, 12, 11, 10, 9, 8], 48, false);
        initSprite(rob, [0, 0]);
        rob.animations.play('walk');
        game.physics.arcade.enable(rob);
        rob.body.setSize(10, 24, 3, 8);
        rob.body.velocity.x = 125;
        rob.body.gravity.y = 800;
        rob.body.bounce.y = 0;

        // Foes
        foes = game.add.group();
        staticsFoes = game.add.group(foes);
        fallingFoes = game.add.group(foes);
        map.createFromObjects("objects", 41, 'fallingRock', 0, true, false, fallingFoes)
        game.physics.arcade.enable(foes);
        fallingFoes.setAll("body.bounce.y", 0.2);
        fallingFoes.callAll('animations.add', 'animations', 'falling', [0, 1, 2], 12, true);
        fallingFoes.callAll('animations.add', 'animations', 'breaking', [3, 4, 5, 6, 7, 8, 9, 10], 14, false);
        fallingFoes.callAll('animations.play', 'animations', 'falling');
        fallingFoes.setAll("body.checkCollision.up", false);
        fallingFoes.setAll("body.checkCollision.right", false);
        fallingFoes.setAll("body.checkCollision.left", false);

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
        map.createFromObjects('objects', 2, 'uranium', 0, true, false, uranium);
        uranium.callAll('animations.add', 'animations', 'idle', [0, 1, 0, 2], 4, true);
        uranium.callAll('animations.play', 'animations', 'idle');
        uraniumCount = 0;

        // Barrels
        barrel = game.add.group();
        barrel.enableBody = true;
        map.createFromObjects('objects', , 'barrel', 0, true, false, barrel);
        barrel.callAll('animations.add', 'animations', 'idle', [2,3,4,5,6,7], 6, true);
        barrel.callAll('animations.play', 'animations', 'idle');

        // Stand up prevention
        canStand = true;
        blocker = game.add.group();
        stander = game.add.group();
        blocker.enableBody = true;
        stander.enableBody = true;
        map.createFromObjects('objects', 39, '', 0, true, false, blocker);
        map.createFromObjects('objects', 40, '', 0, true, false, stander);

        // GUI
        gui.push(game.add.sprite(32, 16, 'counter'));
        gui[0].fixedToCamera = true;
        gui.push(game.add.bitmapText(68, 32, 'SullyVerge', 'x00', 16));
        gui[1].fixedToCamera = true;

        // Sound effects
        downKey.onDown.add(function() {
            sfx[1].play(false);
            rob.animations.play('crouching');
            setTimeout(function () {
                if (downKey.isDown) {
                    rob.animations.play('crouch');
                }
            }, 125);
        });

        game.renderer.renderSession.roundPixels = true;
    },

    update: function() {
        backerground.tilePosition.x = layerGround.position.x / 1.1;
        background.tilePosition.x = layerGround.position.x / 2;
        fallingFoes.forEach(updateFallingFoe);
        collisions();
        input();
        recall();
        checkDeath();
        checkEnd();
    },

    render: function() {
        // game.debug.body(rob);
    }
};

function collisions() {
    game.physics.arcade.collide(rob, layerGround);
    game.physics.arcade.collide(rob, uranium, collectUranium, null, this);
    game.physics.arcade.collide(rob, barrel, collectBarrel, null, this);
    game.physics.arcade.collide(rob, foes, end, null, true);
    game.physics.arcade.overlap(rob, blocker, function() { canStand = false; });
    game.physics.arcade.overlap(rob, stander, function() { canStand = true; });

    //foes
    game.physics.arcade.collide(rob, staticsFoes, end, null, true);
    game.physics.arcade.collide(fallingFoes, layerGround, explodeFallingFoe);
    game.physics.arcade.collide(rob, fallingFoes, collisionFoeRob);
}

function input() {
    jump();
    crouch();
    move();
}

function cleanPlay() {
    gui = [];
    uranium.killAll();
    steam.killAll();
    foes.killAll();
    blocker.killAll();
    stander.killAll();
    if (levelSelector == 0) {
        tutoGroup.killAll();
    }
}

function tuto() {
    var tutoScreens_jump = game.add.group();
    var tutoScreens_crouch = game.add.group();
    var tutoScreens_forward = game.add.group();
    var tutoScreens_backward = game.add.group();
    tutoGroup = game.add.group();
    tutoGroup.addMultiple([tutoScreens_jump, tutoScreens_crouch, tutoScreens_backward, tutoScreens_forward]);
    tutoGroup.enableBody = true;
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

function updateFallingFoe(f){
  if (f.x - 90 < rob.x) {
    f.body.gravity.y = 200;
  }
}

function explodeFallingFoe(f) {
    f.animations.play('breaking');
    f.body.enable = false;
    setTimeout(function() {
        f.visible = false;
    }, 1000);
}

function collisionFoeRob(f) {
    if (f.alive) {
        end(true);
    }
}
