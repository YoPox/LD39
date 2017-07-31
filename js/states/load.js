var storage = {};
var sfx = [];

var loadState = {

    preload: function() {

        game.load.spritesheet("robot", "../../assets/sprites/robot.png", 16, 32);
        game.load.spritesheet("uranium", "../../assets/sprites/uranium.png", 16, 16);
        game.load.spritesheet("steam", "../../assets/sprites/steam.png", 16, 32);
        game.load.spritesheet("foes", "../../assets/sprites/foes.png")
        game.load.spritesheet("tutoScreens_jump", "../../assets/sprites/tuto_jump.png", 64, 32);
        game.load.spritesheet("tutoScreens_crouch", "../../assets/sprites/tuto_crouch.png", 64, 32);
        game.load.spritesheet("tutoScreens_forward", "../../assets/sprites/tuto_forward.png", 64, 32);
        game.load.spritesheet("tutoScreens_backward", "../../assets/sprites/tuto_backward.png", 64, 32);
        game.load.tilemap('titleMap', '../../assets/maps/title.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map0', '../../assets/maps/map0.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map1', '../../assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map2', '../../assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map3', '../../assets/maps/map3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', '../../assets/sprites/tileset.png');
        game.load.image('background', '../../assets/sprites/background.png');
        game.load.image('backerground', '../../assets/sprites/backerground.png');
        game.load.binary('title', '../../assets/music/title.xm', binaryLoadCallback, this);
        game.load.image('counter', '../../assets/sprites/counter.png');
        game.load.bitmapFont('SullyVerge', '../../assets/font/SullyVerge_0.png', '../../assets/font/SullyVerge.fnt');
        game.load.image("menuBackground", '../../assets/sprites/island.png');
        game.load.audio('sfx_jump', '../../assets/music/sfx_jump.ogg');
        game.load.audio('sfx_crouch', '../../assets/music/sfx_crouch.ogg');

        if (window.localStorage['LD39']) {
            storage = JSON.parse(window.localStorage['LD39']);
        } else {
            scores = [];
            for (var i = 0; i < roads.length; i++) {
                scores.push([0, false]);
            }
            storage['scores'] = scores;
            storage['progression'] = 0;
        }
    },

    create: function() {

        sfx.push(game.add.audio('sfx_jump'));
        sfx.push(game.add.audio('sfx_crouch'));
        for (var sfx_item in sfx) {
            sfx_item.volume = 0.4;
        }


        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        game.state.start("title");

    }

};

function binaryLoadCallback(key, data) {
    return new Uint8Array(data);
}