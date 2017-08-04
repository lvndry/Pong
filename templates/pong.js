/*Landry Monga
  Pong game
  August 2017
*/

(function () { //requestAnimationFrame is chosen depending on the browser
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
            

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
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.w, this.h);
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
        this.xspeed = 700 * (Math.random() > 0.5 ? 1 : -1);
        this.yspeed = 700;
        this.radius = 20;
        this.color = "#fff";
        this.lastshooter = player1;
        this.dead = false;
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
        
        var canvas = $('canvas')[0];
        var ctx = canvas.getContext('2d');
        
        ctx.beginPath();
        ctx.fillStyle = this.color; //color of ball --> white
        ctx.arc(this.x, this.y, this.radius, 0,2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    
    reset(){ //get the ball in the center of the screen
        this.x = board.w/2;
        this.y = board.h/2;
        this.xspeed = 600 * ((Math.random() > .5) ? 1 : -1);
        this.yspeed = 600 * ((Math.random() > .5) ? 1 : -1);
    }
    
    collide(){ //checks if the ball hits a paddle
        if((this.upperside > player1.y - 50) && (this.bottom) < (player1.y + player1.h + 50) && (this.leftside) < (player1.x + player1.w)){ //if the ball goes left and is after the bar
            this.lastshooter = player1;
            this.xspeed += 50; //speed up
            this.yspeed += 50; //speed up
            this.xspeed *= -1; //change direction
        }
        if ((this.upperside > player2.y - 50) && (this.bottom) < (player2.y + player2.h + 50) && (this.rigthside) > (player2.x - player2.w/2)){
            this.lastshooter = player2;
            this.xspeed += 50;
            this.yspeed += 50;
            this.xspeed *= -1;
        }
        if(this.y - this.radius < board.y + 10 || this.y + this.radius > board.h){ //if it hits the bottom or the top of the screen
            this.yspeed *= -1;
        }
        if(Math.abs(this.x - bonus.x) <= this.radius && Math.abs(this.y - bonus.y) <= this.radius && bonus.destroyed === false){ //if the distance beetween the center of the circle and the object is lower than the radus of the circle it means that the objects collides
            bonus.destroyed = true;
            this.giveBonus();
            return true;
        }
     }
    
    delete(){ //destroy the ball out of the screen
        var namespace = {};
        namespace.this = {};
        delete namespace.this;
    }
    
    setFunctions(){
        bonusFunctions = [];
        bonusFunctions.push(extend);
        bonusFunctions.push(addScore);
        console.log(bonusFunctions);
    }
    
    getBonus(){
        this.setFunctions();
        var bonusIndex = Math.floor(Math.random() * bonusFunctions.length); 
        return bonusFunctions[bonusIndex];  
    }
    
    giveBonus(){
        var selectedBonus;
        
        selectedBonus = this.getBonus();
        console.log('selectedBonus : ' + selectedBonus);
        console.log('lastshooter : ' + this.lastshooter);
        var lastshooter = this.lastshooter;
        selectedBonus(lastshooter);
    }
}

class bonusCase {
    constructor(){
        this.x;
        this.y;
        this.w  = 69;
        this.h = 69;
        this.color = '#963108';
        this.destroyed = false;
    }
    
    init(){
        min_x = player1.x + player1.w + 50; //the bonus can't be more in the left than the left of the board
        max_x = player2.x - 50; //bonus case can't be more in the right than the right of the board
        min_y = board.y + 20; //bonus case can't be higher than the top of screen
        max_y = board.y + board.h - 50; //bonus case can't be lower than the bottom of the screen
        this.x = Math.random() * (max_x - min_x) + min_x; //random x position of bonus case 
        this.y = Math.random() * (max_y - min_y) + min_y; //random y position of bonus case
    }
    
    show(){
        var ctx, image, pattern;

        ctx = board.context;
        image = new Image();
        image.src='../star.png';
        pattern = ctx.createPattern(image, "no-repeat");
        ctx.fillStyle = pattern;
        ctx.rect(0, 0, board.w + board.x, board.h + board.y); //ctx.rext do not accept vriables. So that why I use translate
        ctx.translate(this.x, this.y);
        ctx.fill();
    }
    
    delete(){
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

function extend(shooter){
    shooter.h *= 2;
    setTimeout(function(){
        shooter.h /= 2;
    }, 60 * 1000)
}
    
function addScore(shooter){
    shooter.score += 1;
}

function createPlayer(board, x, y, w, h) {
    var color, player;
    
    color = "#fff"; //color of player
    
    player = new Player(x, y, w, h);
    player.color = color;
    player.initPlayer(board.context, player.color);
    
    return player;
}

function createBalls(){
    var pong;
    balls = []; //I make sure that the array is empty before creating the wanted number of balls
    var numOfBalls = $('input[name=ball]:checked').val();
                
    for(var i = 0; i < numOfBalls; i++){
        pong = new Ball(board.w/2, board.h/2);
        balls[i] = pong;
    }
}  

function score(){ //if the ball is above a paddle the other paddle get a point and the ball goes to the center
    for(var  i = 0; i < balls.length; i++){
        if(balls[i].dead === false){
            
            if(balls[i].x < player1.x){
                player2.score++;
                balls[i].dead = true;
            }
        
            if(balls[i].x > player2.x + player2.w/2){
                player1.score++;
                balls[i].dead = true;
            }
        }
    }
}

function ballColor(newColor){
        for(var i = 0; i < balls.length; i++)
            balls[i].color = "#" + newColor;
}

function reseter(){
    for(var i = 0, len = balls.length; i < len; i++){
        if(balls[i].dead === false)
            return;
    }
    for(var i = 0, len = balls.length; i < len; i++){
        balls[i].reset();
        balls[i].dead = false;
        balls[i].show();
    }
}

function printScore() { //prints the score
    var canvas = $('canvas')[0];
    var context = canvas.getContext('2d');
    var score = "Player 1 : " + player1.score + " - " + player2.score + " : Player 2";
    context.font = "50px Arial";
    context.fillStyle = "#fff";
    context.fillText(score, board.w/2 - 210, board.y + 50);
}

function update(difftime){
    for(var i = 0; i < balls.length; i++){
        balls[i].collide();
        
        balls[i].x += balls[i].xspeed * difftime;
        balls[i].y += balls[i].yspeed * difftime;
    }
    //If the bonus is given an other is placed after 3 seconds
    if(bonus.destroyed === true){
        setTimeout(function () {
            bonus.init();
            bonus.destroyed = false;
        }, 3000)
    }
    //free memory before creating new objects
    board.delete();
    player1.delete();
    player2.delete();
    
    for(var i = 0; i < balls.length; i++)
        balls[i].delete();
    
    board.show();
    printScore();
    player1.show();
    player2.show();
    for(var i = 0; i < balls.length; i++){
        if(balls[i].dead === false)
            balls[i].show();
    }
    if(bonus.destroyed === false)
        bonus.show();
    score();
    reseter();
}

let lastime;
function game(time){
    if(lastime && pause != true)
        update((time - lastime) /1000);
    lastime = time;
    window.requestAnimationFrame(game);    
}
