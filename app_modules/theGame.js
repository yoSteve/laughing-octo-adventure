module.exports = {
  setUp: function() {
    boardSetup(gameBoard);
    return [gameBoard, mana];
  },
  move: function(initPos, finPos) {
    initialPos = initPos;
    finalPos = finPos;
    getMoveFromUser();
    findAllMatches(gameBoard);
    refreshBoard(gameBoard);
    addMana();
    zeroMatches();
    return [gameBoard, mana];
  }
};
  var SIZE = 8;
  var matches = new Array(6);
  var mana;
  var gameBoard = new Array(SIZE);
  var initialPos, finalPos;
  for (var i = gameBoard.length-1; i >= 0 ; i--) {
    gameBoard[i] = new Array(SIZE);
  }


  function boardSetup(board){
      mana = new Array(6);
      assignCrystalsToBoard(board);
      refreshBoard(board);
      zeroMana(mana);
      console.log(mana);
  }

  function zeroMana(mana){
  	var i = 5;
  	while(i >= 0){
  		mana[i] = 0;
  		i--;
  	}
  }

  function addMana() {
  	var i = 5;
  	while(i >= 0){
  		mana[i] += matches[i];
  		i--;
  	}
  }

  function zeroMatches(){
  	var i = 5;
  	while(i >= 0){
  		matches[i] = 0;
  		i--;
  	}
  }
  ///////GAME BOARD LOGIC//////////////////
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
    } 
  }

  function dropNewCrystals(board) {
      for (var col = 0; col < SIZE; col++) {
          if (board[col][0] == null) {
              board[col][0] = getRandomCrystal;
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
      } 
  }
    ///////////// Match Logic Functions ////////////////

  function findAllMatches(board) {
      findBestMatchCol(board);
      findBestMatchRow(board);
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
  }

  function findMatch3Row(board, col, row) {
      if ( board[col][row] == board[col-1][row] 
          && board[col][row] == board[col-2][row] ) {
              matches[(board[col][row])]++;
              matches[(board[col-1][row])]++;
              matches[(board[col-2][row])]++;
              return true;
      }
      return false;
  }

  function findMatch4Row (board, col, row) {
      if (col >= 3 
          && findMatch3Row(board, col, row) 
          && board[col][row] == board[col-3][row] ) {
              matches[(board[col-3][row])]++;

              return true;
      }
      return false;
  }

  function findMatch5Row (board, col, row) {
      if ( col >= 4 
      && findMatch4Row(board, col, row) 
      && board[col][row] == board[col-4][row] ) {
          matches[(board[col-4][row])]++;
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
  }


  function findMatch3Col (board, col, row) {
      if ( board[col][row] == board[col][row-1] 
      && board[col][row] == board[col][row-2] ) {
          matches[(board[col][row])]++;
          matches[(board[col][row-1])]++;
          matches[(board[col][row-2])]++;
          return true;
      }
      return false;
  } 

  function findMatch4Col (board, col, row) {
      if ( board[col][row] >= board[col][3] 
      && findMatch3Col(board, col, row) 
      && board[col][row] == board[col][row-3] ) {
          matches[(board[col][row-3])]++;
          return true;
      }
      return false;
  }

  function findMatch5Col (board, col, row) {
      if ( board[col][row] >= board[col][4] 
      && findMatch4Col(board, col, row) 
      && board[col][row] == board[col][row-4] ) {
          matches[(board[col][row-4])]++;
          return true;
      }
      return false;
  }

  //////////Determinging Move//////
  var iColumn,
    iRow,
    fColumn,
    fRow;

  function getInitialCoords() {
      iColumn = initialPos.slice(0,1);
      iRow = initialPos.slice(-1);
  }

  function getFinalCoords() {
      fColumn = finalPos.slice(0,1);
      fRow = finalPos.slice(-1);

  }

  function getMoveFromUser() {
      getInitialCoords(),
      getFinalCoords();

      var Hmove = iColumn - fColumn,
          Vmove = iRow - fRow;

      console.log("Hmove: " + Hmove);
      console.log("Vmove: " + Vmove);

      if (Hmove < 0 ) {
          Hmove = (-1 * Hmove);
          rotateRight(gameBoard, iRow, Hmove);
      } else if (Hmove > 0) {
          rotateLeft(gameBoard, iRow, Hmove);
      } else if (Vmove < 0) {
          Vmove = (-1 * Vmove);
          rotateDown(gameBoard[iColumn], Vmove);
      } else if (Vmove > 0) {
          rotateUp(gameBoard[iColumn], Vmove);
      }
  }

  /////////Making Move/////////
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

