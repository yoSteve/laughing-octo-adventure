$(function(){
  var socket = io('http://localhost:3000/lobby');
	// initilialize theGame on click in loby
	$('.play-game').on('click', function(e){
		console.log('starting game with, ', this.dataset.id);
		socket.emit('starting-game', this.dataset.id);
	});

  $('#start').on('click', function() {
  	socket.emit('start-game', function() {
  	});
  });

  socket.on('match-message', function (user) {
    console.log("on the front and matched", user);
    $('#match').text("You have been matched with " + user[0] + "\nclick to enter the game!");
    $(window).on('click', function() {
      console.log('should buser someones id ', user[1])
      socket.emit('start-game', { userId: user[1]});
    });
  });

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
});
