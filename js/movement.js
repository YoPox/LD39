
function jump() {
    //initialize the static variables
    if ( typeof jump.canJump == 'undefined' ) {
        jump.canJump = true;
    }
    if ( typeof jump.justJumped == 'undefined' ) {
        jump.justJumped = false;
    }
    if ( typeof jump.isJumping == 'undefined' ) {
        jump.isJumping = false;
    }

    if (rob.body.blocked.down) { //if on the ground
        jump.canJump = true;
        jump.justJumped = true; //false but this is a workaround
    } else {
        if (jump.justJumped) {
            jump.justJumped = false;
            setTimeout(function () {
                jump.canJump = false;
            }, 220);
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
    if (scrollSprite.x - rob.x > 300 || rob.y > 310) { //310 and not 288 which is the screen height
        scrollSprite.body.velocity.x = 0;
    }
}

function crouch() {
    if (downKey.isDown) {
        isCrouching = true;
        rob.frame = 1;
        rob.body.setSize(10, 14, 3, 16); //14 instead of 16 to be able to fit on 1 square high passages in a wall while falling
    } else if (isCrouching && !rob.body.blocked.up) {
        rob.frame = 0;
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
    rob.body.velocity.x = (scrollSprite.x - rob.x - eqPos)*1.5;
}
