import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import saveUserOnLocalStorage from "../../utils/saveUserOnLocalStorage";

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
    console.info(`User is signed in - [${uid}; ${email}]`, user);
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

export const signUpWithEmailAndPassword = ({ email, password }) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
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

export const signInWithEmailAndPassword = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

}


