'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isToday } from 'date-fns';
import { FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

const TradingCalendarViewMobile = ({ trades }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);

  const totalsByDate = trades.reduce((acc, trade) => {
    const date = trade.date;
    if (!acc[date]) acc[date] = 0;
    acc[date] += trade.outcome;
    return acc;
  }, {});

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
    <div
      className="p-4 sm:p-6 max-w-full mx-auto"
      style={{
        backgroundColor: 'var(--background-light)',
        color: 'var(--foreground-light)',
      }}
    >
      {/* Header Section */}
      <div className="flex flex-col mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground-light)' }}>
          Trading Calendar
        </h1>
        <p className="text-sm" style={{ color: 'var(--foreground-light)', opacity: 0.7 }}>
          View your trading performance for the selected month
        </p>

        {/* Monthly Stats */}
        <div className="flex-col justify-between space-y-4 mt-4">
          <div
            className="flex flex-row items-center justify-between gap-2 p-3 rounded-lg shadow"
            style={{ background: 'rgba(0, 128, 0, 0.1)' }}
          >
            <FaArrowUp className="text-green-600 mb-1 text-sm" />
            <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
              Gains
            </p>
            <p className="font-bold flex-grow text-right text-green-600">
              +${monthlyStats.totalGains.toLocaleString()}
            </p>
          </div>
          <div
            className="flex flex-row items-center justify-between gap-2 p-3 rounded-lg shadow"
            style={{ background: 'rgba(255, 0, 0, 0.1)' }}
          >
            <FaArrowDown className="text-red-600 mb-1 text-sm" />
            <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
              Losses
            </p>
            <p className="font-bold flex-grow text-right text-red-600">
              -${Math.abs(monthlyStats.totalLosses).toLocaleString()}
            </p>
          </div>
          <div
            className="flex flex-row items-center justify-between gap-2 p-3 rounded-lg shadow"
            style={{ background: 'var(--background)' }}
          >
            <FaBalanceScale
              className={`mb-1 text-sm `}
              style={{ color: monthlyStats.netProfit >= 0 ? 'green' : 'red' }}
            />
            <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
              Net
            </p>
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
        <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground-light)' }}>
          {format(currentMonth, 'MMMM yyyy')}
        </h2>

        <div className="flex justify-between items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="flex items-center px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
            style={{ background: 'var(--background)', color: 'var(--foreground)' }}
          >
            <AiFillLeftCircle className="mr-2" size={20} style={{ color: 'var(--foreground)' }} />
            {format(subMonths(currentMonth, 1), 'MMM')}
          </button>

          <button
            onClick={handleToday}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Today
          </button>
          <button
            onClick={handleNextMonth}
            className="flex items-center px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
            style={{ background: 'var(--background)', color: 'var(--foreground)' }}
          >
            {format(addMonths(currentMonth, 1), 'MMM')}
            <AiFillRightCircle className="ml-2" size={20} style={{ color: 'var(--foreground)' }} />
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
              className={`flex items-center justify-between p-3 rounded-lg shadow-sm ${highlightToday}`}
              style={{
                background:
                  day.total > 0
                    ? 'rgba(0, 128, 0, 0.1)'
                    : day.total < 0
                      ? 'rgba(255, 0, 0, 0.1)'
                      : 'var(--background)',
                color: 'var(--foreground)',
              }}
            >
              <div className="flex flex-col items-start">
                <div className={`font-bold ${isWeekend ? 'text-gray-400' : 'text-gray-800'}`}>
                  {format(day.date, 'd')}
                </div>
                <div className="text-xs" style={{ color: 'var(--foreground-light)' }}>
                  {format(day.date, 'EEE')}
                </div>
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
