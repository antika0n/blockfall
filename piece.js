/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Piece.BAR = [
    { x: [-1, 0, 1, 2], y:[ 0, 0, 0, 0] }, 
    { x: [ 0, 0, 0, 0], y:[ 1, 0,-1,-2] },
    { x: [-1, 0, 1, 2], y:[ 0, 0, 0, 0] },
    { x: [ 0, 0, 0, 0], y:[ 1, 0,-1,-2] }
];

Piece.T = [
    { x: [-1, 0, 1, 0], y:[ 0, 0, 0, 1] } , 
    { x: [ 0, 0, 0, 1], y:[ 1, 0,-1, 0] } ,
    { x: [-1, 0, 1, 0], y:[ 0, 0, 0,-1] } ,
    { x: [ 0, 0, 0,-1], y:[ 1, 0,-1,-1] }
];


function Piece () {
    
    this.setValue(value);
    this.setSprite(sprite);
    
}
