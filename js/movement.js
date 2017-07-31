function jump() {
    //initialize the static variables
    if (typeof jump.canJump == 'undefined') {
        jump.canJump = true;
    }
    if (typeof jump.justJumped == 'undefined') {
        jump.justJumped = false;
    }
    if (typeof jump.isJumping == 'undefined') {
        jump.isJumping = false;
    }

    if (rob.body.blocked.down) { //if on the ground
        jump.canJump = true;
        jump.justJumped = true; //false but this is a workaround
    } else {
        if (jump.justJumped) {
            jump.justJumped = false;
            if (spaceKey.isDown)
                sfx[0].play(false);
            setTimeout(function() {
                jump.canJump = false;
            }, isCrouching ? 50 : 220);
        }
    }
    if (jump.canJump && spaceKey.isDown) {
        rob.body.velocity.y = -200;
        jump.isJumping = true;
    }
    if (!spaceKey.isDown && jump.isJumping) {
        jump.canJump = false;
    }
}

function checkDeath() {
    if (typeof checkDeath.dead == 'undefined') {
        checkDeath.dead = false;
    }
    if (rob.alive && (scrollSprite.x - rob.x > 300 || rob.y > 310)) {
        if (!checkDeath.dead) {
            checkDeath.dead = true;
            end(true, true);
        }
    } else {
        checkDeath.dead = false;
    }
}

function checkEnd() {
    if (typeof checkEnd.ended == 'undefined') {
        checkEnd.ended = false;
    }
    if (rob.alive) {
        if (scrollSprite.body.velocity.x == 0) {
            if (!checkEnd.ended) {
                checkEnd.ended = true;
                end();
            }
        } else {
            checkEnd.ended = false;
        }
    }
}

function crouch() {
    if (downKey.isDown) {
        isCrouching = true;
        rob.body.setSize(10, 14, 3, 18);
    } else if (isCrouching && canStand) {
        isCrouching = false;
        rob.animations.play('standing');
        setTimeout(function() {
            if (!downKey.isDown) {
                rob.animations.play('walk');
            }
        }, 125);
        rob.body.setSize(10, 24, 3, 8);
    }
}

function move() {
    if (rightKey.isDown) {
        eqPos = 0;
    } else if (leftKey.isDown) {
        eqPos = 90;
    } else {
        eqPos = 45;
    }
}

function recall() {
    if (rob.alive)
        rob.body.velocity.x = (scrollSprite.x - rob.x - eqPos) * 1.5;
}

function end(dead = false, fall = false) {

    // Sauvegarde de la progression
    if (storage['scores'][levelSelector][0] < uraniumCount) {
        storage['scores'][levelSelector][0] = uraniumCount;
        window.localStorage.setItem('LD39', JSON.stringify(storage));
    }

    if (!dead) {

        // Jingle fin du niveau
        setTimeout(function() {
            music.stop();
            sfx[4].play(false);
        }, 1000);

        // On débloque un niveau
        if (storage['progression'] <= levelSelector) {
            setTimeout(function() {
                sfx[8].play(false);
            }, 2750);
            storage['progression'] = levelSelector + 1;
            window.localStorage.setItem('LD39', JSON.stringify(storage));
        }

    } else {

        rob.alive = false;
        scrollSprite.body.velocity.x = 0;
        sfx[3].play(false);

        if (!fall) {
            rob.body.setSize(0, 0);
            rob.body.velocity.y = -300;
            rob.body.velocity.x = 50;
        }

    }

    // Retour au menu
    graphics = game.add.graphics(0, 0);
    graphics.fixedToCamera = true;
    transition.active = true;
    setTimeout(function() {
        game.add.tween(transition).to({
            radius: 0
        }, 1000, Phaser.Easing.Cubic.In, true);
    }, 500);

    setTimeout(function() {
        cleanPlay();
        game.state.start("menu");
    }, 3000);

}