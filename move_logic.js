    // moves:    up == row negative
    //           down == row positive
    //           left == column negative
    //           right == column positive



    function findRow(cellRow) {
        // cell row is row index of board coordinates (board[col][row])
        var array = [];
        for (i = 0; i < SIZE; i++){
            array.push(board[i][cellRow]);
        }
        return array;
    }

    // cell is board coordinates (board[col][row])
    // spaces is number of spaces by which to shift values of array

    function rotateLeft(cell, spaces) {
        var array = findRow(cell);
        for (var i = 0; i <= spaces; i++) {
            var beg = array.shift();
            arra.push(beg);
        }
        return array;
    }

    function rotateRight(cell, spaces) {
        var array = findRow(cell);
        for (var i = 0; i<= spaces; i++) {
            var end = array.pop();
            array.unshift(end); 
        }
        return array;
    }


// column should be given as 'map[col]'' where 'col' is the target column
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
