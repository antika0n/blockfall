
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
    game.load.image('bottom', 'pics/bottom.png');
    
    
    
    
    
    
    
    //game.load.image('ground', 'assets/platform.png');
    //game.load.image('star', 'assets/star.png');
    //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    
}

function create() {
    
    game.world.setBounds(0, 0, 800, 600);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');
    game.gridsprite = game.add.sprite(265,40, 'grid');
    
    game.grid = new Grid(10,20);
 
    
    game.piecegroup = game.add.group();
    game.piecegroup.enableBody = true;
    
    game.gridgroup = game.add.group();
    game.gridgroup.enableBody = true;
    game.bottomsprite = game.gridgroup.create(game.gridsprite.x+10, game.gridsprite.height +game.gridsprite.y- 10, 'bottom');
    game.bottomsprite.body.immovable = true;
    game.physics.arcade.enable(game.bottomsprite);
    
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
        if(e.keyCode == Phaser.Keyboard.RIGHT){
            game.currentpiece.moveRight();
        }
    }
    
    
    
}

function update() {
    game.physics.arcade.collide(game.piecegroup, game.gridgroup);
    //game.physics.arcade.collide(game.piecegroup, game.piecegroup);
    //if (game.cursors.up.isDown)
    //{
    //    game.currentpiece.rotateLeft();
    //}
    
    
}