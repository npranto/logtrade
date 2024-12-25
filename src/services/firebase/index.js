import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from './config'; // Adjust the path as needed

export async function addData(collectionName, documentId, data) {
  try {
    const docRef = doc(FIREBASE_DB, collectionName, documentId);
    await setDoc(docRef, data);
    return { data: documentId };
  } catch (error) {
    console.error(`Error saving document to "${collectionName}/${documentId}":`, error);
    return {
      error: `Error saving document to "${collectionName}/${documentId}"`,
    };
  }
}

export async function getData(collectionName, documentId) {
  try {
    const docRef = doc(FIREBASE_DB, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { data: docSnap.data() };
    } else {
      console.warn(`No document found in collection "${collectionName}" with ID "${documentId}".`);
      return { data: null };
    }
  } catch (error) {
    console.error(`Error fetching document from "${collectionName}/${documentId}":`, error);
    return {
      error: `Error fetching document from "${collectionName}/${documentId}`,
    };
  }
}

export async function updateData(collectionName, documentId, updatedData) {
  try {
    const docRef = doc(FIREBASE_DB, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    const existingData = (docSnap.exists() && docSnap.data()) || {};
    console.log('updateData() >>> existingData', existingData);

    const mergedData = {
      ...existingData,
      ...updatedData,
    };
    console.log('updateData() >>> mergedData', mergedData);

    await setDoc(docRef, mergedData);
    return { data: mergedData };
  } catch (error) {
    console.error(`Error updating document in "${collectionName}/${documentId}":`, error);
    return {
      error: `Error updating document in "${collectionName}/${documentId}"`,
    };
  }
}
