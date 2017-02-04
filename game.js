
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });



function preload() {
    game.load.image('sky', 'pics/bg.jpg');
    game.load.image('grid', 'pics/grid.png');
    game.load.image('blk_red', 'pics/blk_red.png');
    game.load.image('blk_green', 'pics/blk_green.png');
    game.load.image('blk_blue', 'pics/blk_blue.png');
    game.load.image('blk_gold', 'pics/blk_gold.png');
    game.load.image('blk_purple', 'pics/blk_purple.png');
    game.load.image('blk_grey', 'pics/blk_grey.png');
    
    
    
    
    
    
    
    
    //game.load.image('ground', 'assets/platform.png');
    //game.load.image('star', 'assets/star.png');
    //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    
}

function create() {
    
    game.world.setBounds(0, 0, 800, 600);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');
    game.gridsprite = game.add.sprite(200,50, 'grid');
    
    game.add.sprite(220,100, 'blk_red');
    game.add.sprite(220,125, 'blk_red');
    game.add.sprite(220,150, 'blk_red');
    game.add.sprite(220,175, 'blk_red');
    
    game.add.sprite(270,100, 'blk_green');
    game.add.sprite(295,100, 'blk_green');
    game.add.sprite(295,125, 'blk_green');
    game.add.sprite(320,125, 'blk_green');
    
    
    game.grid = new Grid(20,10);
    game.grid.squares[1][7].setValue(Square.GOLD);
    
    game.currentpiece = new TPiece();
    var p = game.currentpiece;
    
    
    
    console.log(game.grid.isLineEmpty(1));
    
    game.cursors = game.input.keyboard.createCursorKeys();
    
    game.input.keyboard.onUpCallback = function( e ) {
        if(e.keyCode == Phaser.Keyboard.UP){
            game.currentpiece.rotateLeft();
        }
        if(e.keyCode == Phaser.Keyboard.LEFT){
            game.currentpiece.moveLeft();
        }
    }
    
    
    
}

function update() {
    
    //if (game.cursors.up.isDown)
    //{
    //    game.currentpiece.rotateLeft();
    //}
    
    
}