function blog(req, res) {

	var db = require('./dbauth.js')();
	console.log("Database connection established");

	// Blog front page - show latest articles
	if (req.path === '/') {
		res.end('Coming soon');
	
	} else {
		var myPath = (req.path).substring(1); // strip leading slash
		db.collection('articles').findOne({ path : myPath }, function(err, result) {
			if (err) {
				console.log("Database Error: ", err);
				res.writeHead(500, {"Content-Type" : "text/plain"});
				res.end("Database error: " + err);
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
