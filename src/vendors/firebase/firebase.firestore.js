import './firebase';
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"
// import { getDocFromCache, saveDocInCache } from "./firebase.cache";

const db = getFirestore();

// const fakeDB = {
//   trades: [
//     {
//       closingPrice: "11.50",
//       date: "1",
//       month: "October",
//       name: "Cellect Biotechnology",
//       notes: "Awesome win today!",
//       numberOfShares: 2,
//       openingPrice: "10.50",
//       stopLoss: "9.00",
//       takeProfit: "12.00",
//       ticker: "APOPA",
//       tradeType: "long",
//       year: "2021",
//       tradeId: 'xwtr34535',
//     },
//     {
//       closingPrice: "15.00",
//       date: "2",
//       month: "October",
//       name: "Atlantic American",
//       notes: "Nice!",
//       numberOfShares: 3,
//       openingPrice: "10.00",
//       stopLoss: "9.00",
//       takeProfit: "20.00",
//       ticker: "AAME",
//       year: "2021",
//       tradeId: '74t6e657',
//     },
//     {
//       closingPrice: "43543543.00",
//       date: "8",
//       month: "October",
//       name: "Aeglea Biotherapeutics",
//       notes: "3453455",
//       numberOfShares: 3,
//       openingPrice: "4353.00",
//       stopLoss: "54543.00",
//       takeProfit: "4534.00",
//       ticker: "AGLE",
//       year: "2021",
//       tradeId: 'xn73i434x',
//     },
//     {
//       closingPrice: "15.00",
//       date: "2",
//       month: "October",
//       name: "Tesla",
//       notes: "Cool!",
//       numberOfShares: 10,
//       openingPrice: "17.00",
//       stopLoss: "7.00",
//       takeProfit: "18.00",
//       ticker: "TSLA",
//       year: "2021",
//       tradeId: 'x4w56wx54',
//     }
//   ],
//   userId: '51XeDcMHQzYfB3clHKZZnnp87uq2',
// }

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

// const getUserDoc = async (
//   userId, 
//   options = { 
//     useCache: false, 
//     cacheDurationInMinutes: 1,
//   },
// ) => {
//   // flags
//   const useCache = options.useCache || false;
//   const cacheDurationInMinutes = options.cacheDurationInMinutes || 1;

//   console.log({ ...options });
//   if (!userId || typeof userId !== 'string') {
//     throw new Error('Please pass in a user id to get document');
//   }

//   const getUserDocFromFirestore = async (userId) => {
//     const userDoc = await getDoc(doc(db, "tradelogs-stringified", userId));
//     return { 
//       exists: userDoc?.exists(),
//       data: userDoc?.data(),
//     };
//   }

//   const getUserDocFromCache = async (userId) => {
//     const { exists, data, expiration } = await getDocFromCache(userId);
//     return { 
//       exists, 
//       data, 
//       expiration 
//     }; 
//   }

//   if (!useCache) {
//     console.log(
//       `useCache [${useCache}]... getting user doc from firebase DB`
//     );
//     const { exists, data } = await getUserDocFromFirestore(userId); 
//     if (exists) {
//       saveDocInCache(
//         userId, 
//         stringify(data), 
//         cacheDurationInMinutes
//       );
//     }
//     return { exists, data };
//   }
  
//   if (useCache) {
//     const { exists, data, expiration } = await getUserDocFromCache(userId);
//     const isCacheExpired = expiration !== null && new Date().getTime() > expiration;

//     console.log({ exists, data, expiration, isCacheExpired, currentTime: new Date().getTime() });

//     if (!exists || isCacheExpired) {
//       console.log(
//         `useCache [${useCache}], but cache either doesn't have doc OR is expired... getting user doc from firebase DB`
//       );
//       const { exists, data } = await getUserDocFromFirestore(userId); 
//       if (exists) {
//         saveDocInCache(
//           userId, 
//           stringify(data), 
//           cacheDurationInMinutes
//         );
//       }
//       return { exists, data };
//     }

//     console.log(
//       `useCache [${useCache}]... getting user doc from cache`
//     );
//     return { exists, data };
//   }
// }

