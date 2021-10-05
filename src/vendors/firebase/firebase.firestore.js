import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { getDocFromCache, saveDocInCache } from "./firebase.cache";

const db = getFirestore();

const fakeDB = {
  trades: [
    {
      closingPrice: "11.50",
      date: "1",
      month: "October",
      name: "Cellect Biotechnology",
      notes: "Awesome win today!",
      numberOfShares: 2,
      openingPrice: "10.50",
      stopLoss: "9.00",
      takeProfit: "12.00",
      ticker: "APOPA",
      tradeType: "long",
      year: "2021",
      tradeId: 'xwtr34535',
    },
    {
      closingPrice: "15.00",
      date: "2",
      month: "October",
      name: "Atlantic American",
      notes: "Nice!",
      numberOfShares: 3,
      openingPrice: "10.00",
      stopLoss: "9.00",
      takeProfit: "20.00",
      ticker: "AAME",
      year: "2021",
      tradeId: '74t6e657',
    },
    {
      closingPrice: "43543543.00",
      date: "8",
      month: "October",
      name: "Aeglea Biotherapeutics",
      notes: "3453455",
      numberOfShares: 3,
      openingPrice: "4353.00",
      stopLoss: "54543.00",
      takeProfit: "4534.00",
      ticker: "AGLE",
      year: "2021",
      tradeId: 'xn73i434x',
    },
    {
      closingPrice: "15.00",
      date: "2",
      month: "October",
      name: "Tesla",
      notes: "Cool!",
      numberOfShares: 10,
      openingPrice: "17.00",
      stopLoss: "7.00",
      takeProfit: "18.00",
      ticker: "TSLA",
      year: "2021",
      tradeId: 'x4w56wx54',
    }
  ],
  userId: '51XeDcMHQzYfB3clHKZZnnp87uq2',
}

// export const fetchAllTradesByUserId = async (userId) => {
//   if (!userId || typeof userId !== 'string') {
//     throw new Error('Please pass in a user id to get stocks');
//   }

//   // fake API data
//   const userTrades = {
//     exists: () => true,
//     data: () => (fakeDB)
//   };

//   // const userTrades = await getDoc(doc(db, "tradelogs", userId));

//   if (userTrades?.exists()) {
//     return userTrades?.data()?.trades;
//   } 
//   return [];
// } 

// export const createNewTradeLog = async (newTrade, userId) => {
//   const tradelogRef = doc(db, "tradelogs", userId)
//   const tradelogSnap = await getDoc(tradelogRef) ;

//   if (tradelogSnap.exists()) {
//     // update existing document by adding new trade to trades list
//     try {
//       await updateDoc(tradelogRef, {
//         trades: arrayUnion({ ...newTrade }),
//       });
//       return { isNewTradeCreated: true };
//     } catch (error) {
//       return { 
//         error: (error && error.message) || 
//           'Unable to create new trade at the moment. Try again later.' 
//       }
//     }
//   } else {
//     // set up a new document and add new trade to trades list
//     try {
//       await setDoc(doc(db, "tradelogs", userId), {
//         trades: [{ ...newTrade }],
//         userId,
//       });
//       return { isNewTradeCreated: true };
//     } catch (error) {
//       return { 
//         error: (error && error.message) || 
//           'Unable to create new trade at the moment. Try again later.' 
//       }
//     }
//   }
// }

// tradelogs stringified

export const stringify = json => {
  const isJSONObject = typeof json === 'object' && json !== null;
  if (!isJSONObject) {
    throw new Error('Please pass in a valid JSON object to stringify');
  }
  return JSON.stringify(json);
}

export const jsonify = stringified => {
  if (!stringified 
    || !stringified.length 
    || typeof stringified !== 'string'
  ) {
    throw new Error('Please pass in a valid stringified JSON to parse');
  }
  try {
    const jsonified = JSON.parse(stringified);
    return jsonified;
  } catch (e) {
    throw new Error(e);
  }
}

const getUserDoc = async (
  userId, 
  options = { 
    useCache: false, 
    cacheDurationInMinutes: 1,
  },
) => {
  // flags
  const useCache = options.useCache || false;
  const cacheDurationInMinutes = options.cacheDurationInMinutes || 1;

  console.log({ ...options });
  if (!userId || typeof userId !== 'string') {
    throw new Error('Please pass in a user id to get document');
  }

  const getUserDocFromFirestore = async (userId) => {
    const userDoc = await getDoc(doc(db, "tradelogs-stringified", userId));
    return { 
      exists: userDoc?.exists(),
      data: userDoc?.data(),
    };
  }

  const getUserDocFromCache = async (userId) => {
    const { exists, data, expiration } = await getDocFromCache(userId);
    return { 
      exists, 
      data, 
      expiration 
    }; 
  }

  if (!useCache) {
    console.log(
      `useCache [${useCache}]... getting user doc from firebase DB`
    );
    const { exists, data } = await getUserDocFromFirestore(userId); 
    if (exists) {
      saveDocInCache(
        userId, 
        stringify(data), 
        cacheDurationInMinutes
      );
    }
    return { exists, data };
  }
  
  if (useCache) {
    const { exists, data, expiration } = await getUserDocFromCache(userId);
    const isCacheExpired = expiration !== null && new Date().getTime() > expiration;

    console.log({ exists, data, expiration, isCacheExpired, currentTime: new Date().getTime() });

    if (!exists || isCacheExpired) {
      console.log(
        `useCache [${useCache}], but cache either doesn't have doc OR is expired... getting user doc from firebase DB`
      );
      const { exists, data } = await getUserDocFromFirestore(userId); 
      if (exists) {
        saveDocInCache(
          userId, 
          stringify(data), 
          cacheDurationInMinutes
        );
      }
      return { exists, data };
    }

    console.log(
      `useCache [${useCache}]... getting user doc from cache`
    );
    return { exists, data };
  }
}

export const fetchAllTradesByUserId = async (
  userId, 
  options = { useCache: true, cacheDurationInMinutes: 0.15 },
) => {
  if (!userId || typeof userId !== 'string') {
    throw new Error('Please pass in a user id to get stocks');
  }

  // fake API data
  // const userTrades = {
  //   exists: () => true,
  //   data: () => (fakeDB)
  // };

  const { exists, data } = await getUserDoc(userId, options);

  if (!exists) {
    console.info(`No document found for user [${userId}]`);
    return [];
  };

  // const data = userDoc?.data();
  console.log({ data });
  // saveDocInCache(userId, data);
  const content = jsonify(data?.content || '');
  const trades = content?.trades;
  console.log({ trades });
  return trades;

  // check cache for existing doc
  // const userDocCache = getDocFromCache(userId);
  // if cache, serve from there
  // if (userDocCache !== null) {
  //   console.log('serving user doc from cache...');
  //   const content = jsonify(userDocCache.content || '');
  //   const trades = content?.trades;
  //   console.log({ trades });
  //   return trades;
  // } else {
  //   console.log('serving user doc from DB...');
  //   // else get from DB
  //   // save fetched doc from DB in cache for later ref
  //   const userDoc = await getDoc(doc(db, "tradelogs-stringified", userId));

  //   if (!userDoc?.exists()) return [];

  //   const data = userDoc?.data();
  //   saveDocInCache(userId, data);
  //   const content = jsonify(data?.content || '');
  //   const trades = content?.trades;
  //   console.log({ trades });
  //   return trades;
  // }
} 

export const createNewTradeLog = async (newTrade, userId) => {
  const tradelogRef = doc(db, "tradelogs-stringified", userId)
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


