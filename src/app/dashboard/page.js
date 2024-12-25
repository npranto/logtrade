'use client';

import { useState } from 'react';
import TradingCalendarView from '../components/CustomCalendar';
import TradingCalendarViewMobile from '../components/CustomCalendarMobile';
import AddNewTradeBtn from '../components/AddNewTradeBtn';
import AddNewTradeFormSidebar from '../components/AddNewTradeFormSidebar';
import { MOCK_TRADE_SUBMISSION, MOCK_TRADES_SIMPLE } from '../data/mock-trades';
import EditTradeBtn from '../components/EditTradeBtn';
import EditTradeFormSidebar from '../components/EditTradeFormSidebar';
import TradesByDateSidebar from '../components/TradesByDateSidebar';
import { useUserDetails } from '../hooks/useUserDetails';
import { useIsMobile } from '../hooks/useIsMobile';

const DashboardPage = () => {
  const isMobile = useIsMobile(768);
  const {
    userDetails,
    isLoading: isLoadingUserDetails,
    error: userDetailsError,
  } = useUserDetails();

  const [isAddNewTradeFormSidebarOpen, setIsAddNewTradeFormSidebarOpen] = useState(false);
  const [isEditTradeFormSidebarOpen, setIsEditTradeFormSidebarOpen] = useState(false);
  const [isTradesSidebarOpen, setIsTradesSidebarOpen] = useState(false);
  const [userSelectedDate, setUserSelectedDate] = useState(null);

  const handleAddNewTrade = () => {
    setIsAddNewTradeFormSidebarOpen(true);
  };

  const handleCloseAddNewTradeFormSidebar = () => {
    setIsAddNewTradeFormSidebarOpen(false);
  };

  const handleUpdateTrade = () => {
    setIsEditTradeFormSidebarOpen(true);
  };

  const handleCloseEditTradeFormSidebar = () => {
    setIsEditTradeFormSidebarOpen(false);
  };

  const handleCloseTradesSidebar = () => {
    setIsTradesSidebarOpen(false);
  };

  const handleUserSelectedDate = (date) => {
    setUserSelectedDate(date);
    setIsTradesSidebarOpen(true);
  };

  const handleNewTradeSubmission = (formData) => {
    const newTrade = {
      ticker: formData?.ticker || '',
      tradeType: formData?.tradeType || 'long',
      tradeDate: (formData?.tradeDate && new Date(formData?.tradeDate).toISOString()) || '',
      shares: formData?.shares || '',
      priceOpened: formData?.priceOpened || '',
      priceClosed: formData?.priceClosed || '',
      stopLoss: formData?.stopLoss || '',
      takeProfit: formData?.takeProfit || '',
      notes: formData?.notes || '',
    };
    console.log({ newTrade });
  };

  if (isLoadingUserDetails) {
    return (
      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Loading your account details...</p>
      </main>
    );
  }

  if (userDetailsError) {
    return (
      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">{userDetailsError}</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex flex-col gap-8 flex-grow">
        {userDetails && <pre>{JSON.stringify({ userDetails }, null, 2)}</pre>}
        {isMobile ? (
          <TradingCalendarViewMobile
            trades={MOCK_TRADES_SIMPLE}
            onUserSelectedDate={handleUserSelectedDate}
          />
        ) : (
          <TradingCalendarView
            trades={MOCK_TRADES_SIMPLE}
            onUserSelectedDate={handleUserSelectedDate}
          />
        )}
      </div>

      <AddNewTradeBtn onAddTrade={handleAddNewTrade} />
      <EditTradeBtn onEditTrade={handleUpdateTrade} />

      {isAddNewTradeFormSidebarOpen && (
        <AddNewTradeFormSidebar
          onClose={handleCloseAddNewTradeFormSidebar}
          onSubmit={(formData) => handleNewTradeSubmission(formData)}
        />
      )}

      {isEditTradeFormSidebarOpen && (
        <EditTradeFormSidebar
          tradeToEdit={MOCK_TRADE_SUBMISSION}
          onClose={handleCloseEditTradeFormSidebar}
          onSubmit={(formData) => console.log({ formData })}
        />
      )}

      {/* Sidebar Sidebar */}
      {isTradesSidebarOpen && userSelectedDate && (
        <TradesByDateSidebar
          date={userSelectedDate}
          trades={MOCK_TRADES_SIMPLE}
          onClose={handleCloseTradesSidebar}
        />
      )}
    </main>
  );
};

export default DashboardPage;
