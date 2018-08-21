var express = require('express');
var app = express();
var request = require('request');
var favicon = require('serve-favicon')
var path = require('path')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('search');
});

app.get('/results', function(req, res){
  var query = req.query.search;
  var url = `http://omdbapi.com/?s=${query}&apikey=thewdb`;
  request(url, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render('results', {data: data});
    }
  });
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('*', function(req, res){
  res.render('notfound');
})

app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log('Movie App has started');
});
