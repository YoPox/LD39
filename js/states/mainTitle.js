var mainTitleState = {

  create: function() {

    game.stage.backgroundColor = "#0a0a26";

    var title = game.add.bitmapText(game.width / 2, game.height / 2, 'SullyVerge', 'Awesome Title', 16);
    initSprite(title, [0.5, 0.5]);

  },

  update: function() {
    if (spaceKey.isDown){
      game.state.start("play");
    }
  }

}


function start() {
  game.state.start("play")
}
