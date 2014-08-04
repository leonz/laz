var http = require('http');
var mongojs = require('mongojs');

module.exports = function() {
	var uri = process.env.MONGOHQ_URI;
	console.log(uri);
	return mongojs(uri);
}
