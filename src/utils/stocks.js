// import getUniqueId from "./getUniqueId";

// let DB_STOCK = [];

// export const updateStock = (userId, stockId, updatedStock) => {
//   const existingStock = DB_STOCK
//     .find(stock => stock.userId === userId && stockId === stockId);
//   if (!existingStock) {
//     return {
//       error: 'Unable to find stock in database. Try again later.'
//     }
//   }
//   DB_STOCK.map((stock) => {
//     if (stock)
//   })
// }

// export const createNewStock = (userId, stock = null, month, date, year) => {
//   const newStock = {
//     userId,
//     stockId: getUniqueId(),
//     stock,
//     month, 
//     date, 
//     year,
//   }
//   DB_STOCK = [...DB_STOCK, newStock];
// }

// export const fetchStocksByMonthAndYear = (userId, month, year) => {
//   // 1. checks if user is logged in or not
//   // 2. if user is not logged in, throw an error stating unauthorized access
//   // 3. otherwise, get user by uid and pass in user uid, month and year to 
//   // fetch all stocks from DB

//   // after fetch, format data to look similar to data underneath...

//   // make API call to firebase DB to get all stocks for current month and 
//   // year for currently logged in user
//   return [...DB_STOCK];
// }

// export const findMatchingStock = (stocks = [], month, date, year) => {
//   if (!stocks.length || !Array.isArray(stocks)) return;
//   return stocks.find(stock => (
//     (stock.month === month) && 
//     (stock.date === date) &&
//     (stock.year === year)
//   ));
// }