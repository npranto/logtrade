import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import { signUpWithEmailAndPassword } from "../vendors/firebase/firebase.authentication";

const componentId = getUniqueId();

const listenForSignUpSubmit = (props) => {
  // elements
  const signUpForm = document
    .querySelector(`.${componentId} #signup-form`);
  const signUpFormError = document
    .querySelector(`.${componentId} #signup-form-error`);


  // takes in an error message and displays it on top of signup form
  const showSignUpFormError = (message) => {
    signUpFormError.innerHTML = `
      <div class="alert alert-danger text-center" role="alert">
        ${message}
      </div>
    `;
  };
  
  // resets signup form error message
  const resetSignUpFormError = () => signUpFormError.innerHTML = '';

  // checks signup form and extracts out each field names and value pairs
  const extractFormFields = () => {
    const fullName = signUpForm['signup-fullname']?.value;
    const email = signUpForm['signup-email']?.value;
    const password = signUpForm['signup-password']?.value;
    const confirmPassword = signUpForm['signup-confirm-password']?.value;
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

    // creates new account for user by taking in email and password
    const { user, error } = await signUpWithEmailAndPassword({ 
      email: fields.email, 
      password: fields.password 
    });
    console.log({ user, error });

    // display potential signup error from firebase auth
    if (error) {
      return showSignUpFormError(error.message || 'Unable to create account now. Try again later');
    } 

    // clears the sign up form fields in DOM
    signUpForm.reset();
    // navigate user to dashboard
    window.location.replace('?page=dashboard');
  }

  signUpForm.addEventListener('submit', onSignUpSubmit);
}

function onLoad(props) {
  listenForSignUpSubmit(props);
}

function styles() { 
  return `
    .${componentId} {
      padding-top: 2em;
      padding-bottom: 2em;
      box-sizing: border-box;
      height: 100vh;
      overflow: auto;
    }
    .${componentId} .form-signup {
      max-width: 380px;
      padding: 15px 35px 45px;
      margin: 0 auto;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    .${componentId} .form-signup .form-signup-heading,
    .${componentId} .form-signup .checkbox {
      margin-bottom: 30px;
    }
    .${componentId} .form-signup .checkbox {
      font-weight: normal;
    }
    .${componentId} .form-signup .form-control {
      position: relative;
      font-size: 16px;
      height: auto;
      padding: 10px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    .${componentId} .form-signup .form-control:focus {
      z-index: 2;
    }
    .${componentId} .form-signup .signup-form-error {
      font-size: 1rem;
    }
  `;
}

function Signup (props) {
  return `
    <section class="Signup ${componentId}">
      <h1 class="text-center mt-5 mb-5 text-muted"> Log Trade </h1>
      <form class="form-signup" id="signup-form" action="#">       
        <h2 class="form-signup-heading">Sign Up</h2>
        <div class="signup-form-error" id="signup-form-error"></div>
        <input 
          type="text" 
          class="form-control" 
          name="signup-fullname" 
          placeholder="Full Name" 
          required
          autofocus 
        />
        <input 
          type="email" 
          class="form-control" 
          name="signup-email" 
          placeholder="Email Address" 
          required
        />
        <input 
          type="password" 
          class="form-control" 
          name="signup-password" 
          placeholder="Password" 
          required
        />    
        <input 
          type="password" 
          class="form-control" 
          name="signup-confirm-password" 
          placeholder="Confirm Password" 
          required
        />    
        <div class="d-grid gap-2 mt-3">
          <button 
            class="btn btn-lg btn-primary btn-block" 
            type="submit"
          >
            Sign Up
          </button>   
        </div>
        <div class="d-grid gap-2 mt-3">
          <a class="btn btn-link" href="?page=login" role="button">Already have account?</a>
        </div>
      </form>
    </section>
  `
};

export default (props) => render(
  props, 
  componentId,
  Signup, 
  styles, 
  onLoad,
);