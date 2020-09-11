const functions = require('firebase-functions');
const express = require('express');
const Twitter = require('twit');

const app = express();
const client = new Twitter({
  consumer_key:         'WertXglxEXr3GByU1C2AfU7CE',
  consumer_secret:      'lXiyXTwJ9I9O6uCjkgApXrHgFCxhGmHfz52HxBUYzaWqtzEXbQ',
  access_token:         '1295216073256697857-lE4JOgIWGcw11uladMlGTafspMVEoU',
  access_token_secret:  'L5gUcOdeBR2EgIoloRQZqXZr28bLin8R0THX0iaQ3S6BB',
});

app.use(require('cors')());
app.use(require('body-parser').json());

app.get('/home_timeline', (req, res) => {
    const params = { tweet_mode: 'extended', count: 50 };
   
    client
      .get(`statuses/home_timeline`, params)
      .then(timeline => {
         
        res.send(timeline);
      })
      .catch(error => {
      res.send(error);
    });
      
});

app.get('/mentions_timeline', (req, res) => {
    const params = { tweet_mode: 'extended', count: 50 };
   
    client
      .get(`statuses/mentions_timeline`, params)
      .then(timeline => {
       
        res.send(timeline);
      })
      .catch(error => {
      res.send(error);
    });
      
});

app.post('/post_tweet', (req, res) => {
 
  tweet = req.body;
   
    client
      .post(`statuses/update`, tweet)
      .then(tweeting => {
        console.log(tweeting);
         
        res.send(tweeting);
      })
 
     .catch(error => {
      res.send(error);
    });
       
});

app.get('/search_programas', (req, res) => {

  const params = { q: '(#APDP OR #APedidoDelPublico OR #BuenosAiresNonStop OR #Twitradioo) (from:caligulaelsanto OR from:twitradiooapp OR from:twitradioo OR from:manuchonq)', tweet_mode: 'extended', count: 100 };

	client
	  .get('search/tweets', params).then(timeline => {
         
        res.send(timeline);
      })
      .catch(error => {
      res.send(error);
	});

});

app.listen(5000, () => console.log('Server running'));

exports.tweets = functions.https.onRequest(Twitter);