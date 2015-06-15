    function findAllMatches(board) {
        findBestMatchCol(board);
        findBestMatchRow(board);
        return board;
    }

   function findBestMatchRow (board) {
        for (var col = 2; col < board.length; col++) {
            for (var row = 0; row < board[col].length; row++) {
                if ( findMatch3Row(board, col, row) ) {
                    board[col-2][row] = null;
                    board[col-1][row] = null;
                    board[col][row]   = null;
                    if ( findMatch4Row(board, col. row) ) {
                        board[col-3][row] = null;
                        if ( findMatch5Row(board, col, row) ) {
                            board[col-4][row] = null; 
                        }
                    }
                }  
            } 
        } 
        return board;
    }



    function findMatch3Row(board, col, row) {
        if ( board[col][row] == board[col-1][row] 
            && board[col][row] == board[col-2][row] ) {
            // award points/damage enemy here
            return true;
        }
        return false;
    }

    function findMatch4Row (board, col, row) {
        if ( col >= 3 
            && findMatch3Row(board, col, row) 
            && board[col][row] == board[col-3][row] ) {
                // award points/damage enemy here
                return true;
        }
        return false;
    }

    function findMatch5Row (board, col, row) {
        if ( col >= 4 
        && findMatch4Row(board, col, row) 
        && board[col][row] == board[col-4][row] ) {
            // award points/damage enemy here
            return true;
        }
        return false;
    }

    function findBestMatchCol(board){
        for (var col = 0; col < board.length; col++) {
            for (var row = 2; row < board[col].length; row++) {
                if ( findMatch3Col(board, col, row) ) {
                    board[col][row-2] = null;
                    board[col][row-1] = null;
                    board[col][row]   = null;
                    if ( findMatch4Col(board, col, row) ) {
                        board[col][row-3] = null;
                        if ( findMatch3Col(board, col, row) ) {
                            board[col][row-4] = null;  
                        }
                    }
                }
            }
        }
        return board;
    }


    function findMatch3Col (board, col, row) {
        if ( board[col][row] == board[col][row-1] 
        && board[col][row] == board[col][row-2] ) {
            // award points/damage enemy here
            return true;
        }
        return false;
    } 

    function findMatch4Col (board, col, row) {
        if ( board[col][row] >= board[col][3] 
        && findMatch3Col(board, col, row) 
        && board[col][row] == board[col][row-3] ) {
            // award points/damage enemy here
            return true;
        }
        return false;
    }

    function findMatch5Col (board, col, row) {
        if ( board[col][row] >= board[col][4] 
        && findMatch4Col(board, col, row) 
        && board[col][row] == board[col][row-4] ) {
            // award points/damage enemy here
            return true;
        }
        return false;
    }