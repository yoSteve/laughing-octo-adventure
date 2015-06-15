window.onload = function() {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    var SIZE = 8;
    var map = new Array(SIZE);
    for (var i = map.length-1; i >= 0 ; i--) {
        map[i] = new Array(SIZE);
    }

    canvas.width = 408;
    canvas.height = 448;

    var body = document.getElementById('game-board');
    body.appendChild(canvas);

    
function boardLogic(board){
  assignCrystalsToBoard(board);
  refreshBoard(board); 
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
