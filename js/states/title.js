var levelSelector = 1;
var keyDown = false;
var titleText = [];
var titleInterval1;
var titleInterval2;
var titleJump = false;

var titleState = {

    create: function() {

        game.stage.backgroundColor = "#181225";

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

        // Player
        rob = game.add.sprite(32, 288 - 96, 'robot');
        initSprite(rob, [0, 0]);
        rob.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 16, true);
        rob.animations.add('crouch', [8, 9, 10, 11, 12, 13], 14, true);
        game.physics.arcade.enable(rob);
        rob.body.setSize(10, 24, 3, 8);
        rob.body.gravity.y = 800;
        rob.body.bounce.y = 0;
        rob.animations.play('walk', 14);

        // Text
        titleText.push(game.add.bitmapText(game.width / 2, game.height / 4, 'SullyVerge', 'Energy Runner', 64));
        initSprite(titleText[0], [0.5, 0.5]);
        titleText.push(game.add.bitmapText(game.width / 2, game.height / 2 + 16, 'SullyVerge', 'Press SPACE to start', 16));
        initSprite(titleText[1], [0.5, 0.5]);

        // Rob animation
        // Crouch
        titleInterval1 = setInterval(function() {
            rob.animations.play('walk');
            var randnb = Math.random();
            if (randnb < 0.2) {
                rob.animations.play('crouch');
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
            titleText[1].alpha = 1 - titleText[1].alpha;
        }, 500);

    },

    update: function() {

        if (spaceKey.isDown) {
            cleanTitle();
            game.state.start("menu");
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

    }
}

function cleanTitle() {
    clearInterval(titleInterval1);
    clearInterval(titleInterval2);
    titleText = [];
}