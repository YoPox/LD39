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

function tuto() {
    var tutoScreens_jump = game.add.group();
    var tutoScreens_crouch = game.add.group();
    var tutoScreens_forward = game.add.group();
    var tutoScreens_backward = game.add.group();
    tutoGroup = game.add.group();
    tutoGroup.addMultiple([tutoScreens_jump, tutoScreens_crouch, tutoScreens_backward, tutoScreens_forward]);
    tutoGroup.enableBody = true;
    map.createFromObjects('tuto', 35, 'tutoScreens_jump', 0, true, false, tutoScreens_jump);
    map.createFromObjects('tuto', 36, 'tutoScreens_crouch', 0, true, false, tutoScreens_crouch);
    map.createFromObjects('tuto', 38, 'tutoScreens_forward', 0, true, false, tutoScreens_forward);
    map.createFromObjects('tuto', 37, 'tutoScreens_backward', 0, true, false, tutoScreens_backward);
    tutoScreens_jump.callAll('animations.add', 'animations', 'idle', [0, 1, 2], 2, true);
    tutoScreens_jump.callAll('animations.play', 'animations', 'idle');
    tutoScreens_crouch.callAll('animations.add', 'animations', 'idle', [0, 1, 2], 2, true);
    tutoScreens_crouch.callAll('animations.play', 'animations', 'idle');
    tutoScreens_forward.callAll('animations.add', 'animations', 'idle', [0, 1, 2], 2, true);
    tutoScreens_forward.callAll('animations.play', 'animations', 'idle');
    tutoScreens_backward.callAll('animations.add', 'animations', 'idle', [0, 1, 2], 2, true);
    tutoScreens_backward.callAll('animations.play', 'animations', 'idle');
}

function updateFallingFoe(f) {
    if (f.x - 90 < rob.x) {
        f.body.gravity.y = 200;
    }
}

function explodeFallingFoe(f) {
    f.animations.play('breaking');
    f.body.enable = false;
    f.animations.currentAnim.onComplete.add(function() {
        f.visible = false;
    }, this);
}

function collisionFoeRob(r, f) {
    f.animations.play('breaking');
    f.body.enable = false;
    f.animations.currentAnim.onComplete.add(function() {
        f.visible = false;
    }, this);
    if (r.alive) {
        end(true);
    }
}

function drawPolygonTransition() {

    if (transition.active) {

        graphics.clear();
        graphics.beginFill(0x000000);
        graphics.drawPolygon([
            [-transition.radius, game.height / 2],
            [0, 0],
            [game.width / 2, -transition.radius],
            [game.width / 2, game.height / 2 - transition.radius],
            [game.width / 2 - transition.radius, game.height / 2]
        ]);

        graphics.drawPolygon([
            [-transition.radius, game.height / 2],
            [0, game.height],
            [game.width / 2, game.height + transition.radius],
            [game.width / 2, game.height / 2 + transition.radius],
            [game.width / 2 - transition.radius, game.height / 2]
        ]);

        graphics.drawPolygon([
            [game.width + transition.radius, game.height / 2],
            [game.width, 0],
            [game.width / 2, -transition.radius],
            [game.width / 2, game.height / 2 - transition.radius],
            [game.width / 2 + transition.radius, game.height / 2]
        ]);

        graphics.drawPolygon([
            [game.width + transition.radius, game.height / 2],
            [game.width, game.height],
            [game.width / 2, game.height + transition.radius],
            [game.width / 2, game.height / 2 + transition.radius],
            [game.width / 2 + transition.radius, game.height / 2]
        ]);

        graphics.endFill();
    }
}