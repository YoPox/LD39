var loadState = {

    preload: function() {

        game.load.spritesheet("robot", "../../assets/sprites/robot.png", 16, 32);
        game.load.spritesheet("uranium", "../../assets/sprites/uranium.png", 16, 16);
        game.load.tilemap('map1', '../../assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', '../../assets/sprites/tileset.png');
        game.load.image('background', '../../assets/sprites/background.png');
        // game.load.image('backerground', '../../assets/sprites/backerground.png');
        // game.load.image('foreground', '../../assets/sprites/foreground.png');
        game.load.binary('title', '../../assets/music/title.xm', binaryLoadCallback, this);
        game.load.image('title_png', '../../assets/sprites/titreMain.png');
        game.load.image('button_start_png', '../../assets/sprites/start_button.png');
        game.load.image('counter', '../../assets/sprites/counter.png');
        game.load.bitmapFont('SullyVerge', '../../assets/font/SullyVerge_0.png', '../../assets/font/SullyVerge.fnt');
        // game.load.audio('audio_sprint', 'assets/audio/bruitages/sprint.ogg');
    },

    create: function() {

        // audio_sprint = game.add.audio('audio_sprint');
        // audio_sprint.volume = 0.45;

        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);

        game.state.start("mainTitle");

    }

};

function binaryLoadCallback(key, data) {
    return new Uint8Array(data);
}
