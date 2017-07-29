<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="utf-8">
        <script src = 'pong.js'></script>
        <script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="../css/main.css">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jquery-ui-bootstrap/0.5pre/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jquery.nanoscroller/0.8.7/css/nanoscroller.min.css" />
    </head>
    
    <script> </script>
     <body>
        <canvas> </canvas>
        <script>
            
            (function () { //requestAnimationFrame is chosen depending on the browser
                var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                window.requestAnimationFrame = requestAnimationFrame;
            })();
            
            var board = createboard();
            
            var x, y, w, h; //coordinates of players
            var player1, player2; //players

            w = 30;
            h = 200;
            x = board.x + 15;
            y = board.h/2 - 2 * board.y;
            player1 = createPlayer(board, x, y, w, h);

            w = 30;
            h = 200;
            x = board.w - board.x + w;
            y = board.h/2 - 2 * board.y;
            player2 = createPlayer(board, x, y, w, h);

            var pong = new Ball(board.w/2, board.h/2);
            
            var upKey = false;
            var downKey = false;
            var canvas = $('canvas')[0];
             
            callback();
            
            player1.mouseEventHandler();
            player2.keyEventHandler();  
         </script>
     </body> 
</html> 