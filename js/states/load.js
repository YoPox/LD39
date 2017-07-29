var loadState = {

    preload: function() {

        game.load.spritesheet("robot", "../../assets/sprites/robot.png", 16, 64);
        game.load.spritesheet("uranium", "../../assets/sprites/uranium.png", 16, 16);
        game.load.tilemap('map1', '../../assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', '../../assets/sprites/tileset.png');

        game.load.binary('title', '../../assets/music/title.xm', binaryLoadCallback, this);
        // game.load.audio('audio_sprint', 'assets/audio/bruitages/sprint.ogg');
    },

    create: function() {

        // audio_sprint = game.add.audio('audio_sprint');
        // audio_sprint.volume = 0.45;

        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);

        game.state.start("play");

    }

};

function binaryLoadCallback(key, data) {
    return new Uint8Array(data);
}
