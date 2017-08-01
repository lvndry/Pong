<!-- Landry Monga
  Pong game
  August 2017
-->

<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="utf-8">
        
        <link rel="icon" href="../favicon.ico">

        <link rel="stylesheet" href="../css/main.css">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jquery-ui-bootstrap/0.5pre/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jquery.nanoscroller/0.8.7/css/nanoscroller.min.css" />
        
        <script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
        <script src = 'pong.js'></script>
        
    </head>
    
     <body onkeydown="document.body.style.overflow='hidden';">
        
         <aside class="toolbox">
             <div class="color">
                 <h2>Color</h2>
                 <div class="dashboard">  
                     <label>Dashboard</label>
                     <select class="dashcolor" onchange="board.color = '#' + this.value;">
                         <option value="fff">White</option>
                         <option value="e60000">Red</option>
                         <option value="4286f4" selected>Blue</option>
                         <option value="262626">Black</option>
                         <option value="ffcc00">Yellow</option>
                         <option value ="2eb82e">Green</option>
                     </select>
                </div>
                  
                  <label>Ball</label>
                  <select  onchange="pong.color = '#' + this.value;">
                      <option value="fff" selected>White</option>
                      <option value="e60000">Red</option>
                      <option value="4286f4">Blue</option>
                      <option value="262626">black</option>
                      <option value="ffcc00">Yellow</option>
                      <option value ="2eb82e">Green</option>
                  </select>
                  
                  <label>Paddle</label>
                    <select onchange="player1.color = player2.color = '#' + this.value;">
                      <option value="fff" selected>White</option>
                      <option value="e60000">Red</option>
                      <option value="4286f4">Blue</option>
                      <option value="262626">black</option>
                      <option value="ffcc00">Yellow</option>
                      <option value ="2eb82e">Green</option>
                  </select>
            </div>
        </aside> 
         
        <canvas class="game"> </canvas>
        
        <script>
            (function () { //requestAnimationFrame is chosen depending on the browser
                requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                window.requestAnimationFrame = requestAnimationFrame;
            })();
            
            var board = createboard();
            
            var x, y, w, h; //coordinates of players
            var player1, player2; //players

            w = 30;
            h = board.h * 0.3;
            x = board.x + 15;
            y = board.h/2 - (2 * board.y);
            player1 = createPlayer(board, x, y, w, h);

            w = 30;
            h = board.h * 0.3;
            x = board.w - (board.x + 15);
            y = board.h/2 - (2 * board.y);
            player2 = createPlayer(board, x, y, w, h);

            var pong = new Ball(board.w/2, board.h/2);
            
            var upKey = false;
            var downKey = false;
            var canvas = $('canvas')[0];
             
            callback();
            
            player1.mouseEventHandler();
            player2.keyEventHandler();
            
         </script>
         <footer>
             <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
         </footer>
     </body> 
</html> 