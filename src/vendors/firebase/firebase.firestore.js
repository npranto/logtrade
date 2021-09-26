import { getFirestore, doc, getDoc } from "firebase/firestore"

const db = getFirestore();

export const getStocksByUserId = async (userId) => {
  if (!userId || typeof userId !== 'string') {
    throw new Error('Please pass in a user id to get stocks');
  } 

  const userStocks = await getDoc(doc(db, "stocks", userId));

  if (userStocks.exists()) {
    return userStocks.data();
  } 
  return null;
}

