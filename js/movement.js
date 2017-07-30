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
            checkDeath.dead = true;
            scrollSprite.body.velocity.x = 0.0001; // not 0 to not trigger the checkEnd function
            setTimeout(function() {
                cleanPlay();
                game.state.start("menu");
            }, 1000);
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
            setTimeout(function() {
                cleanPlay();
                game.state.start("menu");
            }, 4000);
        }
    } else {
        checkEnd.ended = false;
    }
}

function crouch() {
    if (downKey.isDown) {
        isCrouching = true;
        rob.animations.play('crouch');
        rob.body.setSize(10, 14, 3, 18); //14 instead of 16 to be able to fit on 1 square high passages in a wall while falling
    } else if (isCrouching && !rob.body.blocked.up) {
        isCrouching = false;
        rob.animations.play('walk');
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