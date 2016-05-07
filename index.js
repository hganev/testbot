var express = require('express');
var app = express();

app.post('/hellow', function(req, res) {
  res.send('world!');
});

app.post('/webhook', function(req, res) {
  res.send('hello world');
});