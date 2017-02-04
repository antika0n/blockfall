/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
Piece.OFFSETS.BAR = [
    { dx: [-1, 0, 1, 2], dy:[ 0, 0, 0, 0], sprite: null }, 
    { dx: [ 0, 0, 0, 0], dy:[ 1, 0,-1,-2], sprite: null },
    { dx: [-1, 0, 1, 2], dy:[ 0, 0, 0, 0], sprite: null },
    { dx: [ 0, 0, 0, 0], dy:[ 1, 0,-1,-2], sprite: null }
];

Piece.OFFSETS.T = [
    { dx: [-1, 0, 1, 0], dy:[ 0, 0, 0, 1], sprite: null }, 
    { dx: [ 0, 0, 0, 1], dy:[ 1, 0,-1, 0], sprite: null },
    { dx: [-1, 0, 1, 0], dy:[ 0, 0, 0,-1], sprite: null },
    { dx: [ 0, 0, 0,-1], dy:[ 1, 0,-1,-1], sprite: null }
];

Piece.TYPE.BAR = 1;
Piece.TYPE.T = 2;

*/
class Piece {
    
    constructor() {
        
        this.TYPE_BAR = 1;
        this.TYPE_T = 2;
        
        this.rotations = [
                { dx: [-1, 0, 1, 2], dy:[ 0, 0, 0, 0] }, 
                { dx: [ 0, 0, 0, 0], dy:[ 1, 0,-1,-2] },
                { dx: [-1, 0, 1, 2], dy:[ 0, 0, 0, 0] },
                { dx: [ 0, 0, 0, 0], dy:[ 1, 0,-1,-2] }
        ];
        this.sprites = [ null, null, null, null ];
        this.spriteasset = 'blk_grey';
        this.type = Piece.TYPE_BAR;
        this.rotation = 0;
        
        
    }
    
    setX(x) {
        this.x = x;
        for (var i = 0; i < 4; ++i) {
            var rot = this.rotations[this.rotation];
            if (this.sprites[i] === null) {
                this.sprites[i] = game.add.sprite(0,0, this.spriteasset);
            }
            var sp = this.sprites[i];
            game.physics.arcade.enable(sp);
            sp.body.bounce = 5;
            sp.body.gravity.y = 5;
            sp.body.collideWorldBounds = true;
            sp.x = (game.gridsprite.x+10)+(x*25)+(rot.dx[i]*25) ;
            console.log("X:"+x+"/"+sp.x);
        }
    }
    
    setY(y) {
        this.y = y;
        for (var i = 0; i < 4; ++i) {
            var rot = this.rotations[this.rotation];
            if (this.sprites[i] === null) {
                this.sprites[i] = game.add.sprite(0,0, this.spriteasset);
                
            }
            var sp = this.sprites[i];
            game.physics.arcade.enable(sp);
            sp.body.bounce = 5;
            sp.body.gravity.y = 50;
            sp.body.collideWorldBounds = true;
            sp.y = (game.gridsprite.height-10)-(y*25)+(rot.dy[i]*25);
            console.log("Y:"+y+"/"+sp.y);
        }
    }
    
    setPos(x,y) {
        
        this.setX(x);
        this.setY(y);
    }
    
    do_rotate() {
        var ref = this.sprites[1];
        for (var i = 0; i < 4; i++) {
            
                var sp = this.sprites[i];
                sp.x = ref.x + (this.rotations[this.rotation].dx[i] * 25);
                sp.y = ref.y + (this.rotations[this.rotation].dy[i] * 25);
            
        }
    }
    
    getGridPosX(x) {
        var result = game.grid.height;
        return result;
        
    }
    
    
    
    
    moveLeft() {

        var blocked = false;
        
        for (var i = 0; i < 4; i++) {
        
            // Can we go further left on the grid?
            var newx = this.sprites[i].x - 25;
            var newgx = (newx - 10 - game.gridsprite.x) / 25; 
                    
            if (newgx < 0) {
                blocked = true;
            }

            console.log(i+": "+newx+" x "+newgx);

            
        }
        
        if (!blocked) {
            for (var i = 0; i < 4; i++) {
                this.sprites[i].x -= 25;
            }
        }
        
        
    }
    
    moveRight() {
        
    }
    
    rotateLeft() {
        --this.rotation;
        if (this.rotation < 0) {
            this.rotation = 3;
        }
        this.do_rotate();
    }
    
    rotateTight() {
        ++this.rotation;
        if (this.rotation > 3) {
            this.rotation = 0;
        }
        this.do_rotate();
    }
    
    
}

class BarPiece extends Piece {
    constructor() {
        super();
        this.setPos(4,18);
    }
}

class TPiece extends Piece {
    
    constructor() {
        
        super();
        
        this.rotations = [
                { dx: [-1, 0, 1, 0], dy:[ 0, 0, 0, 1] }, 
                { dx: [ 0, 0, 0, 1], dy:[ 1, 0,-1, 0] },
                { dx: [-1, 0, 1, 0], dy:[ 0, 0, 0,-1] },
                { dx: [ 0, 0, 0,-1], dy:[ 1, 0,-1,0] }

        ];
        
        console.log("T PIECE!");
        this.spriteasset = 'blk_gold';
        this.type = Piece.TYPE_T;
        
        this.setPos(4,18);
        //this.rotateLeft();
        
    }
}



