

window.onload = function() {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    score = 0,
    level = 0,
    direction = 0;


// Initialize the matrix.
    var SIZE = 8;
    var map = new Array(SIZE);
    for (var i = map.length-1; i >= 0 ; i--) {
        map[i] = new Array(SIZE);
    }

    canvas.width = 408;
    canvas.height = 448;

    var body = document.getElementById('game-board');
    body.appendChild(canvas);

    function getRandomCrystal() {
        return Math.round(Math.random() * 5);
    }

    function assignCrystalsToMap (map) {
        for (var col = 0; col < map.length; col++) {
            for (var row = 0; row < map[col].length; row++) {
                map[col][row] = getRandomCrystal();
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

                    map[col][row] = null;
                    map[col-1][row] = null;
                    map[col-2][row] = null;
                }
            } 
        } return map;
    }

    function findMatchCol (map) {
        for (var col = 0; col < map.length; col++) {
            for (var row = 2; row < map[col].length; row++) {
                if (map[col][row] == map[col][row-1] && map[col][row] == map[col][row-2]) {
                    // award points/damage enemy here
                    map[col][row] = null;
                    map[col][row-1] = null;
                    map[col][row-2] = null;
                }
            } 
        }
        return map;
    }


    function findAllMatches(map) {
        findMatchRow(map);
        findMatchCol(map);
        return map;
    }

    function checkNullSpace(map) {
        console.log("inside CheckNullSpace");
        for (var col = SIZE -1; col >= 0; col--) {
            var nullCount = 0;
            for (var row = SIZE -1 ; row >= 0; row--) {
                if (map[col][row] == null) {
                    nullCount++;
                } else if (map[col][row] != null && nullCount > 0) { map[col][row + nullCount] = map[col][row];
                }
            } 
            for (var i = 0; i <= nullCount-1; i++) {
                map[col][i] = null;
            }
        } return map;
    }
    
    assignCrystalsToMap(map);

    findAllMatches(map);
    
    drawGame(map);
    debugger
    checkNullSpace(map);
    drawGame(map);


    function drawGame(map) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Start cycling the matrix
        for (var row = 0; row < map.length; row++) {
            for (var col = 0; col < map[0].length; col++) {
                if (map[row][col] === 0) {
                    ctx.fillStyle = 'red';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);
                } else if (map[row][col] === 1) {
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);          
                }else if (map[row][col] === 2) {
                    ctx.fillStyle = 'green';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);          
                }else if (map[row][col] === 3) {
                    ctx.fillStyle = 'yellow';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);          
                }else if (map[row][col] === 4) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);          
                }else if (map[row][col] === 5) {
                    ctx.fillStyle = 'floralwhite';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);          
                }else  {
                    ctx.fillStyle = 'grey';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);          
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