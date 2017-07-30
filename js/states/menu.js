var levelSelector = 1;
var nbLevel = 3;
var keyDown = false;
var helpText;
var iconsNumbers = [];
var iconsCircles = [];

var menuState = {

  create: function() {

    game.stage.backgroundColor = "#0a0a26";

    helpText = game.add.bitmapText(game.width / 2, game.height / 3 * 2, 'SullyVerge', 'press [SPACE] to select', 16);
    initSprite(helpText, [0.5, 0.5]);

    iconsNumbers = [];
    iconsCircles = [];

    for (var i = 1; i <= nbLevel; i++) {
      ico = game.add.bitmapText(- game.width / (2*nbLevel) + i * game.width / nbLevel, game.height / 3, 'SullyVerge', '' + i, 16);
      initSprite(ico, [0.5, 0.5]);
      iconsNumbers.push(ico);

      cirIco = game.add.sprite(ico.x, ico.y, 'circle_icons',  0);
      initSprite(cirIco, [0.5, 0.5])
      iconsCircles.push(cirIco);
    }

  console.log(levelSelector);

  iconsCircles[levelSelector -1].frame = 1;

  },

  update: function() {
    if (spaceKey.isDown){
      start();
    }
    if (rightKey.isDown && !keyDown){
      keyDown = true;
      if (levelSelector != nbLevel ) {
        iconsCircles[levelSelector-1].frame = 0;
        levelSelector++;
        iconsCircles[levelSelector-1].frame = 1;
      }
    }
    if (leftKey.isDown && !keyDown){
      keyDown = true
      if (levelSelector > 1) {
        iconsCircles[levelSelector-1].frame = 0;
        levelSelector--;
        iconsCircles[levelSelector-1].frame = 1;
      }
    }
    if (!leftKey.isDown && !rightKey.isDown && keyDown) {
      keyDown = false;
    }
  }

}

function start() {
    game.state.start("play");
}
