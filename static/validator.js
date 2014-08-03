// Form validator
(function () {

	var checkName = false, checkEmail = false, checkMessage = false, checkInit = false;	

	// General purpose validator for form fields
	function validate(element, validator) {
		if (validator(element.value)) {
			element.classList.add('valid');
			element.classList.remove('invalid');
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
			var pattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
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
			document.getElementById('error').innerHTML = "Oops! It looks like something is wrong.  Try fixing the red boxes.";
			e.preventDefault();
		}
	}, false);

})();