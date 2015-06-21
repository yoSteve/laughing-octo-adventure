$(function(){
  // C
// initilialize theGame on click in loby
  $('.play-game').on('click', function(e){
    console.log('starting game with, ', this.dataset.id);
    socket.emit('starting-game', this.dataset.id);
  });

  $('#start').on('click', function() {
  	socket.emit('start-game', function() {
  	});
  });

  socket.on('match-message', function (data) {
    console.log("on the front and matched", data);
    $('#match').text("You have been matched with \nclick to enter the game!");
    $(window).on('click', function() {
      console.log('room id (game id): ', data);
      socket.emit('start-game', { gameId: data});
      socket.emit('gameJoin');
      $(window).off('click');
    });
  });

  socket.on('refresh-board', function(data) {
    console.log(data);
    $('#match').text("you have been matched\n home: " + data['home'] + "\naway: " + data['away'] + "\n game board: " + data['gameBoard']);
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
