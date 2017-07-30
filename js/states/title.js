var levelSelector = 1;
var keyDown = false;
var titleText = [];
var titleInterval;

var titleState = {

    create: function() {

        // Music playback
        var buffer = game.cache.getBinary('title');
        // music.play(buffer);

        game.stage.backgroundColor = "#181225";
        game.physics.startSystem(Phaser.Physics.ARCADE);

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
        game.physics.arcade.enable(rob);
        rob.body.setSize(10, 24, 3, 8);
        rob.body.gravity.y = 800;
        rob.body.bounce.y = 0;

        titleText.push(game.add.bitmapText(game.width / 2, game.height / 4, 'SullyVerge', 'Energy Runner', 64));
        initSprite(titleText[0], [0.5, 0.5]);
        titleText.push(game.add.bitmapText(game.width / 2, game.height / 2 + 32, 'SullyVerge', 'Press SPACE to start', 16));
        initSprite(titleText[1], [0.5, 0.5]);

        titleInterval = setInterval(function() {
            rob.frame = 0;
            var randnb = Math.random();
            if (randnb < 0.2) {
                rob.frame = 1;
            }
        }, 500);

    },

    update: function() {
        game.physics.arcade.collide(rob, layerGround);

        if (rob.x > 512 - 64) rob.body.velocity.x = -70;
        if (rob.x < 64) rob.body.velocity.x = 70;

        if (spaceKey.isDown) {
            game.state.start("play");
        }
    }

}

function cleanTitle() {
    titleText = [];
    clearInterval(titleInterval);
}