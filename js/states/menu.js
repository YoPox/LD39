var levelSelector = 0;
var nbLevel = 3;
var moving = false;
var levelNames = ["Niveau 1", "Niveau 2", "Niveau 3"];
var platformPosition = [
    [36, 59],
    [39, 86],
    [61, 100],
    [126, 107],
    [167, 98],
    [203, 70],
    [136, 46],
    [113, 53]
];
// roads[i] indique ou l'on va en apuyant sur up, down, left, right
var roads = [
    [-1, 1, -1, 1],
    [0, 2, 0, 2],
    [1, 3, 1, 3],
    [-1, -1, 2, 4],
    [5, 3, 3, 5],
    [6, 4, -1, -1],
    [-1, -1, 7, 5],
    [-1, -1, -1, 6]
];
var robot;

var menuState = {

    create: function() {

        background = game.add.sprite(0, 0, "menuBackground");
        background.scale.x = 2;
        background.scale.y = 2;

        levelNameText = game.add.bitmapText(10, 10, 'SullyVerge', levelNames[levelSelector - 1])
        initSprite(levelNameText, [0, 0])

        robot = game.add.sprite(platformPosition[levelSelector][0] * 2, platformPosition[levelSelector][1] * 2, "robot", 0); // 15
        initSprite(robot, [0.5, 1]);

    },

    update: function() {
        if (spaceKey.isDown) {
            start();
        }
        if (!moving && (rightKey.isDown || leftKey.isDown || upKey.isDown || downKey.isDown)) {
            key = 0;
            if (downKey.isDown) {
                key = 1;
            } else if (leftKey.isDown) {
                key = 2;
            } else if (rightKey.isDown) {
                key = 3;
            }
            if (roads[levelSelector][key] != -1 && !moving) {
                newLevelSelector = roads[levelSelector][key];
                moving = true;
                tween = game.add.tween(robot).to({
                    x: robot.x + (platformPosition[newLevelSelector][0] - platformPosition[levelSelector][0]) * 2,
                    y: robot.y + (platformPosition[newLevelSelector][1] - platformPosition[levelSelector][1]) * 2
                }, 250, Phaser.Easing.Cubic.InOut, true);
                levelSelector = newLevelSelector;
                tween.onComplete.add(stopMoving);
            }
        }
    }

}

function start() {
    game.state.start("play");
}

function stopMoving() {
    moving = false;
}