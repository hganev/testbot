var express = require('express');
var app = express();
// var pg = require('pg');
var bodyparser = require('body-parser')
// parse application/json
app.use(bodyParser.json())

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

// test
app.get('/hellow', function(req, res) {
  res.send('world!');
});

// to verify
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'test1234.') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');    
  }
});

// to receive messages
app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      console.log(text);
      // Handle a text message from this sender
    }
  }
  res.sendStatus(200);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

