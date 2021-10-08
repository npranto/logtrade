import '../vendors/firebase/firebase.js';
import { onSignUpWithEmailAndPassword } from "../vendors/firebase/firebase.authentication.js";



// elements
const signUpForm = document.querySelector(`.Signup #signup-form`);
const signUpFormError = document.querySelector(`.Signup #signup-form-error`);

// functions
// takes in an error message and displays it on top of signup form
const showSignUpFormError = (message) => {
  signUpFormError.innerHTML = `
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-2 rounded relative text-sm" role="alert">
      <strong class="font-bold">Oops!</strong>
      <span class="block sm:inline">${message}</span>
    </div>
  `;
};

// resets signup form error message
const resetSignUpFormError = () => signUpFormError.innerHTML = '';

// checks signup form and extracts out each field names and value pairs
const extractFormFields = () => {
  const fullName = signUpForm['full-name']?.value;
  const email = signUpForm['email']?.value;
  const password = signUpForm['password']?.value;
  const confirmPassword = signUpForm['confirm-password']?.value;
  return {
    fullName,
    email,
    password,
    confirmPassword,
  }
}

// takes in full name field and returns data regarding its validity
const validateFullName = (fullName) => {
  if (!fullName || fullName.length < 3) {
    return {
      error: 'Invalid full name! Must be longer than 3 characters',
      isValid: false, 
    }
  }
  return {
    error: null,
    isValid: true,
  }
};

// takes in email field and returns data regarding its validity
const validateEmail = (email) => {
  if (!email) {
    return {
      error: 'Please provide an email address',
      isValid: false, 
    }
  }

  // ref: https://stackoverflow.com/a/46181
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmailValid = emailRegex.test(String(email).toLowerCase());

  if (!isEmailValid) {
    return {
      error: 'Invalid email address!',
      isValid: false, 
    }
  }
  return {
    error: null,
    isValid: true,
  }
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
  }
  // whether or not the entire string has valid characters or not
  const hasInvalidCharacters = (str) => str
    .split('')
    .some((char) => isInvalidCharacter(char));

  
  if (!password) {
    return {
      error: 'Please provide a password',
      isValid: false, 
    }
  }
  if (!password.length || password.length < 6) {
    return {
      error: 'Invalid password, must be longer than 6 characters',
      isValid: false, 
    }
  }

  if (!hasInvalidCharacters(password)) {
    return {
      error: 'Invalid password! Password can only contain letters (a-z, A-Z), numbers (0-9), whitespace(s) or special characters (!"#$%&\'()*+,-.\/:;<=>?@[\]^_`{|}~)',
      isValid: false, 
    }
  }
  return {
    error: null,
    isValid: true,
  }
};

// takes in password and confirm password and returns data regarding mismatch
const validatePasswordAndConfirmPassword = (password, confirmPassword) => {
  if (!password || !confirmPassword || password !== confirmPassword) {
    return {
      error: 'Password and confirm password mismatch!',
      isValid: false,
    }
  }
  return {
    error: null,
    isValid: true,
  }
}

// takes in form fields and validates each field one-by-one
const validateSignUpForm = (fields) => {
  // validate full name
  const { 
    error: fullNameError, isValid: isFullNameValid,
  } = validateFullName(fields.fullName);
  if (!isFullNameValid) {
    return {
      error: fullNameError,
      isValid: isFullNameValid,
    }
  }

  // validate email
  const { 
    error: emailError, isValid: isEmailValid,
  } = validateEmail(fields.email);
  if (!isEmailValid) {
    return {
      error: emailError,
      isValid: isEmailValid,
    }
  }

  // validate password
  const { 
    error: passwordError, isValid: isPasswordValid,
  } = validatePassword(fields.password);
  if (!isPasswordValid) {
    return {
      error: passwordError,
      isValid: isPasswordValid,
    }
  }

  // validate password and confirm password
  const { 
    error: passwordAndConfirmPasswordError, 
    isValid: isPasswordAndConfirmPasswordValid,
  } = validatePasswordAndConfirmPassword(
    fields.password, 
    fields.confirmPassword
  );
  if (!isPasswordAndConfirmPasswordValid) {
    return {
      error: passwordAndConfirmPasswordError,
      isValid: isPasswordAndConfirmPasswordValid,
    }
  }

  return {
    error: null,
    isValid: true,
  }
}

const sanitizeSignUpFields = (fields) => {
  let sanitizedFields = {};

  for (const [key, value] of Object.entries(fields)) {
    // sanitize each field as needed...
    if (key === 'fullName') {
      sanitizedFields[key] = value.trim();
    } else if (key === 'email') {
      sanitizedFields[key] = value.trim().toLowerCase();
    } else {
      sanitizedFields[key] = value;
    }
  }

  return sanitizedFields;
}

async function onSignUpSubmit(e) {
  // restricts browser from auto page refresh on form submit
  e.preventDefault();

  // extracts out each form field in name / value pairs
  // i.e., { fullName: '...', email: '...' ... }
  const fields = extractFormFields();
  console.log({ fields });

  // takes in all form fields, validates each one-by-one and returns 
  // data regarding form validity
  const { 
    error: formError, isValid: isFormValid 
  } = validateSignUpForm(fields);
  console.log({ formError, isFormValid });

  if (!isFormValid) {
    // displays form field error in DOM
    return showSignUpFormError(formError);
  }
  // hides or removes any form field from DOM
  resetSignUpFormError();

  // sanitize form fields for cleaner and more consistent credentials
  const sanitizedFields = sanitizeSignUpFields(fields);
  console.log({ sanitizedFields });

  // creates new account for user by taking in email and password
  const { user, error } = await onSignUpWithEmailAndPassword({ 
    email: sanitizedFields.email, 
    password: sanitizedFields.password 
  });
  console.log({ user, error });

  // display potential signup error from firebase auth
  if (error) {
    return showSignUpFormError(error.message || 'Unable to create account now. Try again later');
  } 

  // clears the sign up form fields in DOM
  signUpForm.reset();
  // navigate user to dashboard
  window.location.replace('/');
}

// events
signUpForm.addEventListener('submit', onSignUpSubmit);


