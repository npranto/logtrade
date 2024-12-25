'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isToday } from 'date-fns';
import { FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

const TradingCalendarViewMobile = ({ trades, onUserSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);

  // aggregate trades by date
  const totalsByDate = trades.reduce((acc, trade) => {
    const tradeDate = format(new Date(trade.tradeDate), 'yyyy-MM-dd');
    const outcome = parseFloat(trade.priceClosed) - parseFloat(trade.priceOpened);

    if (!acc[tradeDate]) acc[tradeDate] = 0;
    acc[tradeDate] += outcome * parseFloat(trade.shares);
    return acc;
  }, {});

  // monthly stats calculations
  const monthlyStats = trades.reduce(
    (acc, trade) => {
      const tradeDate = new Date(trade.tradeDate);
      if (tradeDate >= start && tradeDate <= end) {
        const outcome =
          (parseFloat(trade.priceClosed) - parseFloat(trade.priceOpened)) *
          parseFloat(trade.shares);

        acc.totalGains += outcome > 0 ? outcome : 0;
        acc.totalLosses += outcome < 0 ? outcome : 0;
        acc.netProfit += outcome;
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

  const handleDayClick = (day) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    if (totalsByDate[dateKey]) {
      onUserSelectedDate(dateKey);
    }
  };

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

      {/* Days List */}
      <div className="space-y-2">
        {days.map((day) => {
          const isWeekend = [0, 6].includes(day.date.getDay());
          const textColor =
            !isWeekend && day.total > 0
              ? 'text-green-600'
              : !isWeekend && day.total < 0
                ? 'text-red-600'
                : 'text-gray-400';
          const highlightToday = isToday(day.date) ? 'ring-2 ring-indigo-600' : '';

          return (
            <div
              key={day.date}
              className={`flex items-center justify-between p-3 rounded-lg shadow-sm ${highlightToday}`}
              style={{
                background: isWeekend
                  ? 'rgba(169, 169, 169, 0.3)'
                  : day.total > 0
                    ? 'rgba(0, 128, 0, 0.1)'
                    : day.total < 0
                      ? 'rgba(255, 0, 0, 0.1)'
                      : 'var(--background)',
                color: 'var(--foreground)',
              }}
              onClick={() => !isWeekend && handleDayClick(day.date)}
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
                {isWeekend
                  ? 'No Trades' // always "No Trades" for weekends
                  : day.total > 0
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
      id: PropTypes.number.isRequired,
      ticker: PropTypes.string.isRequired,
      tradeType: PropTypes.string.isRequired,
      tradeDate: PropTypes.string.isRequired,
      shares: PropTypes.string.isRequired,
      priceOpened: PropTypes.string.isRequired,
      priceClosed: PropTypes.string.isRequired,
      stopLoss: PropTypes.string.isRequired,
      takeProfit: PropTypes.string.isRequired,
      notes: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onUserSelectedDate: PropTypes.func.isRequired,
};

export default TradingCalendarViewMobile;
