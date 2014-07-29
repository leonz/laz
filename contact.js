function contact(req, res) {
	if (req.method === 'POST') {
		res.write("Form sent! Though not successfully, I haven't built that part yet :)\n\n");
		res.end("Reach me at leon@lzaruvinsky.com");

	} else {
		res.render('layout', {
			title: "Contact Me",
			adj: "pages",
			partials: {
				header: "header",
				main: "contact",
			script: "contact-script"
			}
		});
	}
}

module.exports = contact;
