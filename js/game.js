window.onload = function(){
    meteorstorm();
};

function meteorstorm(){
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '',{preload:preload, create:create, update:update});

    function preload(){
        game.load.image('background', 'assets/crappyStarfield.png');
        game.load.image('meteor', 'assets/meteor.png');
        game.load.image('spaceship', 'assets/spaceship.png');

        game.load.audio('music', 'assets/music.mp3');
        game.load.audio('crash', 'assets/crash.ogg');

        game.load.spritesheet('animation', 'assets/animation.png', 90, 95);
    }
    function create(){

        var music = new Phaser.Sound(game, 'music', 1, true);
        music.autoplay = true;
        music.loop = true;
        music.play();

        game.add.sprite(0,0, 'background');
        game.add.sprite(game.width / 2, game.height / 2, 'spaceship');
    }
    function update(){

    }
}