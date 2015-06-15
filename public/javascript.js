
$(function(){
	var socket = io();
	var map;
  var canvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d');
  $('#start').on('click', function() {
  	console.log("I cliecked");
  	socket.emit('start-game', function(board) {
  	});
  });
  socket.on('game-board', function(data) {
  	var board = data[0];
  	var matches = data[1];
  	paintBoard(board)
	  var body = document.getElementById('game-board');
	  body.appendChild(canvas);
  });
// Initialize the matrix.


  canvas.width = 408;
  canvas.height = 448;



  ////////////// Gameplay Variables /////////////////
      // take in variable map, and set up board for play
      var PLAYER1_DEFAULT_HP = 50,
          PLAYER2_DEFAULT_HP = 50,
          ENEMY_DEFAULT_HP   = 50;

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

      var meleRed    = 15,
          meleBlue   = 15,
          meleGreen  = 10,
          meleYellow = 10,
          meleBlack  =  5,
          meleWhite  =  5;

  //////////////// Game Play Order ////////////////////

  
  // updateManaPool();
  // updateEnemyHP();

  // boardSetup(board);
      // assignCrystalsToBoard(board);
      // refreshBoard(board); // includes findAllMatches()
      // zeroAllMana();
      // setHPtoDefault();
      // paintBoard(board);

  // BEGIN TURNS LOOP

      // player1Turn
          // **useManaSpell   // debits mana pool and updates enemy HP or player hp
      //     getMoveFromUser(map); // includes move logic. includes paintBoard()
      //     refreshBoard(map);  // awards mana to player and does mele attacks to enemy
      //     updateManaPool();
      //     updateEnemyHP(); // prints enemyHP to browser
      //     paintBoard(map);    
      // // end turn

      // // player2Turn
      //     // useManaSpell   // debits mana pool and updates enemy HP or player hp
      //     getMoveFromUser(map); // includes move logic. includes paintBoard()
      //     refreshBoard(map);  // awards mana to player and does mele attacks to enemy
      //     updateManaPool();
      //     updateEnemyHP(); // prints enemyHP to browser 
      //     paintBoard(map);    
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

  // function awardMana(cell) {
  //     switch (cell) {
  //         case 0 :
  //             manaRed++;
  //             break;
  //         case 1 :
  //             manaBlue++;
  //             break;
  //         case 2 :
  //             manaGreen++;
  //             break;
  //         case 3 :
  //             manaYellow++;
  //             break;
  //         case 4 :
  //             manaBlack++;
  //             break;
  //         case 5 :
  //             manaWhite++;
  //             break;
  //     }
  // }
  //shouldn't need, start game with 0 mana
  // function zeroAllMana() {
  //     manaRed    = 0,
  //     manaBlue   = 0,
  //     manaGreen  = 0,
  //     manaYellow = 0,
  //     manaBlack  = 0,
  //     manaWhite  = 0;    
  // }

  function updateManaPool() {
      $("#mana-red").text(mana[0]);
      $("#mana-blue").text(mana[1]);
      $("#mana-green").text(mana[2]);
      $("#mana-yellow").text(mana[3]);
      $("#mana-black").text(mana[4]);
      $("#mana-white").text(mana[5]);
  }

  function meleAttack(cell) {
      switch (cell) {
          case 0 :
              enemyHP = enemyHP - meleRed;
              break;
          case 1 :
              enemyHP = enemyHP - meleBlue;
              break;
          case 2 :
              enemyHP = enemyHP - meleGreen;
              break;
          case 3 :
              enemyHP = enemyHP - meleYellow;
              break;
          case 4 :
              enemyHP = enemyHP - meleBlack;
              break;
          case 5 :
              enemyHP = enemyHP - meleWhite;
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




  ///////////// Board Logic Functions ////////////////

  function boardSetup(board){
      zeroAllMana();
      setHPtoDefault();
      paintBoard(board);
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



});
