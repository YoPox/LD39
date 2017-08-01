var levelSelector = 0;
var levelSprites = [];
var moving = false;
var robot;
var levelNameText;
var levelScoresText;
var uraniumIcon;
var goldIcon;

var menuState = {

    create: function() {

        cleanMenu();

        var buffer = game.cache.getBinary('bgm_menu');
        music.play(buffer);

        background = game.add.sprite(0, 0, "menuBackground");
        background.scale.x = 2;
        background.scale.y = 2;

        levelNameText = game.add.bitmapText(160, 32, 'SullyVerge', levelNames[levelSelector])
        initSprite(levelNameText, [0.5, 0.5])

        for (var i = 0; i < platformPosition.length; i++) {
            levelSprites.push(game.add.sprite(2 * platformPosition[i][0] - 10, 2 * platformPosition[i][1] - 10, 'level'));
            levelSprites[i].scale.x = 2;
            levelSprites[i].scale.y = 2;
            if (levelUnlocked(i)) {
                if (storage["scores"][i][0] > 0 && storage["scores"][i][0] == maxUranium[i]) {
                    levelSprites[i].tint = 0xA5D6A7;
                }
            } else {
                levelSprites[i].tint = 0x424242;
            }
        }

        robot = game.add.sprite(platformPosition[levelSelector][0] * 2, platformPosition[levelSelector][1] * 2, "robot", 1);
        robot.animations.add('idle', [0, 1, 2, 1], 3, true);
        robot.animations.play('idle');
        initSprite(robot, [0.5, 0.94], [2, 2]);

        goldIcon = game.add.sprite(game.width - 8, 48, 'barrel', storage["scores"][levelSelector][1] * 1);
        initSprite(goldIcon, [1, 0.5], [2, 2]);

        uraniumIcon = game.add.sprite(game.width - 80, 32, 'uranium', 3);
        initSprite(uraniumIcon, [1, 0.5], [2, 2]);

        levelScoresText = game.add.bitmapText(game.width - 120, 32, 'SullyVerge', '' + storage['scores'][levelSelector][0] + ' / ' + maxUranium[levelSelector]);
        initSprite(levelScoresText, [1, 0.5]);

        graphics = game.add.graphics(0, 0);

        var tween = game.add.tween(transition).to({
            radius: 512
        }, 800, Phaser.Easing.Cubic.Out, true);
        tween.onComplete.add(function() {
            transition.active = false;
        });
    },

    update: function() {

        pauseMusic();

        if (!transition.active) {
            if (spaceKey.isDown) {
                start();
            }

            if (!moving && (rightKey.isDown || leftKey.isDown || upKey.isDown || downKey.isDown)) {
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
                    sfx[6].play(false);
                    newLevelSelector = roads[levelSelector][key];
                    moving = true;
                    var tween = game.add.tween(robot).to({
                        x: robot.x + (platformPosition[newLevelSelector][0] - platformPosition[levelSelector][0]) * 2,
                        y: robot.y + (platformPosition[newLevelSelector][1] - platformPosition[levelSelector][1]) * 2
                    }, 400, Phaser.Easing.Cubic.Out, true);
                    levelSelector = newLevelSelector;
                    // Text update
                    if (levelUnlocked(levelSelector)) {
                        levelScoresText.text = '' + storage['scores'][levelSelector][0] + ' / ' + maxUranium[levelSelector];
                    } else {
                        levelScoresText.text = "Locked";
                    }
                    levelNameText.text = levelNames[levelSelector];
                    goldIcon.frame = storage["scores"][levelSelector][1] * 1;
                    tween.onComplete.add(stopMoving);
                }
            }

        } else { drawPolygonTransition(); }

    }

}

function start() {
    if (storage['progression'] >= levelSelector) {
        sfx[7].play(false);
        stopMoving();
        transition.active = true;
        transition.type = 1;
        transition.radius = 0;
        var tween = game.add.tween(transition).to({
            radius: 1024
        }, 600, Phaser.Easing.Cubic.Out, true);
        tween.onComplete.add(function() {
            game.state.start("play");
            setTimeout(function() {
                cleanMenu();
            }, 100);
        });
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
    graphics.kill();
}

function levelUnlocked(i) {
    if (storage['progression'] < i) {
        return false;
    }
    if (i == 6) {
        for (var i = 0; i < 5; i++) {
            if (storage['scores'][i][0] < maxUranium[i]) {
                return false;
            }
        }
    } else if (i == 7) {
        for (var i = 0; i < 6; i++) {
            if (storage['scores'][i][0] < maxUranium[i] | !(storage['scores'][i][1])) {
                return false;
            }
        }
    }
    return true;
}