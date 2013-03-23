var express = require('express'),
    request = require('request'),
    app = express();

////////////////////////////////////////////////
// Express Configuration
////////////////////////////////////////////////
app.set('port', process.argv[2] || process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'), { maxAge: 300000 });
app.use(app.router);
app.use(express.errorHandler());

////////////////////////////////////////////////
// Router
////////////////////////////////////////////////

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/templates/index.html');
});


app.post('/delete/:user', function(req, res) {
  console.log(req.param('user'));

  var options = {
    method: "delete",
    url: "https://api.parse.com/1/users/" + req.param('user'),
    headers: {
      "X-Parse-Application-Id": "mWF6nv6fLZx5l0FOYW8SSxfE07fcA4kMHPfl2UzR",
      'X-Parse-Master-Key': 'd23P2aFJ1nYQMYZeXmC4ryMSXfL4PhwUPEs9S3jv'
    }
  }

  request(options, function (err, res, body) {
    console.log(err);
    console.log(body);
  });
});

////////////////////////////////////////////////
// HTTP Server
////////////////////////////////////////////////
app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
