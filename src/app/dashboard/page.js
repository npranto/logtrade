'use client';

import { useEffect, useState } from 'react';
import TradingCalendarView from '../components/CustomCalendar';
import TradingCalendarViewMobile from '../components/CustomCalendarMobile';
import AddNewTradeBtn from '../components/AddNewTradeBtn';
import AddNewTradeFormModal from '../components/AddNewTradeFormModal';
import { MOCK_TRADE_SUBMISSION, MOCK_TRADES_SIMPLE } from '../data/mock-trades';
import EditTradeBtn from '../components/EditTradeBtn';
import EditTradeFormModal from '../components/EditTradeFormModal';
import TradesSidebar from '../components/TradesSidebar';

const DashboardPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAddNewTradeFormModalOpen, setIsAddNewTradeFormModalOpen] = useState(false);
  const [isEditTradeFormModalOpen, setIsEditTradeFormModalOpen] = useState(false);
  const [isTradesSidebarOpen, setIsTradesSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Track the selected date

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

  const handleAddNewTrade = () => {
    setIsAddNewTradeFormModalOpen(true);
  };

  const handleCloseAddNewTradeFormModal = () => {
    setIsAddNewTradeFormModalOpen(false);
  };

  const handleUpdateTrade = () => {
    setIsEditTradeFormModalOpen(true);
  };

  const handleCloseEditTradeFormModal = () => {
    setIsEditTradeFormModalOpen(false);
  };

  const handleCloseTradesSidebar = () => {
    setIsTradesSidebarOpen(false);
  };

  // Update selected date when user clicks on a date
  const handleUserSelectedDate = (date) => {
    setSelectedDate(date);
    setIsTradesSidebarOpen(true); // Open sidebar when a date is selected
  };

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex flex-col gap-8 flex-grow">
        {isMobile ? (
          <TradingCalendarViewMobile
            trades={MOCK_TRADES_SIMPLE}
            onUserSelectedDate={handleUserSelectedDate} // Pass the handler for user-selected date
          />
        ) : (
          <TradingCalendarView
            trades={MOCK_TRADES_SIMPLE}
            onUserSelectedDate={handleUserSelectedDate} // Pass the handler for user-selected date
          />
        )}
      </div>

      <AddNewTradeBtn onAddTrade={handleAddNewTrade} />
      <EditTradeBtn onEditTrade={handleUpdateTrade} />

      {isAddNewTradeFormModalOpen && (
        <AddNewTradeFormModal
          onClose={handleCloseAddNewTradeFormModal}
          onSubmit={(formData) => console.log({ formData })}
        />
      )}

      {isEditTradeFormModalOpen && (
        <EditTradeFormModal
          tradeToEdit={MOCK_TRADE_SUBMISSION}
          onClose={handleCloseEditTradeFormModal}
          onSubmit={(formData) => console.log({ formData })}
        />
      )}

      {/* Sidebar Modal */}
      {isTradesSidebarOpen && selectedDate && (
        // <TransitionOverlay onClose={handleCloseTradesSidebar}>
        <TradesSidebar
          date={selectedDate}
          trades={MOCK_TRADES_SIMPLE}
          onClose={handleCloseTradesSidebar}
        />
        // </TransitionOverlay>
      )}
    </main>
  );
};

export default DashboardPage;
