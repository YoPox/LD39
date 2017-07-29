// Fonctions utiles sur les sprites

function initSprite(sprite, anchor, scale) {
  sprite.smoothed = false;
  sprite.anchor.x = anchor[0];
  sprite.anchor.y = anchor[1];
  sprite.scale.x = scale[0];
  sprite.scale.y = scale[1];
}

function initLayer(layer) {
  layer.smoothed = false;
  layer.scale.x = 2;
  layer.scale.y = 2;
  layer.resizeWorld();
}
