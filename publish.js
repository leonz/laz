function publish(req, res) {

	// Start by testing authentication
	
	// TODO: if is not authenticated, redirect to /login
	
	// Login page
	if (req.path === '/login') {

	


	// New Article form
	} else if (req.path === '/new') {
		res.render('layout', {
			title: "New Article",
			adj: "pages",
			partials: {
				header: "header",
				main: "publish-new",
				script: "publish-new-script"
			}
		});

	// Publishing Center - process new articles and show existing articles
	} else if (req.path === '/') {
		var db = require('./dbauth.js')();
		console.log('Database connection established.');
		
		// Returns a callback containing the next unique id
		function getNextSequence(name, callback) {
			db.collection('counters').findAndModify({
				query: { _id: name },
				update: { $inc: { seq: 1 } },
				new: true,
			}, function(err, doc) {
				console.log(doc);
				if (err) {
					console.log('Error: ', err);
					callback(err);
					return;
				}
				callback(doc.seq);
			});
		}
		
		// Submit the new article to the database
		if (req.method === 'POST') {
	
			var data = '';
			req.on('data', function(datum) {
				data += datum;
			});

			// Article data received, now process
			req.on('end', function() {
				var ent = require('ent');
				var sanitize = require('sanitize-html');
				var S = require('string');
				var querystring = require('querystring');

				var input = querystring.parse(data);

				// Strip bad HTML while keeping good HTML with tags
				var safeArticle = sanitize(ent.decode(input["article"]));
			
				// Calculate article reading time, where 1 min = 250 words
				var wordCount = S(safeArticle).stripTags().s.split(" ").length;
				var readTime = Math.round(wordCount / 250);
					readTime = readTime > 1 ? readTime : 1;	

				// Insert the article after getting the unique id
				getNextSequence("postid", function(seq) {
					var newArticle = {
						_id: seq,
						title: input["title"],
						article: safeArticle,
						path: input["path"],
						read: readTime,
						visible: input["visible"] || 0
					};
				
					db.collection('articles').insert(newArticle, function(err, records) {
						console.log("Article inserted into database: ", records);
						if (err) {
							console.log("Error: ", err);
						}
					});

				}); 
			});	
		}

		// Blog control panel - Show existing articles
		db.collection('articles').find(function(err, listOfArticles) {
			if (err) {
				console.log("Database Error: ", err);
				res.write(500, {"Content-Type" : "text/plain"});
				res.end("500 error: " + err);
			}

			res.render('layout', {
				title: "Publishing Center",
				adj: "pages",
				articles: listOfArticles,
				partials: {
					header: "header",
					main: "publish",
					script: "publish-script"
				}
			});
		});

	} else {
		res.writeHead(404, {"Content-Type" : "text/plain"});
		res.end("404 error");

	}
}		

module.exports = publish
