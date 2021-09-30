import { getFirestore, doc, getDoc } from "firebase/firestore"

const db = getFirestore();

export const fetchAllTradesByUserId = async (userId) => {
  if (!userId || typeof userId !== 'string') {
    throw new Error('Please pass in a user id to get stocks');
  }

  // fake API data
  const userTrades = {
    exists: () => true,
    data: () => ({
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
    })
  };

  // const userTrades = await getDoc(doc(db, "tradelogs", userId));

  if (userTrades?.exists()) {
    return userTrades?.data()?.trades;
  } 
  return [];
} 

