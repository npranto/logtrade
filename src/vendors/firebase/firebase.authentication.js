import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log('User is signed in', user);
    // window.location.replace('/calendar.html');
    // ...
  } else {
    // User is signed out
    // ...
    console.log('User is signed out');
    // window.location.replace('/login.html');
    // document.querySelector("body").style.opacity = "1";
  }
});

export const signup = (user) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('signup()...', user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('signup() error...', user);
      // ..
    });
}



