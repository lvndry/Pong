/*Landry Monga
  Pong game
  August 2017
*/

class Ball { //Ball object

    constructor(x_, y_){
        this.x = x_;
        this.y = y_;
        this.xspeed = 700 * (Math.random() > 0.5 ? 1 : -1);
        this.yspeed = 700;
        this.radius = 20;
        this.color = "#fff"; //white
        this.lastshooter = player1;
        this.dead = false;
    }

    //getter for sides of the ball
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

        if((this.bottom > player1.y) && (this.upperside) < (player1.y + player1.h) && (this.leftside) <= (player1.x + player1.w)){
            this.lastshooter = player1;
            this.xspeed *= -1; //change direction
            this.xspeed *= 1.1; //speed up by 10%
            this.yspeed *= 1.1; //speed up
        }
        if ((this.bottom > player2.y) && (this.upperside) < (player2.y + player2.h) && (this.rigthside) >= (player2.x)){
            this.lastshooter = player2;
            this.xspeed *= -1;
            this.xspeed *= 1.1;
            this.yspeed *= 1.1
        }
        if( (this.y - this.radius - 10) <= board.y || (this.y + this.radius + 10) >= board.h){ //if it hits the bottom or the top of the screen
            this.yspeed *= -1;
            return
        }
        //(this.x - bonus.x - 69) is the case where the ball comes from the right of the ball. bonus.x is on the left side of the bonus. If the distance beetween the center of the circle and the bonus is lower than the width (in pixel) of the star it means that the ball collides the bonus.
        if((Math.abs(this.x - bonus.x) <= 69 || Math.abs(this.x - bonus.x - 69) <= 69) && (Math.abs(this.y - bonus.y) <= 69 || Math.abs(this.y - bonus.y + 69) <= 69) && bonus.destroyed === false){
            bonus.destroyed = true;
            this.giveBonus();
            //If the bonus is given an other one is placed after 2 minutes
            setTimeout(function () {
                bonus.destroyed = false;
                bonus.init();
            }, 1000 * 30) //30 times one second == 30 seconds
            return true;
        }
     }

    delete(){ //destroy the ball out of the screen
        var namespace = {};
        namespace.this = {};
        delete namespace.this;
    }

    setFunctions(){ //set all the bonuses in an array
        bonusFunctions = [];
        bonusFunctions.push(extend);
        bonusFunctions.push(addScore);
    }

    getBonus(){ //return a randomly chosen function
        this.setFunctions();
        var bonusIndex = Math.floor(Math.random() * bonusFunctions.length);
        return bonusFunctions[bonusIndex];
    }

    giveBonus(){ //gives the bonus to the last player that have shot
        var selectedBonus;

        selectedBonus = this.getBonus();
        var lastshooter = this.lastshooter;
        selectedBonus(lastshooter);
    }
}

function createBalls(){ //creates the wanted number of balls
    var pong;

    balls = []; //I make sure that the array is empty before creating the wanted number of balls
    var numOfBalls = $('input[name=ball]:checked').val();

    for(var i = 0; i < numOfBalls; i++){
        pong = new Ball(board.w/2, board.h/2);
        balls[i] = pong;
    }
}

function ballColor(newColor){ //Change the color of the balls
        for(var i = 0; i < balls.length; i++)
            balls[i].color = "#" + newColor;
        showElements();
}
