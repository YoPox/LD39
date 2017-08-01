var keyDown = false;
var titleImage;
var titleText;
var titleInterval1;
var titleInterval2;
var titleJump = false;
var crouched;
var transition = new Object();
var graphics;
var pressedSpace = false;
var mute;


var titleState = {

    create: function() {

        game.stage.backgroundColor = "#181225";
        var buffer = game.cache.getBinary('bgm_title');
        // music.play(buffer);

        backerground = game.add.tileSprite(0, 0, 4096, 288, "backerground");

        // Map init
        map = game.add.tilemap('titleMap');
        map.addTilesetImage('tiles');
        map.setCollisionBetween(0, 100, true);

        // Layers
        layerGround = map.createLayer('ground');
        game.physics.arcade.enable(layerGround);
        layerGround.resizeWorld();
        layerScenery = map.createLayer('scenery');

        // Moving things
        deco = [game.add.group(), game.add.group(), game.add.group()];
        map.createFromObjects('objects', 60, 'fly', 0, true, false, deco[0]);
        deco[0].callAll('animations.add', 'animations', 'idle', [0, 0, 1, 2, 2, 2, 3, 4, 5, 5, 4, 3, 2, 2, 1], 6, true);
        deco[0].callAll('animations.play', 'animations', 'idle');
        map.createFromObjects('objects', 61, 'mouse', 0, true, false, deco[1]);
        deco[1].callAll('animations.add', 'animations', 'idle', [0, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 5, 6, 7, 8, 8, 8], 6, true);
        deco[1].callAll('animations.play', 'animations', 'idle');
        map.createFromObjects('objects', 62, 'spider', 0, true, false, deco[2]);
        deco[2].callAll('animations.add', 'animations', 'idle', [0, 0, 0, 0, 1, 2, 3, 3, 3, 3, 2, 1], 6, true);
        deco[2].callAll('animations.play', 'animations', 'idle');

        // Steam
        steam = game.add.group();
        steam.enableBody = true;
        map.createFromObjects('steam', 34, 'steam', 0, true, false, steam);
        steam.callAll('animations.add', 'animations', 'idle', [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, true);
        steam.callAll('animations.play', 'animations', 'idle');

        // Player
        rob = game.add.sprite(32, 288 - 96, 'robot');
        initSprite(rob, [0, 0]);
        rob.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 14, true);
        rob.animations.add('crouching', [8, 9, 10, 11, 12, 13], 48, false);
        rob.animations.add('crouch', [14, 15, 16, 17, 18, 19], 14, true);
        rob.animations.add('standing', [13, 12, 11, 10, 9, 8], 48, false);
        game.physics.arcade.enable(rob);
        rob.body.setSize(10, 24, 3, 8);
        rob.body.gravity.y = 800;
        rob.body.bounce.y = 0;
        rob.animations.play('walk', 14);
        crouched = false;

        // Text
        titleImage = game.add.sprite(game.width / 2, game.height / 4, 'urunium');
        initSprite(titleImage, [0.5, 0.5]);
        titleText = game.add.bitmapText(game.width / 2, game.height / 2 + 16, 'SullyVerge', 'Press SPACE to start', 16);
        initSprite(titleText, [0.5, 0.5]);

        // Rob animation
        // Crouch
        titleInterval1 = setInterval(function() {
            var randnb = Math.random();
            if (randnb < 0.2) {
                if (!crouched) {
                    rob.animations.play('crouching');
                }
                crouched = true
                setTimeout(function() {
                    rob.animations.play('crouch');
                }, 125);
            } else {
                if (crouched) {
                    rob.animations.play('standing');
                }
                crouched = false;
                setTimeout(function() {
                    rob.animations.play('walk');
                }, 125);
            }
        }, 1500);
        // Jump
        titleInterval2 = setInterval(function() {
            var randnb = Math.random();
            if (randnb < 0.3 && !titleJump) {
                titleJump = true;
                rob.body.velocity.y = -250;
            } else if (rob.y == 208) {
                titleJump = false;
            }
            titleText.alpha = 1 - titleText.alpha;
        }, 500);

        graphics = game.add.graphics(0, 0);
        transition.active = false;
        transition.radius = 512;
        transition.type = 0;

    },

    update: function() {
        if (spaceKey.isDown && !pressedSpace) {
            pressedSpace = true;
            sfx[7].play();
            transition.active = true;
            game.add.tween(transition).to({
                radius: 0
            }, 800, Phaser.Easing.Cubic.In, true);
            setTimeout(function() {
                cleanTitle();
                game.state.start("menu");
            }, 1300);
        }
        game.physics.arcade.collide(rob, layerGround);

        if (rob.x > 512 - 64) {
            rob.body.velocity.x = -70;
            rob.scale.x = -1;
        }
        if (rob.x < 64) {
            rob.body.velocity.x = 70;
            rob.scale.x = 1;
        }

        drawPolygonTransition();
        pauseMusic();

    }
}

function cleanTitle() {
    clearInterval(titleInterval1);
    clearInterval(titleInterval2);
    titleText = [];
    titleText.kill();
    titleImage.kill();
    graphics.kill();
}
