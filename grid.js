/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Grid (width, height) {
    
    this.width = width;
    this.height = height;
    
    this.squares = new Array(height).fill(
            new Array(width).fill(new Square(Square.EMPTY, null))
            ); 
}
 
Grid.prototype.isLineEmpty = function(line) {
  
    var result = true;
  
    for (var i = 0; i < this.height; ++i) {
        
        var row = this.squares[i];
        for (var j = 0; j < this.width; ++j) {
            if ( row[j].getValue() !== Square.EMPTY) {
                result = false;
            }
        }
        
    }
    
    return result;
    
};

Grid.prototype.isLineFull = function(line) {
  
    var result = true;
  
    for (var i = 0; i < this.height; ++i) {
        
        var row = this.squares[i];
        for (var j = 0; j < this.width; ++j) {
            if ( row[j].getValue() == Square.EMPTY) {
                result = false;
            }
        }
        
    }
    
    return result;
    
};

