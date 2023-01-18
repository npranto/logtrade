/* eslint-disable import/prefer-default-export */
/* eslint-disable default-param-last */
/* eslint-disable consistent-return */
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

export const findMatchingTradesByDate = (trades = [], month, date, year) => {
	if (!trades.length || !Array.isArray(trades)) return;
	return trades.filter(
		(trade) =>
			trade.month === month && trade.date === date && trade.year === year
	);
};
