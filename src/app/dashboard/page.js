'use client';

import { useEffect, useState } from 'react';
import TradingCalendarView from '../components/CustomCalendar';
import TradingCalendarViewMobile from '../components/CustomCalendarMobile';
import AddNewTradeBtn from '../components/AddNewTradeBtn';
import AddNewTradeFormModal from '../components/AddNewTradeFormModal';
import { MOCK_TRADE_SUBMISSION, MOCK_TRADES_SIMPLE } from '../data/mock-trades';
import SidebarModal from '../components/SidebarModal';
import EditTradeBtn from '../components/EditTradeBtn';
import EditTradeFormModal from '../components/EditTradeFormModal';

const DashboardPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAddNewTradeFormModalOpen, setIsAddNewTradeFormModalOpen] = useState(false);
  const [isEditTradeFormModalOpen, setIsEditTradeFormModalOpen] = useState(false);
  // const [userSelectedDate, setUserSelectedDate] = useState(null);
  const [isTradesSidebarOpen, setIsTradesSidebarOpen] = useState(false);

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

  // const handleUserSelectedDate = (date) => {
  //   setUserSelectedDate(date);
  //   setIsTradesSidebarOpen(true);
  // };

  const handleCloseTradesSidebar = () => {
    setIsTradesSidebarOpen(false);
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

      <AddNewTradeBtn onAddTrade={handleAddNewTrade} />
      <EditTradeBtn onEditTrade={handleUpdateTrade} />

      {isAddNewTradeFormModalOpen && (
        <div className="modal-overlay" onClick={handleCloseAddNewTradeFormModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddNewTradeFormModal
              onClose={handleCloseAddNewTradeFormModal}
              onSubmit={(formData) => console.log({ formData })}
            />
          </div>
        </div>
      )}

      {isEditTradeFormModalOpen && (
        <div className="modal-overlay" onClick={handleCloseEditTradeFormModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <EditTradeFormModal
              tradeToEdit={MOCK_TRADE_SUBMISSION}
              onClose={handleCloseEditTradeFormModal}
              onSubmit={(formData) => console.log({ formData })}
            />
          </div>
        </div>
      )}

      {/* Sidebar Modal */}
      {isTradesSidebarOpen && (
        <SidebarModal
          // date={userSelectedDate}
          onClose={handleCloseTradesSidebar}
        />
      )}
    </main>
  );
};

export default DashboardPage;
