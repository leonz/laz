function publish(req, res) {
	if (req.path === '/new') {
		res.render('layout', {
			title: "New Article",
			adj: "pages",
			partials: {
				header: "header",
				main: "publish-new",
				script: "publish-new-script"
			}
		});
	} else if (req.path === '/') {
		var db = require('./dbauth.js')();
		console.log('Database connection established.');
		
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

		if (req.method === 'POST') {
			var data = '';
			req.on('data', function(datum) {
				data += datum;
			});

			req.on('end', function() {
				var ent = require('ent');
				var sanitize = require('sanitize-html');
				var S = require('string');
				var querystring = require('querystring');

				var input = querystring.parse(data);

				var safeArticle = sanitize(ent.decode(input["article"]));
			
				var wordCount = S(safeArticle).stripTags().s.split(" ").length;
				var readTime = Math.round(wordCount / 250);
					readTime = readTime > 1 ? readTime : 1;	


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

		res.render('layout', {
			title: "Publishing Center",
			adj: "pages",
			partials: {
				header: "header",
				main: "publish",
				script: "publish-script"
			}
		});

	} else {
		res.writeHead(404, {"Content-Type" : "text/plain"});
		res.end("404 error");
	}		

/*	var db = require('./dbauth.js')();
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
*/
}

module.exports = publish
