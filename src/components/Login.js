import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import { onSignInWithEmailAndPassword } from "../vendors/firebase/firebase.authentication";

const componentId = getUniqueId();

const listenForSignInSubmit = () => {
  // elements
  const signInForm = document
    .querySelector(`.${componentId} #signin-form`);
  const signInFormError = document
    .querySelector(`.${componentId} #signin-form-error`);

  // takes in an error message and displays it on top of signin form
  const showSignInFormError = (message) => {
    signInFormError.innerHTML = `
      <div class="alert alert-danger text-center" role="alert">
        ${message}
      </div>
    `;
  };
  
  // resets signin form error message
  const resetSignInFormError = () => signInFormError.innerHTML = '';

  // checks signin form and extracts out each field names and value pairs
  const extractFormFields = () => {
    const email = signInForm['signin-email']?.value;
    const password = signInForm['signin-password']?.value;
    return {
      email,
      password,
    }
  }

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

  // takes in form fields and validates each field one-by-one
  const validateSignUpForm = (fields) => {
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

    return {
      error: null,
      isValid: true,
    }
  }

  async function onSignInSubmit(e) {
    // restricts browser from auto page refresh on form submit
    e.preventDefault();

    // extracts out each form field in name / value pairs
    // i.e., { email: '...', password: '...' ... }
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
      return showSignInFormError(formError);
    }
    // hides or removes any form field from DOM
    resetSignInFormError();

    // creates new account for user by taking in email and password
    const { user, error } = await onSignInWithEmailAndPassword({ 
      email: fields.email, 
      password: fields.password 
    });
    console.log({ user, error });

    // display potential signup error from firebase auth
    if (error) {
      return showSignInFormError(error.message || 'Unable to log in now. Try again later');
    } 

    // clears the sign up form fields in DOM
    signInForm.reset();
    // navigate user to dashboard
    window.location.replace('?page=dashboard');
  }

  signInForm.addEventListener('submit', onSignInSubmit);
}

const onLoad = () => {
  listenForSignInSubmit();
};

const styles = () => `
  .${componentId} {
    padding: 1.5em 0 0 0;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: auto;
  }
  .${componentId} .form-signin {
    max-width: 380px;
    width: 100%;
    padding: 15px 35px 45px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .${componentId} .form-signin .form-signin-heading,
  .${componentId} .form-signin .checkbox {
    margin-bottom: 30px;
  }
  .${componentId} .form-signin .checkbox {
    font-weight: normal;
  }
  .${componentId} .form-signin .form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .${componentId} .form-signin .form-control:focus {
    z-index: 2;
  }
  .${componentId} .form-signup .signup-form-error {
    font-size: 1rem;
  }
`;

const Login = () => {
  return `
    <section class="Login ${componentId}">
      <h1 class="text-center mb-4 text-muted"> Log Trade </h1>
      <form class="form-signin" id="signin-form" action="#">       
        <h2 class="form-signin-heading">Login</h2>
        <div class="signin-form-error" id="signin-form-error"></div>
        <input 
          type="email" 
          class="form-control" 
          name="signin-email" 
          placeholder="Email Address" 
          autofocus 
          required 
        />
        <input 
          type="password" 
          class="form-control" 
          name="signin-password" 
          placeholder="Password" 
          required 
        />  
        <div class="d-grid gap-2 mt-4">
          <button 
            class="btn btn-lg btn-primary btn-block" 
            type="submit"
          >
            Login
          </button>   
        </div>
        <div class="d-grid gap-2 mt-3">
          <a class="btn btn-link" href="?page=signup" role="button">Create new account</a>
        </div>
      </form>
    </section>
  `
};

export default (props) => render(
  props,
  componentId, 
  Login, 
  styles,
  onLoad,
);
