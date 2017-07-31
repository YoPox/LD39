var storage = {};
var sfx = [];

var loadState = {

    preload: function() {

        game.load.binary('title', '../../assets/music/title.xm', binaryLoadCallback, this);
        game.load.bitmapFont('SullyVerge', '../../assets/font/SullyVerge_0.png', '../../assets/font/SullyVerge.fnt');
        game.load.spritesheet("robot", "../../assets/sprites/robot.png", 16, 32);
        game.load.spritesheet("uranium", "../../assets/sprites/uranium.png", 16, 16);
        game.load.spritesheet("barrel", "../../assets/sprites/barrel.png", 32, 32);
        game.load.spritesheet("steam", "../../assets/sprites/steam.png", 16, 32);
        game.load.spritesheet("fallingRock", "../../assets/sprites/fallingRock.png", 16, 16);
        game.load.spritesheet("lock", "../../assets/sprites/lock.png", 32, 32);
        game.load.spritesheet("Ucell", "../../assets/sprites/Ucell.png", 32, 16);
        game.load.spritesheet("tutoScreens_jump", "../../assets/sprites/tuto_jump.png", 64, 32);
        game.load.spritesheet("tutoScreens_crouch", "../../assets/sprites/tuto_crouch.png", 64, 32);
        game.load.spritesheet("tutoScreens_forward", "../../assets/sprites/tuto_forward.png", 64, 32);
        game.load.spritesheet("tutoScreens_backward", "../../assets/sprites/tuto_backward.png", 64, 32);
        game.load.tilemap('titleMap', '../../assets/maps/title.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map0', '../../assets/maps/map0.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map1', '../../assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map2', '../../assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map3', '../../assets/maps/map3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('tiles', '../../assets/sprites/tileset.png', 16, 16);
        game.load.image('background', '../../assets/sprites/background.png');
        game.load.image('backerground', '../../assets/sprites/backerground.png');
        game.load.image('counter', '../../assets/sprites/counter.png');
        game.load.image("menuBackground", '../../assets/sprites/island.png');
        game.load.image("level", '../../assets/sprites/level.png');
        game.load.image('foes', '../../assets/sprites/foes.png');
        game.load.audio('sfx_jump', '../../assets/music/sfx_jump.ogg');
        game.load.audio('sfx_crouch', '../../assets/music/sfx_crouch.ogg');
        game.load.audio('sfx_uranium', '../../assets/music/sfx_uranium.ogg');
        game.load.audio('sfx_dying', '../../assets/music/sfx_dying.ogg');
        game.load.audio('sfx_finish', '../../assets/music/sfx_finish.ogg');
        game.load.audio('sfx_gold', '../../assets/music/sfx_gold.ogg');
        game.load.audio('sfx_move', '../../assets/music/sfx_move.ogg');
        game.load.audio('sfx_select', '../../assets/music/sfx_select.ogg');
        game.load.audio('sfx_unlock', '../../assets/music/sfx_unlock.ogg');

        if (window.localStorage['LD39']) {
            storage = JSON.parse(window.localStorage['LD39']);
        } else {
            scores = [];
            for (var i = 0; i < platformPosition.length; i++) {
                scores.push([0, false]);
            }
            storage['scores'] = scores;
            storage['progression'] = 0;
        }
    },

    create: function() {

        sfx.push(game.add.audio('sfx_jump'));
        sfx.push(game.add.audio('sfx_crouch'));
        sfx.push(game.add.audio('sfx_uranium'));
        sfx.push(game.add.audio('sfx_dying'));
        sfx.push(game.add.audio('sfx_finish'));
        sfx.push(game.add.audio('sfx_gold'));
        sfx.push(game.add.audio('sfx_move'));
        sfx.push(game.add.audio('sfx_select'));
        sfx.push(game.add.audio('sfx_unlock'));
        for (var i = 0; i < sfx.length; i++) {
            sfx[i].volume = 0.5;
        }
        sfx[2].volume = 0.3;


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
