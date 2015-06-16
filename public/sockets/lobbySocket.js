$(function(){
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
});
