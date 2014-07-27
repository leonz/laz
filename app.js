var express = require('express');
var compress = require('compression');

var app = express();
app.use(compress());

app.use(function(request, response, next) {
	console.log('Request received for: ' + request.path);
	next();
});

// Get all static files
app.use('/', express.static(__dirname + '/static'));

app.use('/', function(request, response) {
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.write('Welcome to ' + request.path + '\n');
	response.end("Hello, world!");
});

app.listen(8000); 
