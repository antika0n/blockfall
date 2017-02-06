
class Blockfall {
    
    constructor() {
        
        this.phaser = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: this.preload, create: this.create, update: this.update });
        
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
    
}