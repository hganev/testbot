var express = require('express');
var app = express();
// var pg = require('pg');

app.set('port', (process.env.PORT || 5000));

// app.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// })

app.get('/hellow', function(req, res) {
  res.send('world!');
});

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'test1234.') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');    
  }
});

app.post('/webhook1', function(req, res) {
  res.send('hello world');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

