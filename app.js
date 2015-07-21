var koa = require('koa');
var path = require('path');
var logger = require('koa-logger');
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views');
var session = require('koa-session-store');
var mongooseSession = require('koa-session-mongoose');
var passport = require('koa-passport');
var http = require('http');
var dbConfig = require('./db');
var mongoose = require('mongoose');
var socketIo  = require('socket.io');
var router = require('./routes/index');
var socket = require('./routes/socket');
var flash = require('koa-flash');
var app = koa();
app.use(bodyParser({
  detectJSON: function (ctx) {
    return /\.json$/i.test(ctx.path);
  }
}));

app.use(views('views', {
  default: 'jade'
}));

app.use(serve(__dirname + '/public'));
//set up jade need to move to end (load processsss)

app.use(logger());
//set up mondoose
mongoose.connect(dbConfig.url);

//require passport module
app.keys = ['secrets'];
app.use(session());
app.use(flash());
require('./passport/auth');
app.use(passport.initialize());
app.use(passport.session());
app.use(router(app));


var server = http.createServer(app.callback());
var io = socketIo(server);
socket(io, app, this);
var port = 80;
if(process.env.NODE_ENV = 'development') {
  port = 3000;
}
server.listen(process.env.PORT || port);
console.log('server listening on port ', port);
