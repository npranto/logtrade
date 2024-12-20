'use client';

import { useEffect, useState } from 'react';
import TradingCalendarView from '../components/CustomCalendar';
import TradingCalendarViewMobile from '../components/CustomCalendarMobile';
import AddNewTradeBtn from '../components/AddNewTradeBtn';
import AddNewTradeFormModal from '../components/AddNewTradeFormModal';
import { MOCK_TRADES_SIMPLE } from '../data/mock-trades';
import EditTradeFormModal from '../components/EditTradeFormModal';

const DashboardPage = () => {
  // State to track window width
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

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

  // Handle "Add Trade" button click
  const handleAddTrade = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
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

      {/* Add the floating Add Trade button */}
      <AddNewTradeBtn onAddTrade={handleAddTrade} />

      {/* Conditionally render the modal */}
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
