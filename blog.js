function blog(req, res) {

	var db = require('./dbauth.js')();
	console.log("Database connection established");

	// Blog front page - show latest articles
	if (req.path === '/') {
		res.end('Coming soon');
	
	} else {
	// Article page
		var myPath = (req.path).substring(1); // strip leading slash

		db.collection('articles').findOne({ path : myPath }, function(err, result) {
			if (err) {
				console.log("Database Error: ", err);
				res.writeHead(500, {"Content-Type" : "text/plain"});
				res.end("Database error: " + err);
				return;
			}

			if (result === null) {
				console.log("Article not found for request path: " + myPath);
				res.writeHead(404, {"Content-Type" : "text/plain"});
				res.end("Article not found for request path: " + myPath);
				return;
			}
	
			res.render('layout', {
				title: result.title + " - Leon Zaruvinsky",
				adjs: "pages",
				article: result,
				partials: {
					header: "header",
					main: "blog-article",
				}
			});
		});
	}
		
	


}

module.exports = blog
