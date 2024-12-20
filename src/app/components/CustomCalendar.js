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
    <div className="p-6 max-w-5xl mx-auto w-full" style={{ color: 'var(--foreground)' }}>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Trading Calendar</h1>
          <p className="text-sm" style={{ color: 'var(--foreground-light)', opacity: 0.7 }}>
            View your trading performance for the selected month
          </p>
        </header>

        {/* Monthly Stats */}
        <div className="flex sm:space-x-4 space-x-2 mt-4 sm:mt-0 text-sm">
          <div
            className="flex items-center p-2 rounded-lg shadow"
            style={{ background: 'rgba(0, 128, 0, 0.1)' }}
          >
            <FaArrowUp className="mr-2 text-xl" style={{ color: 'green' }} />
            <div>
              <p style={{ color: 'var(--foreground)', opacity: 0.7 }} className="text-xs">
                Total Gains
              </p>
              <p className="font-bold" style={{ color: 'green' }}>
                +${monthlyStats.totalGains.toLocaleString()}
              </p>
            </div>
          </div>
          <div
            className="flex items-center p-2 rounded-lg shadow"
            style={{ background: 'rgba(255, 0, 0, 0.1)' }}
          >
            <FaArrowDown className="mr-2 text-xl" style={{ color: 'red' }} />
            <div>
              <p style={{ color: 'var(--foreground)', opacity: 0.7 }} className="text-xs">
                Total Losses
              </p>
              <p className="font-bold" style={{ color: 'red' }}>
                -${Math.abs(monthlyStats.totalLosses).toLocaleString()}
              </p>
            </div>
          </div>
          <div
            className="flex items-center p-2 rounded-lg shadow"
            style={{ background: 'var(--background)' }}
          >
            <FaBalanceScale
              className="mr-2 text-xl"
              style={{ color: monthlyStats.netProfit >= 0 ? 'green' : 'red' }}
            />
            <div>
              <p style={{ color: 'var(--foreground)', opacity: 0.7 }} className="text-xs">
                Net Profit
              </p>
              <p
                className="font-bold"
                style={{ color: monthlyStats.netProfit >= 0 ? 'green' : 'red' }}
              >
                ${monthlyStats.netProfit.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Header Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleToday}
            className="px-4 py-2 rounded-lg shadow hover:opacity-90 transition text-white bg-indigo-600 hover:bg-indigo-700"
            // style={{ background: 'var(--foreground)', color: 'var(--background)' }}
          >
            Today
          </button>
          <h2 className="text-2xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="flex items-center px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
            style={{ background: 'var(--background)', color: 'var(--foreground)' }}
          >
            <AiFillLeftCircle className="mr-2" size={20} style={{ color: 'var(--foreground)' }} />
            {format(subMonths(currentMonth, 1), 'MMMM')}
          </button>
          <button
            onClick={handleNextMonth}
            className="flex items-center px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
            style={{ background: 'var(--background)', color: 'var(--foreground)' }}
          >
            {format(addMonths(currentMonth, 1), 'MMMM')}
            <AiFillRightCircle className="ml-2" size={20} style={{ color: 'var(--foreground)' }} />
          </button>
        </div>
      </div>

      {/* Days of the Week */}
      <div
        className="grid grid-cols-7 gap-2 text-center font-medium mb-4"
        style={{ color: 'var(--foreground)' }}
      >
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="opacity-0"></div>
          ))}

        {days.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const total = totalsByDate[dateKey] || 0;
          const isWeekend = [0, 6].includes(getDay(day));
          const highlightToday = isToday(day) ? 'ring-2 ring-indigo-600' : '';

          return (
            <div
              key={day}
              className={`p-4 rounded-lg shadow-sm ${highlightToday}`}
              style={{
                background:
                  total > 0
                    ? 'rgba(0, 128, 0, 0.1)'
                    : total < 0
                      ? 'rgba(255, 0, 0, 0.1)'
                      : 'var(--background)',
                color: 'var(--foreground)',
              }}
            >
              <div className="font-bold">{format(day, 'd')}</div>
              {!isWeekend && (
                <div className="text-sm font-medium">
                  {total > 0 ? `+$${total}` : total < 0 ? `-$${Math.abs(total)}` : ''}
                </div>
              )}
              {isWeekend && <div className="text-xs opacity-70">No Trades</div>}
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
