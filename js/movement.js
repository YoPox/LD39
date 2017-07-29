
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

function recall() {
    rob.body.velocity.x = (scrollSprite.x - rob.x - eqPos)*1.5;
}

function checkDeath() {
    if (scrollSprite.x - rob.x > 300 || rob.y > 310) { //310 and not 288 which is the screen height
        scrollSprite.body.velocity.x = 0;
    }
}
