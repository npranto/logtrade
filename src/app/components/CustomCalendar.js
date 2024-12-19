'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  format,
  getDay,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
} from 'date-fns';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa';

const TradingCalendarView = ({ trades }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });

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

  const firstDayOfMonth = getDay(start);

  return (
    <div className="p-6 max-w-5xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Trading Calendar</h1>
          <p className="text-gray-500 text-sm">
            View your trading performance for the selected month
          </p>
        </div>

        {/* Monthly Stats */}
        <div className="flex sm:space-x-4 space-x-2 mt-4 sm:mt-0 text-sm">
          <div className="flex items-center bg-green-100 p-2 rounded-lg shadow">
            <FaArrowUp className="text-green-600 mr-2 text-xl" />
            <div>
              <p className="text-gray-500 text-xs">Total Gains</p>
              <p className="text-green-600 font-bold">
                +${monthlyStats.totalGains.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center bg-red-100 p-2 rounded-lg shadow">
            <FaArrowDown className="text-red-600 mr-2 text-xl" />
            <div>
              <p className="text-gray-500 text-xs">Total Losses</p>
              <p className="text-red-600 font-bold">
                -${Math.abs(monthlyStats.totalLosses).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg shadow">
            <FaBalanceScale
              className={`mr-2 text-xl ${monthlyStats.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}
            />
            <div>
              <p className="text-gray-500 text-xs">Net Profit</p>
              <p
                className={`text-xl font-bold ${
                  monthlyStats.netProfit >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                ${monthlyStats.netProfit.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Header Navigation */}
      <div className="flex justify-between items-center mb-6">
        {/* Current Month and Today Button (left-aligned) */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleToday}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Today
          </button>
          <h2 className="text-2xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        </div>

        {/* Navigation Buttons (right-aligned) */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="flex items-center bg-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition"
          >
            <AiFillLeftCircle className="mr-2 text-indigo-600" size={20} />
            {format(subMonths(currentMonth, 1), 'MMMM')}
          </button>
          <button
            onClick={handleNextMonth}
            className="flex items-center bg-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition"
          >
            {format(addMonths(currentMonth, 1), 'MMMM')}
            <AiFillRightCircle className="ml-2 text-indigo-600" size={20} />
          </button>
        </div>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-2 text-center text-gray-500 font-medium mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty placeholders for alignment */}
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="opacity-0"></div>
          ))}

        {days.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const total = totalsByDate[dateKey] || 0;
          const isWeekend = [0, 6].includes(getDay(day));
          const bgColor = isWeekend
            ? 'bg-gray-200'
            : total > 0
              ? 'bg-green-100'
              : total < 0
                ? 'bg-red-100'
                : 'bg-gray-50';
          const textColor =
            total > 0 ? 'text-green-600' : total < 0 ? 'text-red-600' : 'text-gray-800';
          const highlightToday = isToday(day) ? 'ring-2 ring-indigo-600' : '';

          return (
            <div key={day} className={`p-4 rounded-lg shadow-sm ${bgColor} ${highlightToday}`}>
              <div className="font-bold">{format(day, 'd')}</div>
              {!isWeekend && (
                <div className={`text-sm font-medium ${textColor}`}>
                  {total > 0 ? `+$${total}` : total < 0 ? `-$${Math.abs(total)}` : ''}
                </div>
              )}
              {isWeekend && <div className="text-xs text-gray-400">No Trades</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

TradingCalendarView.propTypes = {
  trades: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      outcome: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TradingCalendarView;
