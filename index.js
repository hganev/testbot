var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/hellow', function(req, res) {
  res.send('world!');
});

app.post('/webhook', function(req, res) {
  res.send('hello world');
});

app.post('/webhook1', function(req, res) {
  res.send('hello world');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

