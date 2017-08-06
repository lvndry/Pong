class Board{ //Class board == the background
    
    constructor( x, y, width, height) {
        this.w = width;
        this.h = height;
        this.x = x;
        this.y = y;
        this.color = "#4286f4";
        this.context;
    }
     
    initBoard(color){ //Creation of board in canvas
        var canvas, ctx;
        
        canvas = $('canvas')[0];
        ctx = canvas.getContext('2d');
        this.context = ctx;
        
        canvas.width = this.w;
        canvas.height  = this.h;
        
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x , this.y, this.w, this.h);
        return ctx; //returns the context where the board is created  
    }
    
    show() {
        var color = this.color;
        this.initBoard(color);
    }
    
     delete(){ //destroy element out of the screen
        var namespace = {};
        namespace.this = {};
        delete namespace.this;
    }
}

function createboard() { //Function that create a new board
    var color;
    
    const w = screen.width * 0.7;
    const h = screen.height * 0.75;
    const x = 30;
    const y = 30;
    
    var board = new Board(x, y, w, h); //Class board
    var ctx = board.initBoard(board.color); //initBoard returns a context
    board.context = ctx;

    return board;
}

function boardColor(newColor){
    board.color = "#" + newColor;
    showElements();
    
}
