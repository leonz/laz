function contact(req, res) {
	var querystring = require('querystring');
	var sendgrid = require('./contactauth')();

	var isValid = function(input) {
		var checkName = input["name"] !== "Name" && input["name"].length > 0;

		var pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;				
		var checkEmail = pattern.test(input["email"]);

		var checkMessage = input["message"] !== "Your message" && input["message"].length > 0;

		var checkInit = input["init"].toUpperCase() === "LZ" || input["init"].toUpperCase() === "LAZ";

		return checkName && checkEmail && checkMessage && checkInit;
	};

	if (req.method === 'POST') {
		var data = '';
		req.on('data', function(datum) {
			data += datum;
		});
		req.on('end', function() {
			var input = querystring.parse(data);

			if (isValid(input)) {
				// all data is valid - send!
				sendgrid.send({
					to: 'leon@lzaruvinsky.com',
					fromname: input["name"],
					from: input["email"],
					subject: "Contact Form Response",
					text: input["message"]
				}, function(err, json) {

					console.log("Email sent via Sendgrid: " + json);

					if (err) {
						res.end("There was an error.");
						console.log("Error: + " + err);
						return;
					} 

					res.render('layout', {
						title: "Contact Me",
						adj: "pages",
						partials: {
							header: "header",
							main: "contact-success"
						}
					});
				});

			} else {
				// something went wrong
				res.render('layout', {
					title: "Contact Me",
					adj: "pages",
					name: input["name"],
					email: input["email"],
					message: input["message"],
					init: input["init"],
					error: "Hmm, something isn't right.  Make sure all of the fields above are filled in correctly.",
					partials: {
						header: "header",
						main: "contact",
						script: "contact-script"
					}
				});
			}
						



 
		//	res.write("Form sent! Though not successfully, I haven't built that part yet :)\n\n");
		//	res.end("Reach me at leon@lzaruvinsky.com");
		});


	} else {
		res.render('layout', {
			title: "Contact Me",
			adj: "pages",
			name: "Name",
			email: "Email",
			message: "Your message",
			init: "What are my initials?",
			partials: {
				header: "header",
				main: "contact",
				script: "contact-script"
			}
		});
	}
}

module.exports = contact;
