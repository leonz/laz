module.exports = function() {
	return require('sendgrid')(process.env.SENDGRID_USER, process.env.SENDGRID_KEY);
}
