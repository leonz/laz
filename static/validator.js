// Form validator
(function () {

	var checkName = false, checkEmail = false, checkMessage = false, checkInit = false;	

	// General purpose validator for form fields
	function validate(element, validator) {
		if (validator(element.value)) {
			element.classList.add('valid');
			element.classList.remove('invalid');
			element.classList.remove('light');
			return true;
		} else {
			element.classList.remove('valid');
			element.classList.add('invalid');
			return false;
		}
	}

	// General focus event handler to check for default string
	function defaultCheck(element, str) {
		element.addEventListener('focus', function() {
			if (element.value === str) {
				element.classList.remove('light');
				element.value = '';
			}
		}, false);
	}
	
	// Add default value on blur when empty
	function addDefault(element, str) {
		if (element.value === '') {
			element.classList.add('light');
			element.value = str;
		}
	}

	var name = document.getElementById('name');
	defaultCheck(name, 'Name');

	name.addEventListener('blur', function() {
		addDefault(name, 'Name');
		checkName = validate(name, function(str) {
			return str !== 'Name' && str.length > 0;
		});
	}, false);

	var email = document.getElementById('email');
	defaultCheck(email, 'Email');

	email.addEventListener('blur', function() {
		addDefault(email, 'Email');
		checkEmail = validate(email, function (str) {
			var pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;		
			return pattern.test(str);
		});
	}, false);

	var message = document.getElementById('message');
	defaultCheck(message, 'Your message');

	message.addEventListener('blur', function() {
		addDefault(message, 'Your message');
		checkMessage = validate(message, function(str) {
			return str !== 'Your message' && str.length > 0;
		});
	}, false);

	var init = document.getElementById('init');
	defaultCheck(init, 'What are my initials?');

	init.addEventListener('blur', function() {
		addDefault(init, 'What are my initials?');
		checkInit = validate(init, function(str) {
			return str.toUpperCase() === 'LZ' || str.toUpperCase() === 'LAZ';
		});
	}, false);

	document.getElementById('send').addEventListener('click', function(e) {
		if (checkName && checkEmail && checkMessage && checkInit) {
			// All clear, send!
		} else {
			if (name.value === 'Name') {
				name.classList.add('invalid');
			}
			if (email.value === 'Email') {
				email.classList.add('invalid');
			}
			if (message.value === 'Your message') {
				message.classList.add('invalid');
			}
			if (init.value === 'What are my initials?') {
				init.classList.add('invalid');
			}
			document.getElementById('error').innerHTML = "Hmm, something isn't right.  Try fixing the red boxes.";
			e.preventDefault();
		}
	}, false);

})();
