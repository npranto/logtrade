import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"

const db = getFirestore();

const fakeDB = {
  trades: [
    {
      closingPrice: "11.50",
      date: "30",
      month: "September",
      name: "Cellect Biotechnology",
      notes: "Awesome win today!",
      numberOfShares: 2,
      openingPrice: "10.50",
      stopLoss: "9.00",
      takeProfit: "12.00",
      ticker: "APOPA",
      tradeType: "long",
      year: "2021",
    }
  ],
  userId: '51XeDcMHQzYfB3clHKZZnnp87uq2',
}

export const fetchAllTradesByUserId = async (userId) => {
  if (!userId || typeof userId !== 'string') {
    throw new Error('Please pass in a user id to get stocks');
  }

  // fake API data
  // const userTrades = {
  //   exists: () => true,
  //   data: () => (fakeDB)
  // };

  const userTrades = await getDoc(doc(db, "tradelogs", userId));

  if (userTrades?.exists()) {
    return userTrades?.data()?.trades;
  } 
  return [];
} 

export const createNewTradeLog = async (newTrade, userId) => {
  const tradelogRef = doc(db, "tradelogs", userId)
  const tradelogSnap = await getDoc(tradelogRef) ;

  if (tradelogSnap.exists()) {
    // update existing document by adding new trade to trades list
    try {
      await updateDoc(tradelogRef, {
        trades: arrayUnion({ ...newTrade }),
      });
      return { isNewTradeCreated: true };
    } catch (error) {
      return { 
        error: (error && error.message) || 
          'Unable to create new trade at the moment. Try again later.' 
      }
    }
  } else {
    // set up a new document and add new trade to trades list
    try {
      await setDoc(doc(db, "tradelogs", userId), {
        trades: [{ ...newTrade }],
        userId,
      });
      return { isNewTradeCreated: true };
    } catch (error) {
      return { 
        error: (error && error.message) || 
          'Unable to create new trade at the moment. Try again later.' 
      }
    }
  }
}

