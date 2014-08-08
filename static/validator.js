// Form validator
(function () {

	var checkName = false, checkEmail = false, checkMessage = false, checkInit = false;	

	// Checks if element is 'valid' using the validator function
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

	var name = document.getElementById('name');
	name.addEventListener('blur', function() {
		checkName = validate(name, function(str) {
			return str.length > 0;
		});
	}, false);

	var email = document.getElementById('email');
	email.addEventListener('blur', function() {
		checkEmail = validate(email, function (str) {
			var pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;		
			return pattern.test(str);
		});
	}, false);

	var message = document.getElementById('message');
	message.addEventListener('blur', function() {
		checkMessage = validate(message, function(str) {
			return str.length > 0;
		});
	}, false);

	var init = document.getElementById('init');
	init.addEventListener('blur', function() {
		checkInit = validate(init, function(str) {
			return str.toUpperCase() === 'LZ' || str.toUpperCase() === 'LAZ';
		});
	}, false);

	document.getElementById('send').addEventListener('click', function(e) {
		if (!(checkName && checkEmail && checkMessage && checkInit)) {
			// The form isn't right, don't send!
			
			// Set empty fields to 'invalid'
			[name, email, message, init].forEach(function(element) {
				if (element.value === '') {
					element.classList.add('invalid');
				}
			});

			document.getElementById('error').innerHTML = "Hmm, something isn't right.  Try fixing the red boxes.";
			e.preventDefault();
		}
	}, false);

})();
