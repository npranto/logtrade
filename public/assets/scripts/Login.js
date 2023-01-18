/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
/* eslint-disable no-return-assign */
/* eslint-disable import/extensions */
import '../vendors/firebase/firebase.js';
import { onSignInWithEmailAndPassword } from '../vendors/firebase/firebase.authentication.js';

// elements
const signInForm = document.querySelector('.Login #signin-form');
const signInFormError = document.querySelector('.Login #signin-form-error');

// functions
// takes in an error message and displays it on top of signin form
const showSignInFormError = (message) => {
	signInFormError.innerHTML = `
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-2 rounded relative text-sm" role="alert">
      <strong class="font-bold">Oops!</strong>
      <span class="block sm:inline">${message}</span>
    </div>
  `;
};
// resets signin form error message
const resetSignInFormError = () => (signInFormError.innerHTML = '');

// checks signin form and extracts out each field names and value pairs
const extractFormFields = () => {
	const email = signInForm.email?.value;
	const password = signInForm.password?.value;
	return {
		email,
		password,
	};
};

// takes in email field and returns data regarding its validity
const validateEmail = (email) => {
	if (!email) {
		return {
			error: 'Please provide an email address',
			isValid: false,
		};
	}

	// ref: https://stackoverflow.com/a/46181
	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const isEmailValid = emailRegex.test(String(email).toLowerCase());

	if (!isEmailValid) {
		return {
			error: 'Invalid email address!',
			isValid: false,
		};
	}
	return {
		error: null,
		isValid: true,
	};
};

// takes in password field and returns data regarding its validity
const validatePassword = (password) => {
	/* whether or not a character is valid or not
    - char can be a letter from a-z, either upper / lower case
    - char can be a number, 0-9
    - char can be a whitespace
    - char can be any of these special characters only:
      (!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~) */
	const isInvalidCharacter = (char) => {
		if (!char || char.length !== 1 || typeof char !== 'string') {
			throw new Error(
				'Invalid character passed as argument. Please pass in a single character, i.e., `a`, `B` or `7`'
			);
		}
		return /[a-zA-Z0-9\s!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]/.test(char);
	};
	// whether or not the entire string has valid characters or not
	const hasInvalidCharacters = (str) =>
		str.split('').some((char) => isInvalidCharacter(char));

	if (!password) {
		return {
			error: 'Please provide a password',
			isValid: false,
		};
	}
	if (!password.length || password.length < 6) {
		return {
			error: 'Invalid password, must be longer than 6 characters',
			isValid: false,
		};
	}

	if (!hasInvalidCharacters(password)) {
		return {
			error:
				'Invalid password! Password can only contain letters (a-z, A-Z), numbers (0-9), whitespace(s) or special characters (!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~)',
			isValid: false,
		};
	}
	return {
		error: null,
		isValid: true,
	};
};

const sanitizeSignInFields = (fields = {}) => {
	const sanitizedFields = {};

	for (const [key, value] of Object.entries(fields)) {
		// sanitize each field as needed...
		if (key === 'email') {
			sanitizedFields[key] = value.trim().toLowerCase();
		} else {
			sanitizedFields[key] = value;
		}
	}

	return sanitizedFields;
};

// takes in form fields and validates each field one-by-one
const validateSignUpForm = (fields) => {
	// validate email
	const { error: emailError, isValid: isEmailValid } = validateEmail(
		fields.email
	);
	if (!isEmailValid) {
		return {
			error: emailError,
			isValid: isEmailValid,
		};
	}

	// validate password
	const { error: passwordError, isValid: isPasswordValid } = validatePassword(
		fields.password
	);
	if (!isPasswordValid) {
		return {
			error: passwordError,
			isValid: isPasswordValid,
		};
	}

	return {
		error: null,
		isValid: true,
	};
};

async function onSignInSubmit(e) {
	// restricts browser from auto page refresh on form submit
	e.preventDefault();

	// extracts out each form field in name / value pairs
	// i.e., { email: '...', password: '...' ... }
	const fields = extractFormFields();
	console.log({ fields });

	// takes in all form fields, validates each one-by-one and returns
	// data regarding form validity
	const { error: formError, isValid: isFormValid } = validateSignUpForm(fields);
	console.log({ formError, isFormValid });

	if (!isFormValid) {
		// displays form field error in DOM
		return showSignInFormError(formError);
	}
	// hides or removes any form field from DOM
	resetSignInFormError();

	// sanitize form fields for cleaner and more consistent credentials
	const sanitizedFields = sanitizeSignInFields(fields);
	console.log({ sanitizedFields });

	// creates new account for user by taking in email and password
	const { user, error } = await onSignInWithEmailAndPassword({
		email: sanitizedFields.email,
		password: sanitizedFields.password,
	});
	console.log({ user, error });

	// display potential signup error from firebase auth
	if (error) {
		return showSignInFormError(
			error.message || 'Unable to log in now. Try again later'
		);
	}

	// clears the sign up form fields in DOM
	signInForm.reset();
	// navigate user to dashboard
	window.location.replace('/');
}

// events
signInForm !== null && signInForm.addEventListener('submit', onSignInSubmit);
