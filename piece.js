/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class Piece {
    
    constructor() {
        
        this.TYPE_BAR = 1;
        this.TYPE_T = 2;
        
        this.rotations = [
                { dx: [-1, 0, 1, -2], dy:[ 0, 0, 0, 0] }, 
                { dx: [ 0, 0, 0, 0], dy:[ 1, 0,-1, 2] },
                { dx: [-1, 0, 1, -2], dy:[ 0, 0, 0, 0] },
                { dx: [ 0, 0, 0, 0], dy:[ 1, 0,-1, 2] }
        ];
        this.sprites = [ null, null, null, null ];
        this.spriteasset = 'blk_grey';
        this.type = this.TYPE_BAR;
        this.rotation = 0;
        this.gravity = game.currentgravity;
    }
    
    setGravity(g) {
        for (var i = 0; i < 4; ++i) {
            var sp = this.sprites[i];
            sp.body.gravity.y = g;
        }
    }
    
    kill() {
        for (var i = 0; i < 4; ++i) {
            var sp = this.sprites[i];
            sp.kill();
            sp.destroy();
        }
        
    }
    
    collide() {

        if (!game.collisionflag) {
            
            game.collisionflag = true;
            console.log("COLLISION!");

            for (var i = 0; i < 4; ++i) {

                var sp = this.sprites[i];
                var gridx = (sp.x - 10 - game.gridsprite.x) / 25;
                var gridy = 20 - Math.floor((sp.y - 10 - game.gridsprite.y) / 25) - 2;

                var newx = gridx * 25 + game.gridsprite.x + 10;
                var newy = (game.gridsprite.y + game.gridsprite.height - 10 - 25) - (gridy * 25);
                console.log("gx:"+gridx+" gy:"+gridy + "nx:"+newx + "ny:"+newy);
                var newblock = game.gridgroup.create(newx, newy, this.spriteasset);
                game.grid.squares[gridy][gridx].setValue(1);
                game.grid.squares[gridy][gridx].setSprite(newblock);
                newblock.body.immovable = true;
                
            }
        }
    }
    
    createSprite(i) {
        //face1.body.onCollide = new Phaser.Signal();
        //face1.body.onCollide.add(hitSprite, this);
        this.sprites[i] = game.add.sprite(0,0, this.spriteasset);
        game.piecegroup.add(this.sprites[i]);
        this.sprites[i].body.onCollide = new Phaser.Signal();
        this.sprites[i].body.onCollide.add(this.collide, this);
    }
    
    setX(x) {
        this.x = x;
        for (var i = 0; i < 4; ++i) {
            var rot = this.rotations[this.rotation];
            if (this.sprites[i] === null) {
                this.createSprite(i);
                //this.sprites[i] = game.add.sprite(0,0, this.spriteasset);
                //game.piecegroup.add(this.sprites[i]);
            }
            var sp = this.sprites[i];
            game.physics.arcade.enable(sp);
            sp.body.bounce = 5;
            sp.body.gravity.y = this.gravity;
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
                this.createSprite(i);
                //this.sprites[i] = game.add.sprite(0,0, this.spriteasset);
                //game.piecegroup.add(this.sprites[i]);
                
            }
            var sp = this.sprites[i];
            game.physics.arcade.enable(sp);
            sp.body.bounce = 5;
            sp.body.gravity.y = this.gravity;
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
                    
            var newy = this.sprites[i].y; 
            var newgy =  20 - Math.floor((newy - 10 - game.gridsprite.y) / 25) - 2 ;
            
            var value = -1;
            if ( (newgx < 0) || (newgx >= game.grid.width) ||
                 (newgy < 0) || (newgy >= game.grid.height) ) {
                blocked = true;
            } else {
                value = game.grid.squares[newgy][newgx].value;
            }
            
            if (value !== SQUARE_EMPTY) {
                blocked = true;
            }

        }
        
        if (!blocked) {
            for (var i = 0; i < 4; i++) {
                this.sprites[i].x -= 25;
            }
        }
        
        
    }
    
    moveRight() {
        var blocked = false;
        
        for (var i = 0; i < 4; i++) {
        
            // Can we go further left on the grid?
            var newx = this.sprites[i].x + 25;
            var newgx = (newx - 10 - game.gridsprite.x) / 25;
                    
            var newy = this.sprites[i].y; 
            var newgy =  20 - Math.floor((newy - 10 - game.gridsprite.y) / 25) - 2;

            var value = -1;
            if ( (newgx < 0) || (newgx >= game.grid.width) ||
                 (newgy < 0) || (newgy >= game.grid.height) ) {
                blocked = true;
            } else {
                value = game.grid.squares[newgy][newgx].value;
            }
            
            if (value !== SQUARE_EMPTY) {
                blocked = true;
            }

        }
        
        if (!blocked) {
            for (var i = 0; i < 4; i++) {
                this.sprites[i].x += 25;
            }
        }
    }
    
    rotateLeft() {
        
        var newrotation = this.rotation;
        var blocked = false;
        
        newrotation--;
        if (newrotation < 0) {
            newrotation = 3;
        }
        for (var i = 0; i < 4; i++) {
            var rot = this.rotations[newrotation];
            
            var newx = this.sprites[i].x + (rot.dx[i] * 25);
            var newgx = (newx - 10 - game.gridsprite.x) / 25;
                    
            var newy = this.sprites[i].y + (rot.dy[i] * 25); 
            var newgy =  20 - Math.floor((newy - 10 - game.gridsprite.y) / 25) - 1;
            
            if (newgx >= game.grid.width) {
                blocked = true;
            }
            if (newgx < 0) {
                blocked = true;
            }
            //if (newgy >= game.grid.height) {
            //    blocked = true;
            //}
            if (newgy < 0) {
                blocked = true;
            }
            
            
        }
        if (!blocked) {
            game.snd_rotate.play();
            this.rotation = newrotation;
            this.do_rotate();
        }
    }
    
    rotateRight() {
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
        this.setPos(4,19);
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
        
        this.setPos(4,19);
        //this.rotateLeft();
        
    }
}

