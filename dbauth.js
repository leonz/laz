var http = require('http');
var mongojs = require('mongojs');

module.exports = function() {
	var uri = process.env.MONGOHQ_URI;
	return mongojs.connect(uri, ["blog"]);
}
