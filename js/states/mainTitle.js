var mainTitleState = {

  create: function() {

    game.stage.backgroundColor = "#0a0a26";

    var title = game.add.sprite(512 / 2, 288 / 2, 'title_png');
    initSprite(title, [0.5, 0.5]);
    title.scale.x = 2;
    title.scale.y = 2;

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
