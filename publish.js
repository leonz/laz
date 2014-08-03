function publish(req, res) {
	res.write('This will be the publishing control panel for the blog.\n');
	res.end();

	var db = require('./dbauth.js')();
	console.log("Database connection established");

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

module.exports = publish
