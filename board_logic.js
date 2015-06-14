
var SIZE = 8;

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
  paintBoard(board);
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
  } 
}
