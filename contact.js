function contact(req, res) {
	if (req.method === 'POST') {
		res.end("Form sent! Though not successfully, I haven't built that part yet :)");

	} else {
		res.render('layout', {
			title: "Contact Me",
			partials: {
				header: "header",
				main: "contact",
			script: "contact-script"
			}
		});
	}
}

module.exports = contact;
