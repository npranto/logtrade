import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const { uid,  email } = user;
    console.info(`User is signed in - [${uid}] [${email}]`);
  } else {
    // User is signed out
    console.info('User is signed out');
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


