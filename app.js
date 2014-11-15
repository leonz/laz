var express = require('express');
var compress = require('compression');
var hogan = require('hogan-express');
var contact = require('./contact');
var blog = require('./blog');
var publish = require('./publish');

var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

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
var oneMonth = 86400000 * 30;
app.use('/static', express.static(__dirname + '/static', { maxAge: oneMonth }));

app.get('/', function(req, res) {
	res.render('layout', {
		title: "Leon Zaruvinsky",
		adj: "home",
		partials: {
			header: "header-home",
			main: "home",
			script: "script"
		}
	});
});

app.use('/contact', function(req, res) {
	contact(req, res);
});

app.use('/blog', function(req, res) {
	blog(req, res);
});

app.use('/publish', function(req, res) {
	publish(req, res);
});


app.get('/clickgame', function(req, res) {
	res.send('clickgame.html');
});

app.post('/clickgame/yo', function(req, res) {
	if (req.body.username == null || req.body.uesrname == "") return;
	io.sockets.emit("yo", req.body.username);
});

// If all else fails, 404
app.use('/', function(req, res) {
	res.writeHead(404, {"Content-Type":"text/plain"});
	res.end("Sorry, there isn't anything here. Looks like you've hit a bad link (or are you snooping around?).");
});

var port = process.env.PORT || 8000;
http.listen(port); 
console.log('Server started on port ' + port);
