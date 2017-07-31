var levelSelector = 0;
var levelSprites = [];
var moving = false;
var robot;
var levelNameText;
var levelScoresText;

var menuState = {

    create: function() {

        cleanMenu();

        background = game.add.sprite(0, 0, "menuBackground");
        background.scale.x = 2;
        background.scale.y = 2;

        levelNameText = game.add.bitmapText(32, 32, 'SullyVerge', levelNames[levelSelector])
        initSprite(levelNameText, [0, 0.5])

        for (var i = 0; i < platformPosition.length; i++) {
            levelSprites.push(game.add.sprite(2 * platformPosition[i][0] - 10, 2 * platformPosition[i][1] - 10, 'level'));
            levelSprites[i].scale.x = 2;
            levelSprites[i].scale.y = 2;
            if (i <= storage["progression"]) {
                if (storage["scores"][i][0] > 0 && storage["scores"][i][0] == maxUranium[i]) {
                    levelSprites[i].tint = 0xA5D6A7;
                }
            } else {
                levelSprites[i].tint = 0x424242;
            }
        }

        robot = game.add.sprite(platformPosition[levelSelector][0] * 2, platformPosition[levelSelector][1] * 2, "robot", 15);
        initSprite(robot, [0.5, 0.94]);
        robot.scale.x = 2;
        robot.scale.y = 2;

        levelScoresText = game.add.bitmapText(game.width - 32, 32, 'SullyVerge', '' + storage['scores'][levelSelector][0] + ' / ' + maxUranium[levelSelector])
        initSprite(levelScoresText, [1, 0.5])

    },

    update: function() {
        if (spaceKey.isDown) {
            sfx[7].play(false);
            start();
        }
        if (!moving && (rightKey.isDown || leftKey.isDown || upKey.isDown || downKey.isDown)) {
            sfx[6].play(false);
            key = 0;
            if (downKey.isDown) {
                key = 1;
            } else if (leftKey.isDown) {
                robot.scale.x = -2;
                key = 2;
            } else if (rightKey.isDown) {
                robot.scale.x = 2;
                key = 3;
            }
            if (roads[levelSelector][key] != -1 && !moving) {
                newLevelSelector = roads[levelSelector][key];
                moving = true;
                tween = game.add.tween(robot).to({
                    x: robot.x + (platformPosition[newLevelSelector][0] - platformPosition[levelSelector][0]) * 2,
                    y: robot.y + (platformPosition[newLevelSelector][1] - platformPosition[levelSelector][1]) * 2
                }, 750, Phaser.Easing.Cubic.Out, true);
                levelSelector = newLevelSelector;
                if (storage['progression'] >= levelSelector) {
                    levelScoresText.text = '' + storage['scores'][levelSelector][0] + ' / ' + maxUranium[levelSelector];
                } else {
                    levelScoresText.text = "Blocked";
                }
                levelNameText.text = levelNames[levelSelector];
                tween.onComplete.add(stopMoving);
            }
        }
    }

}

function start() {
    if (storage['progression'] >= levelSelector) {
        stopMoving();
        game.state.start("play");
        setTimeout(function() {
            cleanMenu();
        }, 100);
    }
}

function stopMoving() {
    moving = false;
}

function cleanMenu() {
    for (var i = 0; i < levelSprites.length; i++) {
        levelSprites[i].kill();
    }
    levelSprites = [];
}