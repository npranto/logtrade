'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isToday } from 'date-fns';
import { FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa';

const TradingCalendarViewMobile = ({ trades }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);

  // Aggregate the daily gains/losses
  const totalsByDate = trades.reduce((acc, trade) => {
    const date = trade.date;
    if (!acc[date]) acc[date] = 0;
    acc[date] += trade.outcome;
    return acc;
  }, {});

  // Calculate Monthly Stats
  const monthlyStats = trades.reduce(
    (acc, trade) => {
      const tradeDate = new Date(trade.date);
      if (tradeDate >= start && tradeDate <= end) {
        acc.totalGains += trade.outcome > 0 ? trade.outcome : 0;
        acc.totalLosses += trade.outcome < 0 ? trade.outcome : 0;
        acc.netProfit += trade.outcome;
      }
      return acc;
    },
    { totalGains: 0, totalLosses: 0, netProfit: 0 },
  );

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleToday = () => setCurrentMonth(today);

  const days = Array.from({ length: end.getDate() }, (_, index) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1);
    return { date, total: totalsByDate[format(date, 'yyyy-MM-dd')] || 0 };
  });

  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto">
      {/* Header Section */}
      <div className="flex flex-col mb-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Trading Calendar</h1>
        <p className="text-gray-500 text-sm text-center">
          View your trading performance for the selected month
        </p>

        {/* Monthly Stats - Horizontal Layout for Compactness */}
        <div className="flex-col justify-between space-y-4 mt-4">
          <div className="flex flex-row items-center justify-between gap-2 bg-green-100 p-3 rounded-lg shadow">
            <FaArrowUp className="text-green-600 mb-1 text-sm" />
            <p className="text-gray-500 text-xs">Gains</p>
            <p className="text-green-600 font-bold flex-grow text-right">
              +${monthlyStats.totalGains.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between gap-2 bg-red-100 p-3 rounded-lg shadow">
            <FaArrowDown className="text-red-600 mb-1 text-sm" />
            <p className="text-gray-500 text-xs">Losses</p>
            <p className="text-red-600 font-bold flex-grow text-right">
              -${Math.abs(monthlyStats.totalLosses).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between gap-2 bg-gray-100 p-3 rounded-lg shadow">
            <FaBalanceScale
              className={`mb-1 text-sm ${monthlyStats.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}
            />
            <p className="text-gray-500 text-xs">Net</p>
            <p
              className={`font-bold flex-grow text-right ${
                monthlyStats.netProfit >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              ${monthlyStats.netProfit.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Header Navigation */}
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>

        <div className="flex justify-between items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="bg-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition flex items-center"
          >
            <span className="text-xl">{format(subMonths(currentMonth, 1), 'MMM')}</span>
          </button>

          <button
            onClick={handleToday}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Today
          </button>
          <button
            onClick={handleNextMonth}
            className="bg-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition flex items-center"
          >
            <span className="text-xl">{format(addMonths(currentMonth, 1), 'MMM')}</span>
          </button>
        </div>
      </div>

      {/* Days List (Compact View) */}
      <div className="space-y-2">
        {days.map((day) => {
          const isWeekend = [0, 6].includes(day.date.getDay());
          const textColor =
            day.total > 0 ? 'text-green-600' : day.total < 0 ? 'text-red-600' : 'text-gray-800';
          const highlightToday = isToday(day.date) ? 'ring-2 ring-indigo-600' : '';

          return (
            <div
              key={day.date}
              className={`flex items-center justify-between p-3 rounded-lg shadow-sm bg-gray-50 ${highlightToday}`}
            >
              <div className="flex flex-col items-start">
                <div className={`font-bold ${isWeekend ? 'text-gray-400' : ''}`}>
                  {format(day.date, 'd')}
                </div>
                <div className="text-xs text-gray-500">{format(day.date, 'EEE')}</div>
              </div>
              <div className={`text-sm font-medium ${textColor}`}>
                {day.total > 0
                  ? `+${day.total}`
                  : day.total < 0
                    ? `-${Math.abs(day.total)}`
                    : 'No Trades'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

TradingCalendarViewMobile.propTypes = {
  trades: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      outcome: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TradingCalendarViewMobile;
