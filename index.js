var express = require('express');
var app = express();
// var pg = require('pg');
var bodyparser = require('body-parser')
// parse application/json
app.use(bodyparser.json())

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
      
	  sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
    }
  }
  res.sendStatus(200);
});

var token = "EAAI5xetnlN8BANC9Uef3aXZBUVyDjNcdo9scNTTjlZAQZAdJwwcAeo3u4LNPkGrwcwerBVVRd6yxZBILz2kiQZB6rhlx7tal8iFbA6ZBVIIaPZApcmH9GNiJfsGZCIGZCYKtTaRota1ZBu4ZBjOUmjYhwMZADjBdYIgtZAuCJ9ZC9uZA3pN5gZDZD";

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

