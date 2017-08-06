class Player{
    
    constructor(x_, y_, w_, h_){
        this.x = x_;
        this.y = y_;
        this.w = w_;
        this.h = h_;
        this.speed;
        this.bot = true; //says if IA mode or not
        this.color = "#fff"; //white
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

function extend(shooter){
    shooter.h *= 2;
    setTimeout(function(){
        shooter.h /= 2;
    }, 30 * 1000) //The lenght is doubled during 30 seconds 
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

function playersColor(newColor){
    player1.color = player2.color = "#" + newColor;
    
    showElements();
}