// export const fetchAllTradesByUserId = async (
//   userId, 
//   options = { useCache: true, cacheDurationInMinutes: 0.15 },
// ) => {
//   if (!userId || typeof userId !== 'string') {
//     throw new Error('Please pass in a user id to get stocks');
//   }

//   // fake API data
//   // const userTrades = {
//   //   exists: () => true,
//   //   data: () => (fakeDB)
//   // };

//   const { exists, data } = await getUserDoc(userId, options);

//   if (!exists) {
//     console.info(`No document found for user [${userId}]`);
//     return [];
//   };

//   // const data = userDoc?.data();
//   console.log({ data });
//   // saveDocInCache(userId, data);
//   const content = jsonify(data?.content || '');
//   const trades = content?.trades;
//   console.log({ trades });
//   return trades;

//   // check cache for existing doc
//   // const userDocCache = getDocFromCache(userId);
//   // if cache, serve from there
//   // if (userDocCache !== null) {
//   //   console.log('serving user doc from cache...');
//   //   const content = jsonify(userDocCache.content || '');
//   //   const trades = content?.trades;
//   //   console.log({ trades });
//   //   return trades;
//   // } else {
//   //   console.log('serving user doc from DB...');
//   //   // else get from DB
//   //   // save fetched doc from DB in cache for later ref
//   //   const userDoc = await getDoc(doc(db, "tradelogs-stringified", userId));

//   //   if (!userDoc?.exists()) return [];

//   //   const data = userDoc?.data();
//   //   saveDocInCache(userId, data);
//   //   const content = jsonify(data?.content || '');
//   //   const trades = content?.trades;
//   //   console.log({ trades });
//   //   return trades;
//   // }
// } 

// export const createNewTradeLog = async (newTrade, userId) => {
//   const tradelogRef = doc(db, "tradelogs-stringified", userId)
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

const getTradeLogsDocById = async (docId) => {
  if (!docId || typeof docId !== 'string') {
    throw new Error(
      'Please pass in a valid doc id to fetch document from Firestore'
    );
  }
  return await getDoc(doc(db, "tradelogs-stringified", docId));
}

export const fetchAllTradesByUserId = async (userId) => {
  if (!userId || typeof userId !== 'string') {
    throw new Error('Please pass in a valid user id to get trade logs');
  }

  const userTradeLogsDoc = await getTradeLogsDocById(userId);

  if (!userTradeLogsDoc?.exists()) {
    console.info(
      `No trade logs found for user id - [${userId}]. Returning empty array set`
    );
    return [];
  } 

  const userTrades = 
    jsonify(userTradeLogsDoc?.data()?.content || {}).trades || [];

  console.log({ userTrades });

  return userTrades;
} 

export const createNewTradeLog = async (newTrade, userId) => {
  if (!userId || typeof userId !== 'string') {
    throw new Error('Please pass in a valid user id to create a new trade log');
  }

  const validateNewTrade = (newTrade) => {
    if (!newTrade || typeof newTrade !== 'object') {
      return { 
        isValid: false, 
        error: 'Please pass in a valid new trade object', 
      }
    }
    const requiredProperties = [
      'tradeId',
      'openingPrice',
      'closingPrice',
      'stopLoss',
      'takeProfit',
      'date',
      'month',
      'year',
      'notes',
      'numberOfShares',
      'ticker',
      'vwap'
    ]
    const missingProperty = requiredProperties.find(property => {
      return !newTrade.hasOwnProperty(property)
    });

    if (missingProperty) {
      return { 
        isValid: false, 
        error: `[${missingProperty}] property is required to create a new trade` 
      }
    }
    return { isValid: true, error: null };
  }

  const { isValid, error } = validateNewTrade(newTrade);

  if (!isValid) {
    return { error };
  }

  const userTradeLogsRef = doc(db, "tradelogs-stringified", userId)
  const userTradeLogsSnap = await getDoc(userTradeLogsRef) ;

  if (userTradeLogsSnap.exists()) {
    // update existing document by adding new trade to trades list
    const { content } = userTradeLogsSnap.data() || {};
    const existingData = jsonify(content);
    const { userId, trades = [] } = existingData;
    const newData = {
      trades: [
        ...trades,
        { ...newTrade },
      ],
      userId,
    }
    const newDataStringified = stringify(newData);
    try {
      await updateDoc(userTradeLogsRef, {
        content: newDataStringified,
      });
      return { isNewTradeLogCreated: true };
    } catch (error) {
      return { 
        error: (error && error.message) || 
          'Unable to create new trade at the moment. Try again later.' 
      }
    }
  } else {
    // set up a new document and add new trade to trades list
    const newData = {
      trades: [{ ...newTrade }],
      userId,
    }
    const newDataStringified = stringify(newData);
    try {
      await setDoc(doc(db, "tradelogs-stringified", userId), {
        content: newDataStringified,
      });
      return { isNewTradeLogCreated: true };
    } catch (error) {
      return { 
        error: (error && error.message) || 
          'Unable to create new trade at the moment. Try again later.' 
      }
    }
  }
}

