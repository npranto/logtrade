/* eslint-disable no-console */
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	// eslint-disable-next-line import/no-unresolved, import/extensions
} from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js';
import saveUserOnLocalStorage from '../../../public/assets/utils/saveUserOnLocalStorage';
import removeUserFromLocalStorage from '../../../public/assets/utils/removeUserFromLocalStorage';

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User
		const { uid, email, displayName, emailVerified, phoneNumber, photoURL } =
			user;
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

export const onSignUpWithEmailAndPassword = ({ email, password }) =>
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const { user } = userCredential;
			return { user };
		})
		.catch((error) => {
			const { code, message } = error;
			if (code.includes('auth/email-already-in-use')) {
				return {
					error: {
						code,
						message: `${email} is already in use! Please either sign in or choose a different email`,
					},
				};
			}
			return {
				error: { code, message },
			};
		});

export const onSignInWithEmailAndPassword = ({ email, password }) =>
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const { user } = userCredential;
			return { user };
		})
		.catch((error) => {
			const { code } = error;
			if (code.includes('auth/user-not-found')) {
				return {
					error: {
						code,
						message: `No account associated with ${email}! Please create a new account`,
					},
				};
			}
			if (code.includes('auth/wrong-password')) {
				return {
					error: {
						code,
						message: 'Incorrect password!',
					},
				};
			}
			return {
				error: {
					code,
					message: 'Unable to login at the moment. Try again later.',
				},
			};
		});

export const onSignout = () =>
	signOut(auth)
		.then(() => ({
			isSignoutComplete: true,
		}))
		.catch(() => ({
			error: 'Issue with sign out at the moment',
		}));
