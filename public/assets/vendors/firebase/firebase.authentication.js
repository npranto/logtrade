import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import saveUserOnLocalStorage from "../../utils/saveUserOnLocalStorage.js";
import removeUserFromLocalStorage from '../../utils/removeUserFromLocalStorage.js';
import { getRandomAvatar } from "../../scripts/Nav.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const { 
      uid,  
      email, 
      displayName, 
      emailVerified, 
      phoneNumber, 
      photoURL, 
    } = user;
    console.info(`User is signed in - [${uid}; ${email}]`);
    saveUserOnLocalStorage({
      uid,  
      email, 
      displayName, 
      emailVerified, 
      phoneNumber, 
      photoURL, 
    });
  } else {
    // User is signed out
    console.info('User is signed out');
    removeUserFromLocalStorage();
  }
});

export const onUpdateProfile = ({ fullName }) => {
  return updateProfile(auth.currentUser, {
    displayName: fullName, 
    photoURL: getRandomAvatar(),
  }).then((stuff) => {
    console.log({ stuff });
    const { 
      uid,  
      email, 
      displayName, 
      emailVerified, 
      phoneNumber, 
      photoURL, 
    } = auth.currentUser;
    saveUserOnLocalStorage({
      uid,  
      email, 
      displayName, 
      emailVerified, 
      phoneNumber, 
      photoURL, 
    });
    return { isProfileUpdated: true };
  }).catch((error) => {
    const { code, message } = error;
    return { 
      error: { code, message } 
    };
  });
}

export const onSignUpWithEmailAndPassword = ({ 
  email, 
  password, 
}) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      return { user };
    })
    .catch((error) => {
      const { code, message } = error;
      if (code.includes('auth/email-already-in-use')) {
        return {
          error: { 
            code, 
            message: `${email} is already in use! Please either sign in or choose a different email`
          } 
        }
      }
      return { 
        error: { code, message } 
      };
    });
}

export const onSignInWithEmailAndPassword = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      return { user };
    })
    .catch((error) => {
      const { code, message } = error;
      if (code.includes('auth/user-not-found')) {
        return {
          error: { 
            code, 
            message: `No account associated with ${email}! Please create a new account`
          } 
        }
      }
      if (code.includes('auth/wrong-password')) {
        return {
          error: { 
            code, 
            message: `Incorrect password!`
          } 
        }
      }
      return { 
        error: { code, message: 'Unable to login at the moment. Try again later.' } 
      };
    });
}

export const onSignout = () => {
  return signOut(auth).then(() => {
    // Sign-out successful.
    return {
      isSignoutComplete: true,
    }
  }).catch((error) => {
    // An error happened.
    return {
      error: 'Issue with sign out at the moment'
    }
  });
}

// add a function to delete user account


