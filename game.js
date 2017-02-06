
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });



function preload() {
    
    game.load.image('sky', 'pics/bg.jpg');
    game.load.image('overlay', 'pics/bgoverlay.png');
    game.load.image('grid', 'pics/grid.png');
    game.load.image('blk_red', 'pics/blk_red.png');
    game.load.image('blk_green', 'pics/blk_green.png');
    game.load.image('blk_blue', 'pics/blk_blue.png');
    game.load.image('blk_gold', 'pics/blk_gold.png');
    game.load.image('blk_purple', 'pics/blk_purple.png');
    game.load.image('blk_darkgrey', 'pics/blk_darkgrey.png');
    game.load.image('blk_grey', 'pics/blk_grey.png');
    game.load.image('bottom', 'pics/bottom.png');
    
    game.load.audio('rotate', 'sounds/rotate.mp3');
    game.load.audio('line', 'sounds/line.mp3');
    
}

function create() {
    
    game.collisionflag = false;
    game.running = true;
    game.currentgravity = 50;
    
    game.world.setBounds(0, 0, 800, 600);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.snd_rotate = game.add.audio('rotate');
    game.snd_line = game.add.audio('line');
    
    game.add.sprite(0, 0, 'sky');
    game.add.sprite(0, 0, 'overlay');
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
    var p = game.currentpiece.setGravity(game.currentgravity);
    
    console.log(game.grid.isLineEmpty(1));
    
    game.cursors = game.input.keyboard.createCursorKeys();
    
    leftkey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightkey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    upkey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downkey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    
    game.input.keyboard.onUpCallback = function( e ) {
        if(e.keyCode == Phaser.Keyboard.DOWN){
            game.currentpiece.setGravity(1750);
        }
        if(e.keyCode == Phaser.Keyboard.LEFT){
            //game.currentpiece.moveLeft();
        }
        if(e.keyCode == Phaser.Keyboard.RIGHT){
            //game.currentpiece.moveRight();
        }
    }
    
    
}

function update() {
    game.physics.arcade.collide(game.piecegroup, game.gridgroup);
    
    if (leftkey.isDown) {
        if (leftkey.duration > leftkey.next) {
            leftkey.next = leftkey.duration + 125;
            game.currentpiece.moveLeft();
            
        }
    } else if (leftkey.isUp) {
        leftkey.next = 0;
    }
    
    if (rightkey.isDown) {
        if (rightkey.duration > rightkey.next) {
            rightkey.next = rightkey.duration + 125;
            game.currentpiece.moveRight();
            
        }
    } else if (rightkey.isUp) {
        rightkey.next = 0;
    }
    
    if (upkey.isDown) {
        if (upkey.duration > upkey.next) {
            upkey.next = upkey.duration + 125;
            game.currentpiece.rotateLeft();
            
        }
    } else if (upkey.isUp) {
        upkey.next = 0;
    }
    
    
    
    
    if (game.running) {
    
        if (game.collisionflag) {
            game.currentpiece.kill();
            game.collisionflag = false;

            var newpiece;
            var r = Math.floor((Math.random() * 7) + 1);
            switch (r) { 
               case 1:
                    newpiece = new TPiece();
                    break;
                case 2:
                    newpiece = new BarPiece();
                    break;
                case 3:
                    newpiece = new S1Piece();
                    break;
                case 4:
                    newpiece = new S2Piece();
                    break;
                case 5:
                    newpiece = new L1Piece();
                    break;
                case 6:
                    newpiece = new L2Piece();
                    break;
                case 7:
                    newpiece = new CubePiece();
                    break;
            }


            game.currentpiece = newpiece;

            while ( game.grid.tetris() || game.grid.triple() || game.grid.double() 
                    || game.grid.single());

        }
        
        if (!game.grid.isLineEmpty(19)) {
            game.running = false;
        }
    }
    

    
    
}