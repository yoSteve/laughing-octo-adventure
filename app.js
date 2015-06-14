var express = require('express');

var app = express();
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//set up jade
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

//set up mondoose
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);
app.set('port', process.env.PORT || 3000);

//require passport module
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

//init passport
var initPassport = require('./passport/init');
initPassport(passport);

//parsers
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect-flash used for flashing messages
var flash = require('connect-flash');
app.use(flash());

//set upu routes with socket
var http = require('http').Server(app);
var io  = require('socket.io').listen(http);
var routes = require('./routes/index')(passport, io);
app.use('/', routes);

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

http.listen(app.get('port'), function(){
	console.log('Express has started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});

//dev error post
if (app.get('env') === 'development'){
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}
module.exports = app;
