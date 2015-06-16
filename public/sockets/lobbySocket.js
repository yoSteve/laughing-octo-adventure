$(function(){
  var lobbySocket = io('http://localhost:3000/lobby');
	// initilialize theGame on click in loby
	$('.play-game').on('click', function(e){
		console.log('starting game with, ', this.dataset.id);
		lobbySocket.emit('starting-game', this.dataset.id);
	});

  $('#start').on('click', function() {
  	lobbySocket.emit('start-game', function() {
  	});
  });

	// initilialize theGame on click in loby
	$('.play-game').on('click', function(e){
		console.log('starting game with, ', this.dataset.id);
		lobbySocket.emit('starting-game', this.dataset.id);
	});

  lobbySocket.on('match-message', function (user) {
    console.log("on the front and matched", user);
    $('#match').text("You have been matched with " + user + "\nclick to enter the game!");
    $(window).on('click', function() {
      window.location.href = '/game';
    });
  });
});
