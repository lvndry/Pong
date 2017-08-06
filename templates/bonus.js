class bonusCase {
    constructor(){
        this.x;
        this.y;
        this.w  = 69;
        this.h = 69;
        this.color = '#963108';
        this.destroyed = true;
    }
    
    init(){
        min_x = player1.x + player1.w + 50; //the bonus can't be more in the left than the left of the board
        max_x = player2.x - 64; //bonus case can't be more in the right than the right of the board
        min_y = board.y + 20; //bonus case can't be higher than the top of screen
        max_y = board.y + board.h - 50; //bonus case can't be lower than the bottom of the screen
        this.x = Math.random() * (max_x - min_x) + min_x; //random x position of bonus case 
        this.y = Math.random() * (max_y - min_y) + min_y; //random y position of bonus case
    }
    
    show(){
        var ctx, image, pattern;

        ctx = board.context;
        image = new Image();
        image.src='ressources/star.png'; //path from index.html
        pattern = ctx.createPattern(image, "no-repeat"); //no-repeat so that the image prints only once
        ctx.fillStyle = pattern;
        ctx.rect(0, 0, board.w + board.x, board.h + board.y); //ctx.rect do not accept variables. So that why I use translate
        ctx.translate(this.x, this.y);
        ctx.fill();
    }
    
    delete(){
        var namespace = {};
        namespace.this = {};
        delete namespace.this; 
    }
}
