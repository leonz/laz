module.exports = function() {
	return require('sendgrid')(SENDGRID_USER, SENDGRID_KEY);
}
