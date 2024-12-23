import { addData, getData } from '@/services/firebase';

export async function fetchUserById(userId) {
  if (!userId || typeof userId !== 'string' || !userId.length) {
    return ['Please provide a valid userId to fetch user', null];
  }
  const { error, data } = await getData('users', userId);
  return [error, data];
}

export async function saveNewUser(newUser) {
  const { id: userId } = newUser || {};
  if (!userId || typeof userId !== 'string' || !userId.length) {
    return ['Please provide a valid `userId` to fetch user', null];
  }
  if (!isNewUserValid(newUser)) {
    return ['Please provide a valid `newUser` object', null];
  }
  const { error, data } = await addData('users', userId, newUser);
  return [error, data];
}

const isNewUserValid = (newUser) => {
  if (!newUser) {
    console.error('Invalid user: `newUser` is null or undefined.');
    return false;
  }

  const { userId, fullName, email, profilePicture, joinedAt } = newUser;

  const isNonEmptyString = (str) => typeof str === 'string' && str.trim().length > 0;
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidDate = (date) => !isNaN(new Date(date).getTime());
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (!isNonEmptyString(userId)) {
    console.error('Invalid `newUser.userId`:', userId);
    return false;
  }

  if (!isNonEmptyString(fullName)) {
    console.error('Invalid `newUser.fullName`:', fullName);
    return false;
  }

  if (!isValidEmail(email)) {
    console.error('Invalid `newUser.email`:', email);
    return false;
  }

  if (profilePicture && !isValidUrl(profilePicture)) {
    console.error('Invalid `newUser.profilePicture`:', profilePicture);
    return false;
  }

  if (!isValidDate(joinedAt)) {
    console.error('Invalid `newUser.joinedAt`:', joinedAt);
    return false;
  }

  return true;
};
