'use client';

import { useEffect, useState } from 'react';
import TradingCalendarView from '../components/CustomCalendar';
import TradingCalendarViewMobile from '../components/CustomCalendarMobile';
import AddNewTradeBtn from '../components/AddNewTradeBtn';
import AddNewTradeFormModal from '../components/AddNewTradeFormModal';
import { MOCK_TRADES_SIMPLE } from '../data/mock-trades';

const DashboardPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', checkScreenSize);

    checkScreenSize();

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleAddTrade = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex flex-col gap-8 flex-grow">
        {isMobile ? (
          <TradingCalendarViewMobile trades={MOCK_TRADES_SIMPLE} />
        ) : (
          <TradingCalendarView trades={MOCK_TRADES_SIMPLE} />
        )}
      </div>

      <AddNewTradeBtn onAddTrade={handleAddTrade} />

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddNewTradeFormModal
              onClose={handleCloseModal}
              onSubmit={(formData) => console.log({ formData })}
            />
            {/* <EditTradeFormModal
              onClose={handleCloseModal}
              onSubmit={(formData) => console.log({ formData })}
            /> */}
          </div>
        </div>
      )}
    </main>
  );
};

export default DashboardPage;
