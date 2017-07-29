// Music
var music = new ChiptuneJsPlayer(new ChiptuneJsConfig(-1));

// Game
var config = {
    width: 512,
    height: 288,
    renderer: Phaser.CANVAS,
    antialias: false,
    multiTexture: true
}

var game = new Phaser.Game(config);

// game.scale.setUserScale(2, 2);

game.state.add("load", loadState);
game.state.add("mainTitle", mainTitleState);
game.state.add("play", playState);

game.state.start("load");
