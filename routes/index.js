var isAuthenticated = function(){}
var passport = require('koa-passport');

function gen(app){
  var router = require('koa-router')(app);
  //init passport
	router.get('/', function *(next) {
    console.log("ashdflakjdshfluaihsdlisuhdflahhhhhhaa");
    //redirects logged in users to the lobby, i
    //but assigns the new socket to the useri
    // socket id, may run into problems if 
    // user has multiple windows or if the user
    // disconnects and reconnects, maybe store
    // current game in array and on connect have
    // the user join the current game,  would then
    // have to make user the game is active, or have
    // the user select from a list of active games 
    // if we want them to be able to be playing multiple games at once.
      yield this.render('index');

	});

	//google login redirects to google, google directs back
	router.get('/auth/google', passport.authenticate('google'));

	router.get('/auth/google/response',
      passport.authenticate('google', {
        failureRedirect: '/'
      }),
      function *(next) {
        this.redirect('/game_canvas');
      }
  );
		//handle login
	router.post('/login', passport.authenticate('local'), function* (next) {
    yield this.render('game_canvas');
	});

	//handle Registration
	router.post('/signup', passport.authenticate('local', {
			successRedirect: '/game_canvas',
			failureRedirect: '/',
	}));

	router.get('/logout', function *(next) {
		this.logout();
		this.redirect('/');
	});

	router.get('/game', isAuthenticated, function *(next) {
		res.render('game', { user: req.user });
	});

	router.get('/game_canvas', function *(next) {
		yield this.render('game_canvas');
	});

//socket work using lobby namespace
  return router.routes();
}
module.exports = gen;
