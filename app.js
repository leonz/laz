var express = require('express');
var compress = require('compression');
var hogan = require('hogan-express');
var blog = require('./blog');

var app = express();

app.set('view engine', 'html');
app.set('layout', 'layout');
app.enable('view cache');
app.engine('html', hogan);
app.set('views', __dirname + '/views');

app.use(compress());

app.use(function(request, response, next) {
	console.log('Request received for: ' + request.path);
	next();
});


// Serve static files first (JS, CSS, images)
app.use('/static', express.static(__dirname + '/static'));

// Serve site pages

app.get('/', function(req, res) {
	res.render('layout', {
		title: "Hello!",
		partials: {
			body: "index"
		}
	});
});

app.get('/about', function(req, res) {
	res.render('layout', {
		title: "About Me",
		partials: {
			body: "about"
		}
	});
});

// Serve the blog
app.use('/blog', function(req, res) {
	blog(req, res);
});

// If all else fails, 404
app.use('/', function(req, res) {
	res.writeHead(404, {"Content-Type":"text/plain"});
	res.end("404 not found");
});

app.listen(8000); 
