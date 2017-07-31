// Fonctions utiles sur les sprites

function initSprite(sprite, anchor, scale = [1, 1]) {
    sprite.anchor.x = anchor[0];
    sprite.anchor.y = anchor[1];
    sprite.scale.x = scale[0];
    sprite.scale.y = scale[1];
}

function collectUranium(sprite, ura) {
    uraniumCount++;
    sfx[2].play(false);
    if (uraniumCount < 10) {
        gui[1].text = 'x0' + uraniumCount;
    } else {
        gui[1].text = 'x' + uraniumCount;
    }
    ura.kill();
}