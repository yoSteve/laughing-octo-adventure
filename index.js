var express = require('express');

var app = express();

app set('port', process.env.PORT || 3000);

//404
app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - you require more vespane gas');
})

//500
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - we require more vespane gas');
})

app.listen(app.get('port'), function(){
	console.log('Express has started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});
