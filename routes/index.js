var express = require('express');
var router = express.Router();
var SIZE = 8;
var matches = new Array(6);
var mana = new Array(6);
var isAuthenticated = function(req, res, next) {
	//checks to see if session is authenticated and
	//lets through to their request
	//else redirects to login (home)
	if(req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = function(passport, io){
	router.get('/', function(req, res) {
		res.render('index', {message: req.flash('message')});
	});

	//google login redirects to google, google directs back
	router.get('/auth/google', passport.authenticate('google-openidconnect'));

	router.get('/auth/google/response',
		passport.authenticate('google-openidconnect', {
			successRedirect: '/game',
			failureRedirect: '/'
		}));
		//handle login
	router.post('/login',passport.authenticate('login', {
			successRedirect: '/game',
			failureRedirect: '/',
			failureFlash: true
	}));

	//handle Registration
	router.post('/signup', passport.authenticate('signup', {
			successRedirect: '/game',
			failureRedirect: '/',
			failureFlash : true
	}));

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	router.get('/game', isAuthenticated, function(req, res) {
		res.render('game', {user: req.user });
	});

	io.on('connection', function(socket) {
		console.log('somebody is connected!!!');
		socket.on('disconnect', function() {
			console.log('somebody disconnected');
		});
		//start game board
		socket.on('start-game', function(err) {
			// if (err)
			// 	return err;
			console.log("we've made it this far");
		  var gameBoard = new Array(SIZE);
		  for (var i = gameBoard.length-1; i >= 0 ; i--) {
	      gameBoard[i] = new Array(SIZE);
  		}
  		assignCrystalsToBoard(gameBoard);
  		refreshBoard(gameBoard);
  		mana.map(function(mana) { mana = 0 });
			socket.emit('game-board', [gameBoard, mana]);
		})
	});
	
	return router;

  function boardSetup(board){
      assignCrystalsToBoard(board);
      refreshBoard(board);
      // zeroAllMana();
      // setHPtoDefault();
      // paintBoard(board);
  }
///////GAME BOARD LOGICE//////////////////
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
      return board;
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
}
