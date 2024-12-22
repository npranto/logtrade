import { addData } from '@/services/firebase/addData';
import { getData } from '@/services/firebase/getData';

export async function fetchUserById(userId) {
  const { error, data } = await getData('users', userId);
  return [error, data];
}

export async function saveNewUser(userId, newUser) {
  const { error, data } = await addData('users', userId, newUser);
  return [error, data];
}
