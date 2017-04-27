var express = require('express');
var app = express();
var Twit = require('twit');

var ig = require('instagram-node').instagram();
ig.use({ access_token: '41453802.f59198a.da80739876174520943eb0861a4636a2' });
ig.use({ client_id: 'f59198a1cff94be480c7f5cdbb01c265',
         client_secret: '7edf6321383f48098ad6d7290a2dabf4' });

var T = new Twit({
  consumer_key:         'ZSriPSjaA3Aq4GSVzFdVlrD6C',
  consumer_secret:      'YjKsafdYkvGdHxolpnBmE4dAIcfTYIbt17O5PZIcfg9G4dJYLb',
  access_token:         '23419796-rPKRJ2jxEE8jaZEgtZFNv8rtTpgV3whrUI8QMc057',
  access_token_secret:  'RbJz8tDjWpH1Bf6YqAYrQqZu32AZvmak1gXvfpyRZKaRd',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

app.set('port', (process.env.PORT || 5000));

app.get('/twitter/', function(request, res) {
  res.setHeader('Content-Type', 'application/json');
  var query = request.query.tag;
  var count = request.query.count;
  T.get('search/tweets', { q: query, count: count }, function(err, data, response) {
    res.send(JSON.stringify(data));
  });

  /*
  var stream = T.stream('statuses/filter', { track: query })

  stream.on('tweet', function (tweet) {
    res.send(JSON.stringify(tweet));
  })*/
});

app.get('/insta/', function(request, res) {
  res.setHeader('Content-Type', 'application/json');
  var query = request.query.tag;
  ig.tag_search('query', function(err, result, remaining, limit) {
    res.send("blabla"+JSON.stringify(result)+JSON.stringify(err));
  });

});

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/*
var api = require('instagram-node').instagram();

app.configure(function() {
  // The usual...
});

api.use({
  client_id: YOUR_CLIENT_ID,
  client_secret: YOUR_CLIENT_SECRET
});

var redirect_uri = 'http://girlsday2017.herokuapp.com/handleauth';
exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('You made it!!');
    }
  });
};
// This is where you would initially send users to authorize
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
app.get('/handleauth', exports.handleauth);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
*/
/*
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
*/
