

window.onload = function() {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

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

    ////////////// Gameplay Functions /////////////////
        // take in variable map, and set up board for play
       var score = 0;

        boardLogic(map);
        TakeATurn(map);


        
        
        //next will need turn logic (include move logic)

    ///////////// Move Logic Functions /////////////////

    var iColumn;
    var iRow;
    var fColumn;
    var fRow;
  
    function MoveCheckHor(iCol, fCol) {
        return iCol - fCol; 
    }

    function MoveCheckVert(iRow, fRow) {
        return iRow - fRow;
    }

    function getInitialCoords() {
        var initialPos = prompt("Enter inital Position", "col,row");
        iColumn = initialPos.slice(0,1);
        iRow = initialPos.slice(-1);
    }

    function getFinalCoords(){
        var finalPos = prompt("Enter final Position", "col, row");
        fColumn = finalPos.slice(0,1);
        fRow = finalPos.slice(-1);

    }

    function TakeATurn(board) {
        var initialPos = prompt("Enter inital Position", "col,row");
        iColumn = initialPos.slice(0,1);
        iRow = initialPos.slice(-1);

        var finalPos = prompt("Enter final Position", "col, row");
        fColumn = finalPos.slice(0,1);
        fRow = finalPos.slice(-1);

        var Hmove = MoveCheckHor(iColumn, fColumn);
            Vmove = MoveCheckVert(iRow, fRow);

        console.log("Hmove: " + Hmove);
        console.log("Vmove: " + Vmove);

        if (Hmove < 0 ) {
            Hmove = (-1 * Hmove);
            rotateRight(board, iRow, Hmove);
            paintBoard(board);
        } else if (Hmove > 0) {
            rotateLeft(board, iRow, Hmove);
            paintBoard(board);
        } else if (Vmove < 0) {
            Vmove = (-1 * Vmove);
            rotateDown(board[iColumn], Vmove);
            paintBoard(board);
        } else if (Vmove > 0) {
            rotateUp(board[iColumn], Vmove);
            paintBoard(board);
        }
        refreshBoard(board);

    }


    //takes intial & final coords, determines direction & distance of movement
    function defineMovement(iCol, iRow, fCol, fRow) {
        var horDist = iCol - fCol;
        var vertDist = iRow - fRow;
        if (horDist < 0) {
            console.log("moving right " + horDist + " spaces.");
        } else if (horDist > 0) {
            console.log("moving left " + horDist + " spaces.");
        } else if (vertDist < 0 ) {
            console.log("moving down " + vertDist + " spaces.") 
        } else if (vertDist > 0) {
            console.log("moving up " + vertDist + " spaces.")
        }
    }


    function findRow(board, row) {
        // row is row index of board coordinates (board[col][row])
        var array = [];
        for (i = 0; i < SIZE; i++){
            array.push(board[i][row]);
        }
        console.log("findRow looks like: " + array);
        return array;
    }

    // cell is board coordinates (board[col][row])
    // moves is number of spaces by which to shift values of array

    function rotateLeft(board, row, moves) {
        var array = findRow(board, row);
        console.log("inside rotateLeft. array: " + array);
        for (var i = 0; i < moves; i++) {
            var beg = array.shift();
            array.push(beg);
        }
        for (var i = 0; i < SIZE; i++) {
            board[i][row] = array[i];
        }
    }

    function rotateRight(board, row, moves) {
        var array = findRow(board, row);
        for (var i = 0; i < moves; i++) {
            var end = array.pop();
            array.unshift(end); 
        }
         for (var i = 0; i < SIZE; i++) {
            board[i][row] = array[i];
        }
    }


    // column should be given as map[col] where col is the target column
    function rotateUp(column, moves) {
        for (var i = 0; i < moves; i++) {
            var beg = column.shift();
            column.push(beg);
        }
    }

    function rotateDown(column, moves) {
        for (var i = 0; i < moves; i++) {
            var end = column.pop();
            column.unshift(end);
        }
    }



    ///////////// Board Logic Functions ////////////////

    function getRandomCrystal() {
        return Math.round(Math.random() * 5);
    }

    function assignCrystalsToBoard (board) {
        for (var col = 0; col < board.length; col++) {
            for (var row = 0; row < board[col].length; row++) {
                if (board[col][row] == null) {
                    board[col][row] = getRandomCrystal();
                }
            } 
        }
        return board;
    }

    function destroy(cell) {
        cell = null;
    }

    function findMatchRow (board) {
        for (var col = 2; col < board.length; col++) {
            for (var row = 0; row < board[col].length; row++) {
                if (board[col][row] == board[col-1][row] && board[col][row] == board[col-2][row]) {
                    // award points/damage enemy here

                    board[col][row] = null;
                    board[col-1][row] = null;
                    board[col-2][row] = null;
                }
            } 
        } return board;
    }

    function findMatchCol (board) {
        for (var col = 0; col < board.length; col++) {
            for (var row = 2; row < board[col].length; row++) {
                if (board[col][row] == board[col][row-1] && board[col][row] == board[col][row-2]) {
                    // award points/damage enemy here
                    board[col][row] = null;
                    board[col][row-1] = null;
                    board[col][row-2] = null;
                }
            } 
        }
        return board;
    }


    function findAllMatches(board) {
        findMatchRow(board);
        findMatchCol(board);
        return board;
    }

    function checkNullSpace(board) {
        for (var col = SIZE -1; col >= 0; col--) {
            var nullCount = 0;
            for (var row = SIZE -1 ; row >= 0; row--) {
                if (board[col][row] == null) {
                    nullCount++;
                } else if (board[col][row] != null && nullCount > 0) { board[col][row + nullCount] = board[col][row];
                }
            } 
            for (var i = 0; i <= nullCount-1; i++) {
                board[col][i] = null;
            }
        } return board;
    }

    function dropNewCrystals(board) {
        for (var col = 0; col < SIZE; col++) {
            for (var row = 0; row < SIZE; row++) {
                if (board[col][row] == null) {
                    board[col][row] = getRandomCrystal();
                }
            };
        } console.log("inside dropNewCrystals");
        return board;
    }
       
    function refreshBoard (board) {
         for (var col = 0; col < SIZE; col++) {
            for (var row = 0; row < SIZE; row++) {
                do {
                    findAllMatches(board);
                    checkNullSpace(board);      
                    assignCrystalsToBoard(board);
                } while (board[col][row] == null);
            } 
        } paintBoard(board);
    }

    function boardLogic(board){
        assignCrystalsToBoard(board);
        refreshBoard(board); 
        // paintBoard(board);
    }


    function paintBoard(board) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Start cycling the matrix
        for (var row = 0; row < board.length; row++) {
            for (var col = 0; col < board[0].length; col++) {
                if (board[row][col] === 0) {
                    ctx.fillStyle = 'red';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);
                } else if (board[row][col] === 1) {
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);          
                }else if (board[row][col] === 2) {
                    ctx.fillStyle = 'green';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);          
                }else if (board[row][col] === 3) {
                    ctx.fillStyle = 'yellow';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);          
                }else if (board[row][col] === 4) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);          
                }else if (board[row][col] === 5) {
                    ctx.fillStyle = 'floralwhite';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);          
                }else  {
                    ctx.fillStyle = 'grey';
                    ctx.fillRect(row * 50, col * 50 + 20, 48, 48);          
                }
            }
        } console.log("painting the board", board);
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