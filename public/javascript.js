
$(function(){
	var socket = io('http://localhost:3000/game');

	var map;
  var canvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d');
  $('#start').on('click', function() {
  	socket.emit('start-game', function() {
  	});
  });

  $('#join-waiting').on('click', function(e) {
  	e.preventDefault();
  	socket.emit('waiting');
  })

  socket.on('game-board', function(data) {
  	var board = data[0];
  	var mana = data[1];
  	paintBoard(board)
  	updateManaPool(mana);
	  var body = document.getElementById('game-board');
	  body.appendChild(canvas);
  });

  $('#move').submit(function(e){
  	e.preventDefault();
  	socket.emit('move', $('#move').serializeArray());
  });

  socket.on('return-move', function(data) {
  	var board = data[0];
  	var mana = data[1];
  	paintBoard(board)
  	updateManaPool(mana);
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

      paintBoard(board);
  } 

  ///////////// Score Logic Functions /////////////////

  function updateManaPool(mana) {
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







  ///////////// Paint Board ////////////////


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
