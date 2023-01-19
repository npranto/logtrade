/* eslint-disable consistent-return */
/* eslint-disable default-param-last */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import uniqid from 'uniqid';

export const getStatsFromTrades = (trades = []) => {
	if (trades === null || !trades.length) {
		return {
			gains: '0.00',
			losses: '0.00',
			profit: '0.00',
		};
	}
	const stats = trades
		// extract each trade properties to calculate total profit
		.map((trade) => ({
			tradeType: trade.tradeType,
			openingPrice: parseFloat(trade.openingPrice).toFixed(2),
			closingPrice: parseFloat(trade.closingPrice).toFixed(2),
			numberOfShares: parseInt(trade.numberOfShares, 10),
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
		.reduce(
			(stats, eachTradeProfit) => {
				if (eachTradeProfit > 0) {
					stats.gains += eachTradeProfit;
				}
				if (eachTradeProfit < 0) {
					stats.losses += eachTradeProfit;
				}
				stats.profit += eachTradeProfit;
				return stats;
			},
			{
				gains: 0.0,
				losses: 0.0,
				profit: 0.0,
			}
		);
	return {
		gains: parseFloat(stats.gains).toFixed(2),
		losses: parseFloat(stats.losses).toFixed(2),
		profit: parseFloat(stats.profit).toFixed(2),
	};
};

export const getTotalProfitFromTrades = (trades = []) => {
	if (trades === null || !trades.length) return '0.00';
	const totalProfit = trades
		// extract each trade properties to calculate total profit
		.map((trade) => ({
			tradeType: trade.tradeType,
			openingPrice: parseFloat(trade.openingPrice).toFixed(2),
			closingPrice: parseFloat(trade.closingPrice).toFixed(2),
			numberOfShares: parseInt(trade.numberOfShares, 10),
		}))
		// calculate each trade profit by trade type
		.map((trade) => {
			console.log({ trade });
			// on short trade, opening price > closing price
			if (trade.tradeType === 'short') {
				return (trade.openingPrice - trade.closingPrice) * trade.numberOfShares;
			}
			// on long trade, closing price > opening price
			return (trade.closingPrice - trade.openingPrice) * trade.numberOfShares;
		})
		// adds up all the trade profits together
		.reduce((totalProfit, eachTradeProfit) => {
			console.log({ eachTradeProfit });
			return totalProfit + eachTradeProfit;
		}, 0);
	console.log({ totalProfit });
	return parseFloat(totalProfit).toFixed(2);
};

export const getTickersFromTrades = (trades = []) => {
	if (trades === null || !trades.length) return '';
	return trades.map((trade) => trade.ticker).join(', ');
};

export const getUserFromLocalStorage = () => {
	const userStringified = localStorage.getItem('logtrade:::user');
	if (userStringified === null) return null;
	return JSON.parse(userStringified);
};

export const getMonthFromDate = (date, options = {}) => {
	if (!date) {
		throw new Error('Please pass in a date to get month name');
	}

	const MONTHS_FULL = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const MONTHS_SHORT = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	const monthIndex = date.getMonth();

	if (monthIndex < 0 || monthIndex > 11) {
		throw new Error(
			'Invalid month detected, check to ensure valid date is passed'
		);
	}

	if (options.short) {
		return MONTHS_SHORT[monthIndex];
	}
	return MONTHS_FULL[monthIndex];
};

export const getDateFromDate = (date) => {
	if (!date) {
		throw new Error('Please pass in a date to get month name');
	}
	return date.getDate();
};

export const getYearFromDate = (date) => {
	if (!date) {
		throw new Error('Please pass in a date to get month name');
	}
	return date.getFullYear();
};

export const getDayFromDate = (date) => {
	if (!date) {
		throw new Error('Please pass in a date to get month name');
	}
	const DAYS = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	const dayIndex = date.getDay();

	if (dayIndex < 0 || dayIndex > 6) {
		throw new Error(
			'Invalid day detected, check to ensure valid date is passed'
		);
	}

	return DAYS[dayIndex];
};

export const getNumberOfDaysInMonth = (month, year) =>
	new Date(year, month + 1, 0).getDate();

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
};

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
};

// eslint-disable-next-line no-unused-vars
export const addMinutesToDate = (date = new Date(), minutesToAdd = 0) => {
	const currentDate = new Date();
	const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
	return futureDate.getTime();
};

export const filterTradesByMonthAndYear = (trades = [], month, year) =>
	trades.filter((trade) => trade.month === month && trade.year === year);

export const findMatchingTradesByDate = (trades = [], month, date, year) => {
	if (!trades.length || !Array.isArray(trades)) return;
	return trades.filter(
		(trade) =>
			trade.month === month && trade.date === date && trade.year === year
	);
};

export const getUniqueId = () => uniqid('logtrade-');

export const getActivePage = () => {
	const urlPathName = window?.location?.pathname || '';
	if (urlPathName.includes('/home/')) {
		return 'home';
	}
	if (urlPathName.includes('/login/')) {
		return 'login';
	}
	if (urlPathName.includes('/signup/')) {
		return 'signup';
	}
	return 'dashboard';
};
