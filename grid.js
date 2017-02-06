/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Grid (width, height) {
    
    this.width = width;
    this.height = height;
    
    //this.squares = new Array(height).fill(
    //        new Array(width).fill(null));
    //        ; 
    
    this.squares = [];
    
    for (var y = 0; y < height; y++) {
        this.squares[y] = [];
        for (var x = 0; x < width; x++) {
            var row = this.squares[y];
            row[x] = new Square(0, null);
            
        }
    }
    
    
}
 
Grid.prototype.isLineEmpty = function(line) {
  
    var result = true;
  
    for (var i = 0; i < this.height; ++i) {
        
        var row = this.squares[i];
        for (var j = 0; j < this.width; ++j) {
            if ( row[j].getValue() !== 0) {
                result = false;
            }
        }
        
    }
    
    return result;
    
};

Grid.prototype.isLineFull = function(line) {
  
    var result = true;
  
    
        var row = this.squares[line];
        for (var j = 0; j < this.width; ++j) {
            if ( row[j].getValue() == 0) {
                result = false;
            }
        }
        
    
    
    return result;
    
};

Grid.prototype.tetris = function() {
    
    var found = false;
    
    var startline = -1;
    var endline = -1;
    
    for (var i = 0; i < 17; i++) {
        console.log("Checking for tetris at line: "+i+" "+this.isLineFull(i)+" "+this.isLineFull(i+1)+" "+this.isLineFull(i+2)+" "+this.isLineFull(i+3));
        if (this.isLineFull(i) && this.isLineFull(i+1) &&
            this.isLineFull(i+2) && this.isLineFull(i+3) ) {
            found = true;
            startline = i;
            endline = i+3;
        }
        
    }
    
    if (found) {
        for (var i = startline; i <= endline; i++) {
            var row = this.squares[i];
            for (var j = 0; j < this.width; ++j) {
                row[j].setValue(0);
                var sp = row[j].getSprite();
                if (sp !== null) {
                    sp.kill();
                }
                row[j].setSprite(null);
            }
        }
        
        for (var i = startline; i <= 15; i++) {
            var lorow = this.squares[i];
            var hirow = this.squares[i+4];
            for (var j = 0; j < this.width; ++j) {
                
                var lowsq = lorow[j];
                var highsq = hirow[j];
                var sp = highsq.getSprite();
                var value = highsq.getValue();
                lowsq.setValue(value);
                lowsq.setSprite(sp);
                
                if (sp) {
                    sp.y += 100;
                }
                
                
            }
        }
        
        for (var i = 16; i <= 19; i++) {
            var row = this.squares[i];
            for (var j = 0; j < this.width; ++j) {
                sq = row[j];
                sq.setValue(0);
                sq.setSprite(null);
                
                
            }
        }
        
    }
    

    
    
    return found;
}