var text1 = "In year 2064, a robot works in a nuclear plant.";
var text2 = "But one day, the nuclear plant explosed,\ndestroying every life on the planet\nbut the robot.";
var text3 = "He must collect uranium to power his radio,\nhis only hope of finding someone.";


var introState = {
    create: function() {

        game.stage.backgroundColor = "#000000";

        bitmapText1 = game.add.bitmapText(game.width / 2, game.height / 2 - 64, "SullyVerge", text1, 16);
        initSprite(bitmapText1, [0.5, 0.5]);
        bitmapText1.alpha = 0;
        game.add.tween(bitmapText1).to({
            y: bitmapText1.y - 16,
            alpha: 1
        }, 1000, Phaser.Easing.Cubic.InOut, true, 1000);

        bitmapText2 = game.add.bitmapText(game.width / 2, game.height / 2, "SullyVerge", text2, 16);
        bitmapText2.align = "center";
        initSprite(bitmapText2, [0.5, 0.5]);
        bitmapText2.alpha = 0;
        game.add.tween(bitmapText2).to({
            y: bitmapText2.y - 16,
            alpha: 1
        }, 1000, Phaser.Easing.Cubic.InOut, true, 3000);

        bitmapText3 = game.add.bitmapText(game.width / 2, game.height / 2 + 64, "SullyVerge", text3, 16);
        bitmapText3.align = "center";
        initSprite(bitmapText3, [0.5, 0.5]);
        bitmapText3.alpha = 0;
        game.add.tween(bitmapText3).to({
            y: bitmapText3.y - 16,
            alpha: 1
        }, 1000, Phaser.Easing.Cubic.InOut, true, 5000);
    },

    update: function() {
        if (spaceKey.isDown) {
            var tween = game.add.tween(bitmapText1).to({
                alpha: 0
            }, 1000, Phaser.Easing.Cubic.InOut, true);
            game.add.tween(bitmapText2).to({
                alpha: 0
            }, 1000, Phaser.Easing.Cubic.InOut, true);
            game.add.tween(bitmapText3).to({
                alpha: 0
            }, 1000, Phaser.Easing.Cubic.InOut, true);
            tween.onComplete.add(function() {
                game.state.start('menu');
            })
        }
    }
}