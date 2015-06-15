$(function() {
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

    ////////////// Gameplay Variables /////////////////
        // take in variable map, and set up board for play
        var PLAYER1_DEFAULT_HP = 250,
            PLAYER2_DEFAULT_HP = 250,
            ENEMY_DEFAULT_HP   = 250;

        var player1HP = PLAYER1_DEFAULT_HP,
            player2HP = PLAYER2_DEFAULT_HP,
            enemyHP   = ENEMY_DEFAULT_HP;

       // MANA POOL //
       var  manaRed    = 0,
            manaBlue   = 0,
            manaGreen  = 0,
            manaYellow = 0,
            manaBlack  = 0,
            manaWhite  = 0;

        var meleeRed    = 15,
            meleeBlue   = 15,
            meleeGreen  = 10,
            meleeYellow = 10,
            meleeBlack  =  5,
            meleeWhite  =  5;

    //////////////// Game Play Order ////////////////////

    boardSetup(map);
    updateManaPool();
    updateEnemyHP();

    // boardSetup(board);
        // assignCrystalsToBoard(board);
        // refreshBoard(board); // includes findAllMatches()
        // zeroAllMana();
        // setHPtoDefault();
        // paintBoard(board);

    // BEGIN TURNS LOOP

        // player1Turn
            // **useManaSpell   // debits mana pool and updates enemy HP or player hp
            getMoveFromUser(map); // includes move logic. includes paintBoard()
            refreshBoard(map);  // awards mana to player and does melee attacks to enemy
            updateManaPool();
            updateEnemyHP(); // prints enemyHP to browser
            paintBoard(map);    
        // end turn

        // player2Turn
            // useManaSpell   // debits mana pool and updates enemy HP or player hp
            getMoveFromUser(map); // includes move logic. includes paintBoard()
            refreshBoard(map);  // awards mana to player and does melee attacks to enemy
            updateManaPool();
            updateEnemyHP(); // prints enemyHP to browser 
            paintBoard(map);    
        // end turn

    //SET WIN-LOSE CONDITIONS TO BREAK LOOP
            // alert loser
            // alert winner & award prizes to winner

    // boardSetup(map);
    // LoopPlayersTurn(map, enemyHP);
        

    ////////////// Turn Logic and Win Condition //////////////

    function LoopPlayersTurn(board, enemyHealth) {
        do {
            player1Turn(enemyHealth);
            // player2Turn(player2);
        } while (enemyHP > 0);
        if (player1HP > 0) {
            alert("Player 1 wins");
        } else { 
            alert("Player 1 loses");
        }
        // if (player2HP > 0) {
        //     alert("Player 2 wins");
        // } else {
        //     alert ("Player 2 loses")
        // }
    }

    function player1Turn(board, enemyHealth){
        getMoveFromUser(board);
        findAllMatches(board);
        paintBoard(board);
    } 

    ///////////// Score Logic Functions /////////////////

    function awardMana(cell) {
        switch (cell) {
            case 0 :
                manaRed++;
                break;
            case 1 :
                manaBlue++;
                break;
            case 2 :
                manaGreen++;
                break;
            case 3 :
                manaYellow++;
                break;
            case 4 :
                manaBlack++;
                break;
            case 5 :
                manaWhite++;
                break;
        }
    }

    function zeroAllMana() {
        manaRed    = 0,
        manaBlue   = 0,
        manaGreen  = 0,
        manaYellow = 0,
        manaBlack  = 0,
        manaWhite  = 0;    
    }

    function updateManaPool() {
        $("#mana-red").text(manaRed);
        $("#mana-blue").text(manaBlue);
        $("#mana-green").text(manaGreen);
        $("#mana-yellow").text(manaYellow);
        $("#mana-black").text(manaBlack);
        $("#mana-white").text(manaWhite);
    }

    function meleeAttack(cell) {
        switch (cell) {
            case 0 :
                enemyHP = enemyHP - meleeRed;
                break;
            case 1 :
                enemyHP = enemyHP - meleeBlue;
                break;
            case 2 :
                enemyHP = enemyHP - meleeGreen;
                break;
            case 3 :
                enemyHP = enemyHP - meleeYellow;
                break;
            case 4 :
                enemyHP = enemyHP - meleeBlack;
                break;
            case 5 :
                enemyHP = enemyHP - meleeWhite;
                break;
        }
    }

    function updateEnemyHP() {
        $("#enemy-hp").text(enemyHP);
    }

    function setHPtoDefault() {
        enemyHP = ENEMY_DEFAULT_HP;
        playerHP = PLAYER1_DEFAULT_HP;
    }

    ///////////// Move Logic Functions /////////////////

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

    ///////////// Match Logic Functions ////////////////

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


    ///////////// Board Logic Functions ////////////////

    function boardSetup(board){
        assignCrystalsToBoard(board);
        refreshBoard(board);
        zeroAllMana();
        setHPtoDefault();
        paintBoard(board);
    }

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

    function refreshBoard (board) {
         for (var col = 0; col < SIZE; col++) {
            for (var row = 0; row < SIZE; row++) {
                do {
                    findAllMatches(board);
                    checkNullSpace(board);      
                    assignCrystalsToBoard(board);
                } while (board[col][row] == null);
            } 
        } 
        paintBoard(board);
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
            if (board[col][0] == null) {
                board[col][0] = getRandomCrystal;
            };
        } console.log("inside dropNewCrystals");
        return board;
    }
       


    function paintBoard(board) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Loops cycle through board. Switch picks color as per value of cell.
        for (var row = 0; row < board.length; row++) {
            for (var col = 0; col < board[0].length; col++) {
                switch (board[row][col]) {
                    case 0 :
                        ctx.fillStyle = 'red';
                        ctx.fillRect(row * 50, col * 50 + 20, 48, 48);
                        break;
                    case 1 : 
                        ctx.fillStyle = 'blue'; 
                        ctx.fillRect(row * 50, col * 50 + 20, 48, 48); 
                        break;         
                    case 2 :
                        ctx.fillStyle = 'green';
                        ctx.fillRect(row * 50, col * 50 + 20, 48, 48);
                        break;          
                    case 3 :
                        ctx.fillStyle = 'yellow';
                        ctx.fillRect(row * 50, col * 50 + 20, 48, 48);
                        break;          
                    case 4 :
                        ctx.fillStyle = 'black';
                        ctx.fillRect(row * 50, col * 50 + 20, 48, 48);
                        break;          
                    case 5 :
                        ctx.fillStyle = 'floralwhite';
                        ctx.fillRect(row * 50, col * 50 + 20, 48, 48);
                        break;          
                    default:
                        ctx.fillStyle = 'grey';
                        ctx.fillRect(row * 50, col * 50 + 20, 48, 48);          
                }
            }
        } console.log("painting the board", board);
    }



};
