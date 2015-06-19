var koa = require('koa');
var path = require('path');
var logger = require('koa-logger');
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views');
var session = require('koa-session');
var passport = require('koa-passport');
var http = require('http');
var dbConfig = require('./db');
var mongoose = require('mongoose');
var socketIo  = require('socket.io');
var router = require('./routes/index');
var socket = require('./routes/socket');

var app = koa();
var server = http.Server(app.callback());

app.use(views('views', {
  default: 'jade'
}));

app.use(serve(__dirname + '/public'));
var io = socketIo(server);
socket(io);
//set up jade need to move to end (load processsss)

app.use(logger());
app.use(bodyParser({
  detectJSON: function (ctx) {
    return /\.json$/i.test(ctx.path);
  }
}));
//set up mondoose
mongoose.connect(dbConfig.url);

//require passport module
app.keys = ['secrets'];
app.use(session(app));
require('./passport/auth');
app.use(passport.initialize());
app.use(passport.session());
app.use(router(app));

app.listen(process.env.PORT || 3000);
console.log('server listening on port 3000');
