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

game.state.add("load", loadState);
game.state.add("menu", menuState);
game.state.add("play", playState);
game.state.add("title", titleState);
game.state.add("intro", introState);

game.state.start("load");
