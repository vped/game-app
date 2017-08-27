var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'src')));

app.get('/*', function(req, res){
    console.log('here');
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

var port = process.env.PORT || 5000;

app.listen(port);

console.log('server started '+port);