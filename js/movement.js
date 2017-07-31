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
        checkDeath.dead = false; // used to prevent the timeout function from being called every frame for a few seconds...
    }
    if (scrollSprite.x - rob.x > 300 || rob.y > 310) { //310 and not 288 which is the screen height
        if (!checkDeath.dead) {
            sfx[3].play(false);
            checkDeath.dead = true;
            scrollSprite.body.velocity.x = 0.0001; // not 0 to not trigger the checkEnd function
            end(true);
        }
    } else {
        checkDeath.dead = false;
    }
}

function checkEnd() {
    if (typeof checkEnd.ended == 'undefined') {
        checkEnd.ended = false; // used to prevent the timeout function from being called every frame for a few seconds...
    }
    if (scrollSprite.body.velocity.x == 0) {
        if (!checkEnd.ended) {
            checkEnd.ended = true;
            end();
        }
    } else {
        checkEnd.ended = false;
    }
}

function crouch() {
    if (downKey.isDown) {
        isCrouching = true;
        rob.body.setSize(10, 14, 3, 18); //14 instead of 16 to be able to fit on 1 square high passages in a wall while falling
    } else if (isCrouching && canStand) {
        isCrouching = false;
        rob.animations.play('standing');
        setTimeout(function () {
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
    rob.body.velocity.x = (scrollSprite.x - rob.x - eqPos) * 1.5;
}

function end(dead = false) {
    setTimeout(function() {
        cleanPlay();
        game.state.start("menu");
    }, 4000);
    if (storage['scores'][levelSelector][0] < uraniumCount) {
        storage['scores'][levelSelector][0] = uraniumCount;
        window.localStorage.setItem('LD39', JSON.stringify(storage));
    }
    if (!dead) {
        setTimeout(function() {
            sfx[4].play(false);
        }, 1000);
        if (storage['progression'] <= levelSelector) {
            setTimeout(function() {
                sfx[8].play(false);
            }, 4000);
            storage['progression'] = levelSelector + 1;
            window.localStorage.setItem('LD39', JSON.stringify(storage));
        }
    }
}
