/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Square.EMPTY = 0;
Square.RED = 1;
Square.GOLD = 2;
Square.GREEN = 3;
Square.BLUE = 4;
Square.PURPLE = 5;
Square.GREY = 6;

function Square (value, sprite) {
    
    this.setValue(value);
    this.setSprite(sprite);
    
}

Square.prototype.setValue = function(value) {
    this.value = value;
};

Square.prototype.getValue = function() {
    return this.value;
};

Square.prototype.setSprite = function(sprite) {
    this.sprite = sprite;
};

Square.prototype.getSprite = function() {
    return this.sprite;
};