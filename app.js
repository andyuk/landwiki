var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	mongoose = require('mongoose');
	config = require('./config.json'),
	land = require('./routes/land');

var MONGO_URI = (process.env.MONGOHQ_URL || config.mongo.uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/preview', routes.map);
app.get('/land/:id', land.detail);

mongoose.connect(MONGO_URI, function(err) {
  if (err) throw err;
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
