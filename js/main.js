// Music
var music = new ChiptuneJsPlayer(new ChiptuneJsConfig(-1));

// Game
var game = new Phaser.Game(1024, 576, Phaser.CANVAS, "game");

game.state.add("load", loadState);
game.state.add("play", playState);

game.state.start("load");