class S1Piece extends Piece {
    
    constructor() {
        
        super();
        
        this.rotations = [
                { dx: [-1, 0, 0,-1], dy:[ 0, 0, 1,-1] }, 
                { dx: [ 0, 0, 1,-1], dy:[ 1, 0, 0, 1] },
                { dx: [-1, 0, 0,-1], dy:[ 0, 0, 1,-1] },
                { dx: [ 0, 0, 1,-1], dy:[ 1, 0, 0, 1] }

        ];
        
        console.log("S1 PIECE!"); 
        this.spriteasset = 'blk_red';
        this.type = Piece.TYPE_T;
        
        this.setPos(4,19);
        //this.rotateLeft();
        
    }
}

class S2Piece extends Piece {
    
    constructor() {
        
        super();
        
        this.rotations = [
                { dx: [ 1, 0, 0, 1], dy:[ 0, 0, 1,-1] }, 
                { dx: [-1, 0, 0, 1], dy:[ 0, 0, 1, 1] },
                { dx: [ 1, 0, 0, 1], dy:[ 0, 0, 1,-1] },
                { dx: [-1, 0, 0, 1], dy:[ 0, 0, 1, 1] }

        ];
        
        console.log("S2 PIECE!"); 
        this.spriteasset = 'blk_blue';
        this.type = Piece.TYPE_T;
        
        this.setPos(4,19);
        //this.rotateLeft();
        
    }
}

class L1Piece extends Piece {
    
    constructor() {
        
        super();
        
        this.rotations = [
                { dx: [-1, 0, 1,-1], dy:[ 0, 0, 0, 1] }, 
                { dx: [ 0, 0, 0,-1], dy:[ 1, 0,-1,-1] },
                { dx: [-1, 0, 1, 1], dy:[ 0, 0, 0,-1] },
                { dx: [ 0, 0, 0, 1], dy:[-1, 0, 1, 1] }

        ];
        
        console.log("L1 PIECE!"); 
        this.spriteasset = 'blk_purple';
        this.type = Piece.TYPE_T;
        
        this.setPos(4,19);
        //this.rotateLeft();
        
    }
    
}

class L2Piece extends Piece {
    
    constructor() {
        
        super();
        
        this.rotations = [
                { dx: [-1, 0, 1, 1], dy:[ 0, 0, 0, 1] }, 
                { dx: [ 0, 0, 0,-1], dy:[ 1, 0,-1, 1] },
                { dx: [-1, 0, 1,-1], dy:[ 0, 0, 0,-1] },
                { dx: [ 0, 0, 0, 1], dy:[ 1, 0,-1,-1] }

        ];
        
        console.log("S2 PIECE!"); 
        this.spriteasset = 'blk_green';
        this.type = Piece.TYPE_T;
        
        this.setPos(4,19);
        //this.rotateLeft();
        
    }
    
}

class CubePiece extends Piece {
    
    constructor() {
        
        super();
        
        this.rotations = [
                { dx: [-1, 0,-1, 0], dy:[ 0, 0, 1, 1] }, 
                { dx: [-1, 0,-1, 0], dy:[ 0, 0, 1, 1] },
                { dx: [-1, 0,-1, 0], dy:[ 0, 0, 1, 1] },
                { dx: [-1, 0,-1, 0], dy:[ 0, 0, 1, 1] }

        ];
        
        console.log("S2 PIECE!"); 
        this.spriteasset = 'blk_darkgrey';
        this.type = Piece.TYPE_T;
        
        this.setPos(4,19);
        //this.rotateLeft();
        
    }
    
}