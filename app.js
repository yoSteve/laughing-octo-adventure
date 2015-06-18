var koa = require('koa');

var app = koa();
var logger = require('koa-logger');
var serve = require('koa-static');
//var cookieParser = require('cookie-parser');
var bodyParser = require('koa-bodyparser');
var jade = require('koa-jade');
var session = require('koa-session');
//set up jade need to move to end (load processsss)
app.use(jade.middleware({
  viewPath: __dirname + '/views',
  debug: false,
  pretty: false,
  compileDebug: false,
  noCache: process.env === 'development'
}));
//set up mondoose
var dbConfig = require('./db');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

//require passport module
//parsers
app.use(logger('dev'));
app.use(bodyParser({
  detectJSON: function (ctx) {
    return /\.json$/i.test(ctx.path);
  }
}));
require('./passport/auth');
var passport = require('koa-passport');
app.keys = ['secrets'];
app.use(session(app));
//init passport
app.use(passport.initialize());
app.use(passport.session());

app.use(function *(){
  app.body = this.request.body;
});
//for loading local files in public
app.use(serve(__dirname, 'public'));
app.use(serve(__dirname, 'views'));
// connect-flash used for flashing messages
//var flash = require('connect-flash');
//app.use(flash());


//set upu routes with socket
var server = require('http').Server(app.callback()); 
server.listen(3000);
var io  = require('socket.io')(server);

//io.use(function(socket, next) {
//		sessionMiddleware(socket.request, {}, next);
//});
var router = require('./routes/index')(passport, io);
app.use(router.routes()).use(router.allowedMethods());
//404
//app.use(function*(next)){
//	res.type('text/plain')
//	res.status(404);
//	res.send('404 - you require more vespane gas');
//})

//500
//app.use(function(err,req,res,next){
//	console.error(err.stack);
//	res.type('text/plain');
//	res.status(500);
//	res.send('500 - we require more vespane gas');
//})

//dev error post
//if (app.get('env') === 'development'){
//	app.use(function(err, req, res, next) {
//		res.status(err.status || 500);
//		res.render('error', {
//			message: err.message,
//			error: err
//		});
//	});
//}
module.exports = app;
