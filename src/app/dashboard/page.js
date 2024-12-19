'use client';

import { useEffect, useState } from 'react';
import TradingCalendarView from '../components/CustomCalendar';
import TradingCalendarViewMobile from '../components/CustomCalendarMobile';

const DashboardPage = () => {
  const MOCK_TRADES = [
    // December 2024
    { date: '2024-12-01', stock: 'AAPL', shares: 10, outcome: 250 },
    { date: '2024-12-01', stock: 'TSLA', shares: 5, outcome: -150 },
    { date: '2024-12-02', stock: 'MSFT', shares: 8, outcome: 300 },
    { date: '2024-12-02', stock: 'GOOGL', shares: 6, outcome: -200 },
    { date: '2024-12-03', stock: 'META', shares: 7, outcome: 120 },
    { date: '2024-12-03', stock: 'AMZN', shares: 5, outcome: 80 },
    { date: '2024-12-04', stock: 'NFLX', shares: 10, outcome: 200 },
    { date: '2024-12-05', stock: 'AAPL', shares: 12, outcome: 500 },
    { date: '2024-12-06', stock: 'TSLA', shares: 15, outcome: -100 },
    { date: '2024-12-08', stock: 'AMZN', shares: 8, outcome: 120 },
    { date: '2024-12-09', stock: 'GOOGL', shares: 10, outcome: -250 },
    { date: '2024-12-10', stock: 'NFLX', shares: 3, outcome: -50 },
    { date: '2024-12-12', stock: 'AAPL', shares: 20, outcome: 600 },
    { date: '2024-12-13', stock: 'META', shares: 15, outcome: 500 },
    { date: '2024-12-15', stock: 'MSFT', shares: 10, outcome: -150 },

    // November 2024
    { date: '2024-11-02', stock: 'TSLA', shares: 12, outcome: 400 },
    { date: '2024-11-03', stock: 'AAPL', shares: 8, outcome: 150 },
    { date: '2024-11-05', stock: 'MSFT', shares: 10, outcome: -300 },
    { date: '2024-11-06', stock: 'GOOGL', shares: 6, outcome: 250 },
    { date: '2024-11-07', stock: 'AMZN', shares: 5, outcome: 150 },
    { date: '2024-11-09', stock: 'NFLX', shares: 7, outcome: 100 },
    { date: '2024-11-11', stock: 'AAPL', shares: 5, outcome: -50 },
    { date: '2024-11-12', stock: 'TSLA', shares: 8, outcome: 200 },
    { date: '2024-11-14', stock: 'GOOGL', shares: 10, outcome: 300 },
    { date: '2024-11-15', stock: 'META', shares: 5, outcome: -100 },
    { date: '2024-11-18', stock: 'AAPL', shares: 20, outcome: 1000 },
    { date: '2024-11-21', stock: 'TSLA', shares: 6, outcome: 150 },
    { date: '2024-11-23', stock: 'AMZN', shares: 4, outcome: 50 },

    // October 2024
    { date: '2024-10-02', stock: 'TSLA', shares: 7, outcome: 350 },
    { date: '2024-10-03', stock: 'AAPL', shares: 12, outcome: 200 },
    { date: '2024-10-04', stock: 'GOOGL', shares: 3, outcome: 120 },
    { date: '2024-10-05', stock: 'AMZN', shares: 10, outcome: -200 },
    { date: '2024-10-06', stock: 'META', shares: 4, outcome: 80 },
    { date: '2024-10-08', stock: 'NFLX', shares: 5, outcome: -50 },
    { date: '2024-10-10', stock: 'GOOGL', shares: 5, outcome: 350 },
    { date: '2024-10-12', stock: 'AAPL', shares: 7, outcome: -80 },
    { date: '2024-10-14', stock: 'TSLA', shares: 3, outcome: 200 },
    { date: '2024-10-16', stock: 'MSFT', shares: 9, outcome: 250 },
    { date: '2024-10-18', stock: 'AAPL', shares: 10, outcome: 150 },
    { date: '2024-10-20', stock: 'TSLA', shares: 8, outcome: 250 },

    // September 2024
    { date: '2024-09-01', stock: 'GOOGL', shares: 4, outcome: 200 },
    { date: '2024-09-02', stock: 'AAPL', shares: 15, outcome: 300 },
    { date: '2024-09-03', stock: 'TSLA', shares: 6, outcome: 400 },
    { date: '2024-09-05', stock: 'META', shares: 10, outcome: -200 },
    { date: '2024-09-06', stock: 'MSFT', shares: 8, outcome: 250 },
    { date: '2024-09-07', stock: 'NFLX', shares: 12, outcome: 400 },
    { date: '2024-09-09', stock: 'AAPL', shares: 7, outcome: -50 },
    { date: '2024-09-12', stock: 'TSLA', shares: 9, outcome: 150 },
    { date: '2024-09-15', stock: 'GOOGL', shares: 8, outcome: -300 },
    { date: '2024-09-18', stock: 'MSFT', shares: 11, outcome: 400 },
    { date: '2024-09-20', stock: 'NFLX', shares: 5, outcome: 150 },
    { date: '2024-09-22', stock: 'AAPL', shares: 6, outcome: 100 },
    { date: '2024-09-25', stock: 'TSLA', shares: 2, outcome: 50 },
  ];
  // State to track window width
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen size on mount
    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // Set to mobile view if screen width is <= 768px
      } else {
        setIsMobile(false); // Set to desktop view if screen width is > 768px
      }
    };

    // Add event listener to track window resize
    window.addEventListener('resize', checkScreenSize);

    // Initial check on component mount
    checkScreenSize();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex flex-col gap-8 flex-grow">
        {isMobile ? (
          <TradingCalendarViewMobile trades={MOCK_TRADES} />
        ) : (
          <TradingCalendarView trades={MOCK_TRADES} />
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
