var levelSelector = 1;
var keyDown = false;
var titleText;

var mainTitleState = {

  create: function() {

    game.stage.backgroundColor = "#0a0a26";

    titleText = game.add.bitmapText(game.width / 2, game.height / 2, 'SullyVerge', 'Load level 1', 16);
    initSprite(titleText, [0.5, 0.5]);

  },

  update: function() {
    if (spaceKey.isDown){
      game.state.start("play");
    }
    if (upKey.isDown && !keyDown){
      keyDown = true;
      levelSelector++;
      titleText.text = "Load level " + levelSelector;
    }

    if (downKey.isDown && !keyDown){
      keyDown = true;
      if (levelSelector > 1)
        levelSelector--;
      titleText.text = "Load level " + levelSelector;
    }

    if (!upKey.isDown && !downKey.isDown && keyDown) {
      keyDown = false;
    }
  }

}


function start() {
  game.state.start("play")
}
