/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


SQUARE_EMPTY = 0;
SQUARE_RED = 1;
SQUARE_GOLD = 2;
SQUARE_GREEN = 3;
SQUARE_BLUE = 4;
SQUARE_PURPLE = 5;
SQUARE_GREY = 6;

class Square {

    


    constructor (value, sprite) {
        this.setValue(value);
        this.setSprite(sprite);
        
        
        
        
        
    }
    


    setValue(value) {
        this.value = value;
    };

    getValue() {
        return this.value;
    };

    setSprite(sprite) {
        this.sprite = sprite;
    };

    getSprite() {
        return this.sprite;
    };
}