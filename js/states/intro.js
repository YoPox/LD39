var text1 = "In the near future, Rob is a robot in a nuclear plant.\nHe has to bring to the reactor uranium to power it.";
var text2 = "But one day, the nuclear plant explosed, destroying every life on the planet, except Rob.";
var text3 = "To keep ";


var introState = {
  create: function() {
    console.log('Intro');

    game.stage.backgroundColor = "#000000";

    bitmapText1 = game.add.bitmapText(game.width / 2, game.height * 0.1 + 16, "SullyVerge", text1, 16);
    initSprite(bitmapText1, [0.5, 0]);
    bitmapText1.alpha = 0;
    game.add.tween(bitmapText1).to({
      y: bitmapText1.y - 16,
      alpha: 1
    }, 1000, Phaser.Easing.Cubic.InOut, true, 1000);

    bitmapText2 = game.add.bitmapText(game.width / 2, game.height * 0.4 + 16, "SullyVerge", text2, 16);
    initSprite(bitmapText2, [0.5, 0]);
    bitmapText2.alpha = 0;
    game.add.tween(bitmapText2).to({
      y: bitmapText2.y - 16,
      alpha: 1
    }, 1000, Phaser.Easing.Cubic.InOut, true, 3000);

    bitmapText3 = game.add.bitmapText(game.width / 2, game.height * 0.7 + 16, "SullyVerge", text3, 16);
    initSprite(bitmapText3, [0.5, 0]);
    bitmapText3.alpha = 0;
    game.add.tween(bitmapText3).to({
      y: bitmapText3.y - 16,
      alpha: 1
    }, 1000, Phaser.Easing.Cubic.InOut, true, 5000);
  },

  update: function() {
    if (spaceKey.isDown) {
      game.state.start('menu');
    }
  }
}