export const deleteTradeLog = async (tradeLogId, userId) => {
  if (!tradeLogId || typeof tradeLogId !== 'string') {
    throw new Error('Please pass in a valid trade log id to delete');
  }
  if (!userId || typeof userId !== 'string') {
    throw new Error('Please pass in a valid user id to delete a trade log');
  }

  const userTradeLogsRef = doc(db, "tradelogs-stringified", userId)
  const userTradeLogsSnap = await getDoc(userTradeLogsRef);

  if (userTradeLogsSnap.exists()) {
    // update existing trade logs list by removing matching trade id
    const { content } = userTradeLogsSnap.data() || {};
    const existingData = jsonify(content);
    const { userId, trades = [] } = existingData;
    const filteredTrades = trades.filter(trade => trade.tradeId !== tradeLogId);
    const newData = {
      trades: [...filteredTrades],
      userId,
    }
    const newDataStringified = stringify(newData);
    try {
      await updateDoc(userTradeLogsRef, {
        content: newDataStringified,
      });
      return { isTradeLogDeleted: true, deletedTradeLogId: tradeLogId };
    } catch (error) {
      return { 
        error: (error && error.message) || 
          'Unable to delete trade log at the moment. Try again later.' 
      }
    }
  }
}

export const updateTradeLog = async (tradeLogId, updatedTradeLog, userId) => {
  if (!tradeLogId || typeof tradeLogId !== 'string') {
    throw new Error('Please pass in a valid trade log id to delete');
  }
  if (!userId || typeof userId !== 'string') {
    throw new Error('Please pass in a valid user id to delete a trade log');
  }

  
  const validateNewTrade = (updatedTrade) => {
    if (!updatedTrade || typeof updatedTrade !== 'object') {
      throw new Error('Please pass in a valid updated trade object');
    }
    const requiredProperties = [
      'tradeId',
      'openingPrice',
      'closingPrice',
      'stopLoss',
      'takeProfit',
      'date',
      'month',
      'year',
      'notes',
      'numberOfShares',
      'ticker',
    ]
    const missingProperty = requiredProperties.find(property => {
      return !updatedTrade.hasOwnProperty(property)
    });

    if (missingProperty) {
      return { 
        isValid: false, 
        error: `[${missingProperty}] property is required to update a trade` 
      }
    }
    return { isValid: true, error: null };
  }

  const { isValid, error } = validateNewTrade(updatedTradeLog);

  if (!isValid) {
    throw new Error(error);
  }

  const userTradeLogsRef = doc(db, "tradelogs-stringified", userId)
  const userTradeLogsSnap = await getDoc(userTradeLogsRef);

  if (userTradeLogsSnap.exists()) {
    // update existing trade logs list by removing matching trade id
    const { content } = userTradeLogsSnap.data() || {};
    const existingData = jsonify(content);
    const { userId, trades = [] } = existingData;
    const updatedTrades = trades.map((trade) => {
      if (trade.tradeId === tradeLogId) {
        return { ...updatedTradeLog };
      }
      return trade;
    });
    const newData = {
      trades: [...updatedTrades],
      userId,
    }
    const newDataStringified = stringify(newData);
    try {
      await updateDoc(userTradeLogsRef, {
        content: newDataStringified,
      });
      return { isTradeLogUpdated: true, updatedTradeLogId: tradeLogId };
    } catch (error) {
      return { 
        error: (error && error.message) || 
          'Unable to delete trade log at the moment. Try again later.' 
      }
    }
  }
}




