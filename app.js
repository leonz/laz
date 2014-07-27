var express = require('express');
var app = express();


app.use(function(request, response, next) {
	console.log('Request received for: ' + request.path);
	next();
});

app.use('/', function(request, response) {
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.end("Hello, world!");
});

app.listen(8000); 
