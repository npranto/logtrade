import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from './config'; // Adjust the path as needed

/**
 * Fetch a document from Firestore.
 * @param {string} collectionName - The name of the collection.
 * @param {string} documentId - The ID of the document to fetch.
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 *          - Returns an object with `success: true` and `data` if successful, or `success: false` and `error` if not.
 */
export async function getData(collectionName, documentId) {
  try {
    const docRef = doc(FIREBASE_DB, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        data: docSnap.data(),
      };
    } else {
      console.warn(`No document found in collection "${collectionName}" with ID "${documentId}".`);
      return {
        data: null,
      };
    }
  } catch (error) {
    console.error(`Error fetching document from "${collectionName}/${documentId}":`, error);
    return {
      error: `Error fetching document from "${collectionName}/${documentId}`,
    };
  }
}
