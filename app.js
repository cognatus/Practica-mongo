
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var fulano = require('./models/Personaje');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.cookieParser('sabemos todo sobre ti'));
app.use(express.session());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//conecta a base de datos
mongoose.connect('mongodb://localhost/hola', function(error){
	if(error){
		throw error;		
	}else{
		console.log('Conectado a MongoDB');
	}
});

routes.Constructor(fulano);

function login(req, res, next){
	console.log(req.session.datos);
	next();
}


app.get('/', login, routes.index);
app.get('/create', routes.create);
app.post('/', routes.store);
app.get('/:id', routes.show);
app.get('/:id/edit', routes.edit);
app.put('/:id', routes.update);
app.delete('/:id', routes.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
