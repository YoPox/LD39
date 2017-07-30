var titleState = {

  create: function() {

    game.stage.backgroundColor = "#0a0a26";

    titleText = game.add.bitmapText(game.width / 2, game.height / 2, 'SullyVerge', 'Titre', 16);
    initSprite(titleText, [0.5, 0.5]);

  },

  update: function() {

    if (spaceKey.isDown) {
      game.state.start("menu")
    }
  }
}
