/*Landry Monga
  Pong game
  August 2017
*/

(function () { //requestAnimationFrame is chosen depending on the browser
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

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

function showElements(){
    board.show();
    player1.show();
    player2.show();
    
    for(var i = 0; i < balls.length; i++)
        balls[i].show();
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
    var canvas, context, score1, score2;
    
    canvas = $('canvas')[0];
    context = canvas.getContext('2d');
    
    score1 = player1.score;
    score2 = player2.score;
    
    context.font = "50px Arial";
    context.fillStyle = "#fff";
    context.fillText(score1, player1.x, board.y + 50);
    context.fillText(score2, player2.x - 50, board.y + 50);
}

function update(difftime){
    for(var i = 0; i < balls.length; i++){
        balls[i].collide();
        
        balls[i].x += balls[i].xspeed * difftime;
        balls[i].y += balls[i].yspeed * difftime;
    }
    
    if(player2.bot === true)
        player2Mode();

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
