var iColumn,
    iRow,
    fColumn,
    fRow;

function getInitialCoords() {
    var initialPos = prompt("Enter inital Position", "col,row");
    iColumn = initialPos.slice(0,1);
    iRow = initialPos.slice(-1);
}

function getFinalCoords() {
    var finalPos = prompt("Enter final Position", "col, row");
    fColumn = finalPos.slice(0,1);
    fRow = finalPos.slice(-1);

}

function getMoveFromUser(board) {
    getInitialCoords(),
    getFinalCoords();

    var Hmove = iColumn - fColumn,
        Vmove = iRow - fRow;

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
}


//takes intial & final coords, determines direction & distance of movement
// function defineMovement(iCol, iRow, fCol, fRow) {
//     var horDist = iCol - fCol;
//     var vertDist = iRow - fRow;
//     if (horDist < 0) {
//         console.log("moving right " + horDist + " spaces.");
//     } else if (horDist > 0) {
//         console.log("moving left " + horDist + " spaces.");
//     } else if (vertDist < 0 ) {
//         console.log("moving down " + vertDist + " spaces.") 
//     } else if (vertDist > 0) {
//         console.log("moving up " + vertDist + " spaces.")
//     }
// }


function findRow(board, row) {
    // row is row index of board coordinates (board[col][row])
    var array = [];
    for (i = 0; i < SIZE; i++){
        array.push(board[i][row]);
    }
    console.log("findRow looks like: " + array);
    return array;
}


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
