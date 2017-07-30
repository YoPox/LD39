// Fonctions utiles sur les sprites

function initSprite(sprite, anchor) {
    sprite.anchor.x = anchor[0];
    sprite.anchor.y = anchor[1];
}

function collectUranium(sprite, ura) {
    uraniumCount++;
    if (uraniumCount < 10) {
        gui[1].text = 'x0' + uraniumCount;
    } else {
        gui[1].text = 'x' + uraniumCount;
    }
    ura.kill();
}