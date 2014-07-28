function blog(req, res) {
	res.write('You are now entering blog territory.\n');
	res.end('View path (for use in articles): ' + req.path);

	var db = require('./dbauth.js');
	db.blog.find({"color":"red"}, function(err, records) {
		if (err) {
			console.log("Database error");
			res.writeHead(500, {"Content-Type":"text/plain"});
			res.end("500: Database Error");
			return;
		}
		console.log(records);
	});

}

module.exports = blog
