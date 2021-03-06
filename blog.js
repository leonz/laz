function blog(req, res) {

	var db = require('./dbauth.js')();
	console.log("Database connection established");

	// Blog front page - show latest articles
	if (req.path === '/') {

		// Show articles where visible=1 in reverse ID order	
		db.collection('articles').find({'visible' : 1}).sort({ '_id' : -1}, function(err, listOfArticles) {
                        if (err) {
                                console.log("Database Error: ", err);
                                res.writeHead(500, {"Content-Type" : "text/plain"});
                                res.end("500 error: " + err);
				return;
                        }
			var fixedList = [];
			listOfArticles.forEach(function(element) {
				var fixedArticle = require('ent').decode(element.article);
				element.article = fixedArticle;
				fixedList.push(element);
			});

                        res.render('layout', {
                                title: "Leon Zaruvinsky's Blog",
                                adj: "blog",
                                articles: listOfArticles,
                                partials: {
                                        header: "header",
                                        main: "blog",
                                }
                        });
                });

	// Article page
	} else {
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
				res.write("404 Error:\n");
				res.end("Article not found for request path: " + myPath);
				return;
			}

			// re-encode HTML entities
			var fixedArticle = require('ent').decode(result.article);

			res.render('layout', {
				title: result.title + " - Leon Zaruvinsky",
				adjs: "pages",
				article: result,
				content: fixedArticle,
				partials: {
					header: "header",
					main: "blog-article",
				}
			});
		});
	}
		
	


}

module.exports = blog
