window.onload = function(){
    meteorstorm();
};

function meteorstorm(){
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '',{preload:preload, create:create, update:update});
    var SPEED = 0.2;

    var music;
    var crash;

    var keys;

    var text;
    var ship;
    var meteors = [];


    function preload(){
        //define the physics engine(erstmal raus, einfach erklären das ne billige standardphysik im hintergrund verfügbar ist)
        //game.physics.startSystem(Phaser.Physics.ARCADE);

        //laden der Bilder
        game.load.image('background', 'assets/crappyStarfield.png');
        game.load.image('meteor', 'assets/meteor.png');
        game.load.image('spaceship', 'assets/spaceship.png');
        //laden der Sounds
        game.load.audio('music', 'assets/music.mp3');
        game.load.audio('crash', 'assets/crash.ogg');
        //laden des Spritesheets
        game.load.spritesheet('animation', 'assets/animation.png', 90, 95);

    }
    function create(){
        music = game.add.audio('music');
        crash = game.add.audio('crash');
        music.loop = true;
        music.play();
        //dazusagen, reihenfolge ist sehr wichtig
        game.add.sprite(0,0, 'background');

        text = game.add.text(20, 20, "meteorstorm", { font: "25px Arial", fill: "#3debe9", align: "center" });

        ship = game.add.sprite(100, (game.world.height / 2) - 200, 'spaceship');

        keys = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
            down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        };


    }
    function update(){
        //delta time
        var dt = game.time.elapsed;

        //ship movement
        if(keys.up.isDown){
            ship.y -= SPEED*dt;
        }
        if(keys.down.isDown){
            ship.y += SPEED*dt;
        }
        if(keys.right.isDown){
            ship.x += SPEED*dt;
        }
        if(keys.left.isDown){
            ship.x -= SPEED*dt;
        }


        //generieren der meteteore
        if(game.rnd.integerInRange(0,1*dt) === 0){
            meteors.push(createMeteor());
        }

        for(var i = meteors.length-1; i >= 0; i--) {
            meteors[i].update(dt);
            if(!meteors[i].visible){
                meteors.splice(i,1);
            }
        }
    }

    function createMeteor(){
        var meteor = {
            sprite: game.add.sprite(game.world.width, game.rnd.integerInRange(0, game.world.height), 'meteor'),
            update: function(dt){
                this.sprite.x -= SPEED*dt;

                if(this.sprite.x < 0 - this.sprite.width) {
                    this.visible = false;
                    //damit das nicht weiter gezeichnet wird
                    this.sprite.kill();
                }

                if(this.sprite.overlap(ship)){
                    crash.play();
                    this.visible = false;
                    this.sprite.kill();
                    createAnimation(this.sprite.x, this.sprite.y, this.scale)

                }
            },
            scale: (game.rnd.integerInRange(5, 15)*1.0 / 10.0),
            visible: true
        };
        meteor.sprite.scale.x = meteor.scale;
        meteor.sprite.scale.y = meteor.scale;

        return meteor;
    }

    function createAnimation(x, y, scale){
        var explosion = game.add.sprite(x, y,'animation');
        explosion.scale.x = scale;
        explosion.scale.y = scale;
        //sagen das man da auch null reinschreiben könnte
        explosion.animations.add('animation', [0,1,2,3,4,5,6,7]);
        explosion.animations.play('animation', 60, false, true);

    }
}