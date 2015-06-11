

window.onload = function() {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    score = 0,
    level = 0,
    direction = 0;


// Initialize the matrix.
    var map = new Array(8);
    for (var i = 0; i < map.length; i++) {
        map[i] = new Array(8);
    }

    canvas.width = 408;
    canvas.height = 448;

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);

    function assignCrystalsToMap (map) {
        for (var col = 0; col < map.length; col++) {
            for (var row = 0; row < map[col].length; row++) {
                var manaCrystal = Math.round(Math.random() * 5);
                map[col][row] = manaCrystal;
            } 
        }
        return map;
    }

    function destroy(cell) {
        cell = null;
    }

    function findMatchRow (map) {
        for (var col = 2; col < map.length; col++) {
            for (var row = 0; row < map[col].length; row++) {
                if (map[col][row] == map[col-1][row] && map[col][row] == map[col-2][row]) {
                    // award points/damage enemy here
                    console.log(map[col][row], map[col-1][row], map[col-2][row])
                    console.log("inside findMatchRow if condition")
                    map[col][row] = null;
                    map[col-1][row] = null;
                    map[col-2][row] = null;
                }
            } 
        }return map;
    }

    assignCrystalsToMap(map);

    findMatchRow(map);
    
    drawGame(map);

    function drawGame(map) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the border as well as the score
        // drawMain();

        // Start cycling the matrix
        for (var row = 0; row < map.length; row++) {
            for (var col = 0; col < map[0].length; col++) {
                if (map[row][col] === 0) {
                    ctx.fillStyle = 'red';
                    ctx.fillRect(row * 50, col * 50 + 20, 50, 50);
                } else if (map[row][col] === 1) {
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(row * 50, col * 50 + 20, 50, 50);          
                }else if (map[row][col] === 2) {
                    ctx.fillStyle = 'green';
                    ctx.fillRect(row * 50, col * 50 + 20, 50, 50);          
                }else if (map[row][col] === 3) {
                    ctx.fillStyle = 'yellow';
                    ctx.fillRect(row * 50, col * 50 + 20, 50, 50);          
                }else if (map[row][col] === 4) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(row * 50, col * 50 + 20, 50, 50);          
                }else if (map[row][col] === 5) {
                    ctx.fillStyle = 'white';
                    ctx.fillRect(row * 50, col * 50 + 20, 50, 50);          
                }else  {
                    ctx.fillStyle = 'grey';
                    ctx.fillRect(row * 50, col * 50 + 20, 50, 50);          
                }
            }
        } console.log("inside paint", map);
    }


    // function drawMain() 
    // {
    //     ctx.lineWidth = 2; // Our border will have a thickness of 2 pixels
    //     ctx.strokeStyle = 'black'; // The border will also be black

    //     // The border is drawn on the outside of the rectangle, so we'll
    //     // need to move it a bit to the right and up. Also, we'll need
    //     // to leave a 20 pixels space on the top to draw the interface.
    //     ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);

    //     ctx.font = '12px sans-serif';
    //     ctx.fillText('Score: ' + score + ' - Level: ' + level, 2, 12);
    // }
};