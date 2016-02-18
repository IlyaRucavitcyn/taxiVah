var express = require('express');
var path = require('path');
var app = express();

//configure app

//use middleware
app.use('/', express.static(__dirname + '/'));
//define routs

app.listen(3000, function () {
  console.log('Server running at http://127.0.0.1:3000/');
});

// console.log('Server running at http://127.0.0.1:3000/');
