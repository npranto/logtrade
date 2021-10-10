export const getTotalProfitFromTrades = (trades = []) => {
  if (trades === null || !trades.length) return '0.00';
  return trades
    // extract each trade properties to calculate total profit
    .map(trade => ({ 
      tradeType: trade.tradeType, 
      openingPrice: parseFloat(trade.openingPrice).toFixed(2),
      closingPrice: parseFloat(trade.closingPrice).toFixed(2),
      numberOfShares: parseInt(trade.numberOfShares),
    }))
    // calculate each trade profit by trade type
    .map((trade) => {
      // on short trade, opening price > closing price
      if (trade.tradeType === 'short') {
        return (trade.openingPrice - trade.closingPrice) * trade.numberOfShares;
      }
      // on long trade, closing price > opening price
      return (trade.closingPrice - trade.openingPrice) * trade.numberOfShares;
    }) 
    // adds up all the trade profits together
    .reduce((totalProfit, eachTradeProfit) => {
      return totalProfit + (eachTradeProfit);
    }, 0)
    .toFixed(2);
}

export const getTickersFromTrades = (trades = []) => {
  if (trades === null || !trades.length) return '';
  return trades
    .map(trade => trade.ticker)
    .join(', ');
}

export const getUserFromLocalStorage = () => {
  const userStringified = localStorage.getItem('logtrade:::user');
  if (userStringified === null) return null;
  return JSON.parse(userStringified);
}

export const getMonthFromDate = (date) => {
  if (!date) {
    throw new Error('Please pass in a date to get month name');
  }

  const MONTHS_FULL= [
    "January","February","March","April","May","June","July",
    "August","September","October","November","December"
  ];

  const monthIndex = date.getMonth();

  if (monthIndex < 0 || monthIndex > 11) {
    throw new Error(
      'Invalid month detected, check to ensure valid date is passed'
    );
  }

  return MONTHS_FULL[monthIndex];
}

export const getDateFromDate = (date) => {
  if (!date) {
    throw new Error('Please pass in a date to get month name');
  }
  return date.getDate();
}

export const getYearFromDate = (date) => {
  if (!date) {
    throw new Error('Please pass in a date to get month name');
  }
  return date.getFullYear();
}

export const getDayFromDate = (date) => {
  if (!date) {
    throw new Error('Please pass in a date to get month name');
  }
  const DAYS = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday'
  ];

  const dayIndex = date.getDay();

  if (dayIndex < 0 || dayIndex > 6) {
    throw new Error(
      'Invalid day detected, check to ensure valid date is passed'
    );
  }

  return DAYS[dayIndex];
}

export const getNumberOfDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Given a date, returns date of previous month. Note: the default date 
 * if previous month is set to 1 by default
 * @param {Date} date - a Date object
 * @returns {Date} - a Date object
 */
export const getPrevMonthFromDate = (date) => {
  if (!date || !(date instanceof Date)) {
    throw new Error(
      'Please pass in a `Date` object to generate previous month'
    );
  }
  const x = new Date(date);
  x.setDate(1);
  x.setMonth(x.getMonth() - 1);
  return x;
}

/**
 * Given a date, returns date of next month. Note: the default date 
 * if previous month is set to 1 by default
 * @param {Date} date - a Date object
 * @returns {Date} - a Date object
 */
 export const getNextMonthFromDate = (date) => {
  if (!date || !(date instanceof Date)) {
    throw new Error('Please pass in a `Date` object to generate next month');
  }
  const x = new Date(date);
  x.setDate(1);
  x.setMonth(x.getMonth() + 1);
  return x;
}

export const addMinutesToDate = (date = new Date(), minutesToAdd = 0) => {  
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + (minutesToAdd * 60000));
  return futureDate.getTime();
}