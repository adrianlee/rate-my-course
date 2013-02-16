var express = require('express'),
    app = express();

////////////////////////////////////////////////
// Express Configuration
////////////////////////////////////////////////
app.set('port', process.argv[2] || process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'), { maxAge: 300000 });
app.use(express.errorHandler());

////////////////////////////////////////////////
// Router
////////////////////////////////////////////////

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/templates/index.html');
});

////////////////////////////////////////////////
// HTTP Server
////////////////////////////////////////////////
app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
