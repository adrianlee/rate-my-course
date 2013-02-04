var express = require('express'),
    hbs = require('hbs'),
    app = express();

var hbsHandler = require('./hbs');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    console.log('OMG');
    next();
  }
};

////////////////////////////////////////////////
// Express Configuration
////////////////////////////////////////////////
app.configure(function() {
  app.set('port', process.argv[2] || process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
  app.use(app.router);
  app.use(express.static(__dirname + '/public'), { maxAge: 300000 });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

////////////////////////////////////////////////
// Router
////////////////////////////////////////////////

app.get('/', function(req, res) {
  res.render('index');
});

////////////////////////////////////////////////
// HTTP Server
////////////////////////////////////////////////
app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
