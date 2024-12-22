import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from './config'; // Adjust the path as needed

/**
 * Save a piece of data to a Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} documentId - The ID of the document to save or update.
 * @param {object} data - The data to save.
 * @returns {Promise<{ success: boolean, message?: string, error?: string }>}
 *          - Returns an object with `success: true` if successful, or `success: false` and `error` if not.
 */
export async function addData(collectionName, documentId, data) {
  try {
    const docRef = doc(FIREBASE_DB, collectionName, documentId);
    await setDoc(docRef, data);

    return {
      data: documentId,
    };
  } catch (error) {
    console.error(`Error saving document to "${collectionName}/${documentId}":`, error);
    return {
      error: `Error saving document to "${collectionName}/${documentId}"`,
    };
  }
}
