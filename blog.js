function blog(req, res) {
	res.write('You are now entering blog territory.\n');
	res.end('View path (for use in articles): ' + req.path);
}

module.exports = blog
