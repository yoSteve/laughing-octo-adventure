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
                awardMana(board[col][row]);
                awardMana(board[col-1][row]);
                awardMana(board[col-2][row]);
                meleeAttack(board[col][row]);
                meleeAttack(board[col-1][row]);
                meleeAttack(board[col-2][row]);
                return true;
        }
        return false;
    }

    function findMatch4Row (board, col, row) {
        if (col >= 3 
            && findMatch3Row(board, col, row) 
            && board[col][row] == board[col-3][row] ) {
                awardMana(board[col-3][row]);
                meleeAttack(board[col-3][row]);
                return true;
        }
        return false;
    }

    function findMatch5Row (board, col, row) {
        if ( col >= 4 
        && findMatch4Row(board, col, row) 
        && board[col][row] == board[col-4][row] ) {
            awardMana(board[col-4][row]);
            meleeAttack(board[col-4][row]);
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
            awardMana(board[col][row]);
            awardMana(board[col][row-1]);
            awardMana(board[col][row-2]);
            meleeAttack(board[col][row]);
            meleeAttack(board[col][row-1]);
            meleeAttack(board[col][row-2]);
            return true;
        }
        return false;
    } 

    function findMatch4Col (board, col, row) {
        if ( board[col][row] >= board[col][3] 
        && findMatch3Col(board, col, row) 
        && board[col][row] == board[col][row-3] ) {
            awardMana(board[col][row-3]);
            meleeAttack(board[col][row-3]);
            return true;
        }
        return false;
    }

    function findMatch5Col (board, col, row) {
        if ( board[col][row] >= board[col][4] 
        && findMatch4Col(board, col, row) 
        && board[col][row] == board[col][row-4] ) {
            awardMana(board[col][row-4]);
            meleeAttack(board[col][row-4]);
            return true;
        }
        return false;
    }

