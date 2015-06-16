$(function(){ 
  var gameSocket = io('http://localhost:3000/game');
 gameSocket.on('game-board', function(data) {
    var board = data[0];
    var mana = data[1];
    paintBoard(board)
    updateManaPool(mana);
    var body = document.getElementById('game-board');
    body.appendChild(canvas);
  });

  $('#move').submit(function(e){
    e.preventDefault();
    gameSocket.emit('move', $('#move').serializeArray());
  });

  gameSocket.on('return-move', function(data) {
    var board = data[0];
    var mana = data[1];
    paintBoard(board)
    updateManaPool(mana);
    var body = document.getElementById('game-board');
    body.appendChild(canvas);
  });
});
