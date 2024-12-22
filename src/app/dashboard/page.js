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
import { useUser } from '@clerk/nextjs';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { FIREBASE_DB } from '../../services/firebase/config';
// import { getData } from '@/services/firebase/getData';
import { fetchUserById, saveNewUser } from '@/utils/users';
// import { useAuth, useUser } from '@clerk/nextjs';

const DashboardPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAddNewTradeFormModalOpen, setIsAddNewTradeFormModalOpen] = useState(false);
  const [isEditTradeFormModalOpen, setIsEditTradeFormModalOpen] = useState(false);
  const [isTradesSidebarOpen, setIsTradesSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Track the selected date
  const [userProfile, setUserProfile] = useState(null);

  const { user } = useUser() || {};

  console.log({ user });

  useEffect(() => {
    async function setupUserProfile() {
      // check if user exists and logged in
      if (!user) return;

      // get user id of logged in user from clerk auth hook
      const userId = user?.id;

      if (!userId || typeof userId !== 'string' || !userId?.length) return;

      // fetch user by user id from firebase DB
      const [fetchUserError, fetchedUser] = await fetchUserById(userId);

      if (fetchUserError) return;

      // if user exists, save the data to local userProfile state
      if (fetchedUser !== null) {
        console.log('saved user profile to local state');
        setUserProfile(fetchedUser);
      } else {
        console.log('ready to create new user to DB');

        // if user does not exist, create a new user document
        const newUser = {
          userId: user?.id,
          fullName: user?.fullName || '',
          email: user?.emailAddresses[0]?.emailAddress || '',
          profilePicture: user?.imageUrl || '',
          joinedAt: new Date().toISOString(),
        };
        const [saveNewUserError, newUserId] = await saveNewUser(userId, newUser);

        if (saveNewUserError) return;

        // refetch user id from firebase DB and save the data to local userProfile state
        const [fetchNewUserError, fetchedNewUser] = await fetchUserById(newUserId);

        if (fetchNewUserError) return;

        // if user exists, save the data to local userProfile state
        if (fetchedNewUser !== null) {
          console.log('saved user profile to local state');
          setUserProfile(fetchedNewUser);
        }
      }
    }
    setupUserProfile();
  }, [user]);

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

  console.log({ userProfile });

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
