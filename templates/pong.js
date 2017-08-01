/*INIT *OF ELEMENTS */

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
        canvas.width = this.w;
        canvas.height  = this.h;

        ctx = canvas.getContext('2d');
        $('body').append(canvas);
        
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

class Player{
    
    constructor(x_, y_, w_, h_){
        this.x = x_;
        this.y = y_;
        this.w = w_;
        this.h = h_;
        this.speed;
        this.color = "#fff";;
        this.score = 0;
    }
    
    initPlayer(context, color){
        var canvas, context;
        
        canvas = $('canvas')[0];
        context = canvas.getContext('2d');
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.w, this.h);
        $('canvas').append(canvas);
    }
    
    mouseEventHandler() {  //player follows mouse mouvements
        var canvas = $('canvas')[0];
        
        canvas.addEventListener("mousemove", event => {
            this.y = event.offsetY;
        })
    }
    
    keyEventHandler(){ //player follows keymouvement
        var up = 40, down = 38;
        
        document.addEventListener("keydown", event => {
            if(event.keyCode == up)
                this.y += 30;
            if(event.keyCode == down)
                this.y -= 30;
        })
    }
    
    show(){
        var color = this.color; //color of player
        this.initPlayer(board.context, color); 
    }
    
     delete(){ //destroy layer out of the screen
        var namespace = {};
        namespace.this = {};
        delete namespace.this;
    }
}

class Ball { //Ball object
    
    constructor(x_, y_){
        this.x = x_;
        this.y = y_;
        this.context;
        this.color = "#fff";
        this.radius = 20;
        this.xspeed = 700 * (Math.random() > 0.5 ? 1 : -1);
        this.yspeed = 700;
    }
    
    //getter for coordonates of the ball
    get leftside() {
        return this.x - this.radius;
    }
    get rigthside() {
        return this.x + this.radius;
    }
    get upperside() {
        return this.y - this.radius ;
    }
    get bottom() {
        return this.y + this.radius;
    }

    show(){ //prints the ball in the screen 
        var color = this.color; //color of ball --> white
        var canvas = $('canvas')[0];
        var ctx = canvas.getContext('2d');
        this.context = ctx;
        
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0,2 * Math.PI);
        ctx.fill();
    }
    
    reset(){ //get the ball in the center of the screen
        this.x = board.w/2;
        this.y = board.h/2;
        this.xspeed = 600 * ((Math.random() > .5) ? 1 : -1);
        this.yspeed = 600;
    }
    
    collide(){ //checks if the ball hits a paddle
        //console.log('player y : ' + player.y + 'pong y : ' + this.y);
        if((this.upperside > player1.y - 50) && (this.bottom) < (player1.y + player1.h + 50) && (this.leftside) < (player1.x + player1.w)){ //if the ball goes left and is after the bar
        //console.log('Left : rebond');
            this.xspeed += 50;
            this.yspeed += 50;
            this.xspeed *= -1; //change direction
        }
        if ((this.upperside > player2.y - 50) && (this.bottom) < (player2.y + player2.h + 50) && (this.rigthside) > (player2.x - player2.w/2)){
            //console.log('Right : rebond');
            this.xspeed += 50;
            this.yspeed += 50;
            this.xspeed *= -1;
        }
     }
    
    delete(){ //destroy the ball out of the screen
        var namespace = {};
        namespace.this = {};
        delete namespace.this;
    }
}

/*function repere(){
    var canvas = $('canvas')[0];
    var context = canvas.getContext('2d');
    context.fillStyle = "#FF0000"; //red
    context.fillRect(pong.x - pong.radius, pong.y, 10, 10);
}*/

function createboard() { //Function that create a new board
    var color;
    
    const w = screen.width * 0.7;
    const h = screen.height * 0.75;
    const x = 30;
    const y = 30;

    //color = "#4286f4"; //color of board --> blue
    
    var board = new Board(x, y, w, h); //Class board
    var ctx = board.initBoard(board.color); //initBoard returns a context
    board.context = ctx;
    
    return board;
}

function createPlayer(board, x, y, w, h) {
    var color, player;
    
    color = "#fff"; //color of player
    
    player = new Player(x, y, w, h);
    player.color = color;
    player.initPlayer(board.context, player.color);
    
    return player;
}

function score(){ //if the ball is above a paddle the other paddle get a point and the ball goes to the center
    if(pong.x < player1.x){
        player2.score++;
        pong.reset();
    }
    
    if(pong.x > player2.x + player2.w/2){
        //console.log(board.w);
        player1.score++;
        pong.reset();
    }
}

function printScore() { //prints the score
    var canvas = $('canvas')[0];
    var context = canvas.getContext('2d');
    var score = "Player 1 : " + player1.score + " - " + player2.score + " : Player 2";
    //console.log(score);
    context.font = "50px Arial";
    context.fillStyle = "#fff";
    context.fillText(score, board.w/2 - 180, board.y + 50);
}

function update(difftime){
    
    var canvas = $('canvas')[0];
    
    if(pong.y - pong.radius < board.y + 10 || pong.y + pong.radius > board.h){
        pong.yspeed *= -1;
    }

    pong.collide();
  
    pong.x += pong.xspeed * difftime;
    pong.y += pong.yspeed * difftime;
    
    //free memory before creating new objects
    board.delete();
    player1.delete();
    player2.delete();
    pong.delete();
    
    board.show();
    printScore();
    player1.show();
    player2.show();
    
    pong.show();
    score();
}

let lastime;
function callback(time){
    if(lastime)
        update((time - lastime) /1000);
    lastime = time;
    requestAnimationFrame(callback);
}
