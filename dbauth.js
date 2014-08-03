var http = require('http');
var mongojs = require('mongojs');

module.exports = function() {
	var uri = MONGOHQ_URI;
	return mongojs.connect(uri, ["blog"]);
}
