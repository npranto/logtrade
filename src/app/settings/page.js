'use client';

import { useState, useEffect } from 'react';
import { useUserDetails } from '../hooks/useUserDetails';
import Image from 'next/image';
import DeleteAccountSidebar from '../components/DeleteAccountSidebar';
import { deleteUserById, updateUserById } from '@/utils/users';
import PostAccountUpdateSidebar from '../components/PostAccountUpdateSidebar';
import { useUser } from '@clerk/nextjs';

const AccountPage = () => {
  const { user } = useUser();

  const {
    userDetails,
    isLoading: isLoadingUserDetails,
    error: userDetailsError,
  } = useUserDetails();

  const [settingsData, setSettingsData] = useState({
    fullName: '',
    theme: 'light',
    dashboardViews: {
      monthly: true,
      weekly: true,
      daily: true,
    },
  });

  const [isDeleteAccountSidebarOpen, setDeleteAccountSidebarOpen] = useState(false);
  const [isPostAccountUpdateSidebarOpen, setIsPostAccountUpdateSidebarOpen] = useState(false);

  const [isUpdatingUserDetails, setIsUpdatingUserDetails] = useState(false);
  const [updatingUserDetailsError, setUpdatingUserDetailsError] = useState(null);

  const [isDeletingUserDetails, setIsDeletingUserDetails] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setSettingsData((prev) => ({
        ...prev,
        fullName: userDetails?.fullName || '',
        theme: typeof userDetails?.theme === 'string' ? userDetails?.theme : 'light',
        dashboardViews: {
          ...prev.dashboardViews,
          monthly:
            typeof userDetails?.dashboardViews?.monthly === 'boolean'
              ? userDetails?.dashboardViews?.monthly
              : true,
          weekly:
            typeof userDetails?.dashboardViews?.weekly === 'boolean'
              ? userDetails?.dashboardViews?.weekly
              : true,
          daily:
            typeof userDetails?.dashboardViews?.daily === 'boolean'
              ? userDetails?.dashboardViews?.daily
              : true,
        },
      }));
    }
  }, [userDetails]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setSettingsData((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewToggle = (view) => {
    setSettingsData((prev) => ({
      ...prev,
      dashboardViews: {
        ...prev.dashboardViews,
        [view]: !prev.dashboardViews[view],
      },
    }));
  };

  const handleDeleteAccount = () => {
    setIsDeletingUserDetails(true);
    setTimeout(async () => {
      await deleteUserById(userDetails?.userId);
      await user.delete();
      window.location.href = '/';
    }, 1500);
  };

  const openDeleteAccountSidebar = () => {
    setDeleteAccountSidebarOpen(true);
  };

  const closeDeleteAccountSidebar = () => {
    setDeleteAccountSidebarOpen(false);
  };

  const closeAccountUpdatedSidebar = () => {
    window.location.href = '/settings';
  };

  const hasSettingsChanged = () => {
    if (settingsData.fullName !== userDetails?.fullName) return true;
    if (settingsData.theme !== userDetails?.theme) return true;
    if (settingsData.dashboardViews.daily !== userDetails?.dashboardViews?.daily) return true;
    if (settingsData.dashboardViews.monthly !== userDetails?.dashboardViews?.monthly) return true;
    if (settingsData.dashboardViews.weekly !== userDetails?.dashboardViews?.weekly) return true;
    return false;
  };

  const onSaveChanges = async () => {
    if (!hasSettingsChanged()) return;
    setIsUpdatingUserDetails(true);

    try {
      const updatedUser = {
        ...userDetails,
        theme: settingsData.theme,
        fullName: settingsData.fullName,
        dashboardViews: {
          ...(userDetails?.dashboardViews || {}),
          monthly: settingsData.dashboardViews.monthly,
          weekly: settingsData.dashboardViews.weekly,
          daily: settingsData.dashboardViews.daily,
        },
      };
      const [updateUserError, fetchedUpdatedUser] = await updateUserById(
        userDetails?.userId,
        updatedUser,
      );

      if (updateUserError || !fetchedUpdatedUser) {
        console.error(updateUserError);
        throw new Error(
          'Oops! Unable to save new changes to your account at the moment. Try again later.',
        );
      }
    } catch (error) {
      setUpdatingUserDetailsError(error.message);
    } finally {
      setIsPostAccountUpdateSidebarOpen(true);
    }
  };

  const disableSaveChanges = !hasSettingsChanged() || isUpdatingUserDetails;

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
        <p>{userDetailsError}</p>;
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="p-6 max-w-5xl mx-auto w-full space-y-12">
        {userDetails && <pre>{JSON.stringify({ userDetails }, null, 2)}</pre>}
        {/* Page Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-sm" style={{ color: 'var(--foreground-light)', opacity: 0.7 }}>
            Manage your profile, preferences, and settings.
          </p>
        </header>

        {/* Profile Section */}
        <section className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {/* Profile Picture */}
            <div className="col-span-2 sm:col-span-1 flex justify-center items-center">
              {userDetails?.profilePicture ? (
                <Image
                  priority
                  src={userDetails?.profilePicture}
                  alt="Profile Picture"
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
              ) : null}
            </div>

            {/* Input Fields */}
            <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
              {/* Full Name Input */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={settingsData.fullName}
                  onChange={handleProfileChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm"
                />
              </div>

              {/* Email Field (Disabled) */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userDetails?.email || ''}
                  disabled
                  className="w-full rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm"
                />
              </div>

              {/* Theme Preference Dropdown */}
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-600 mb-2">
                  Theme Preference
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={settingsData.theme}
                  onChange={handleProfileChange}
                  className="w-full rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-4 py-3 text-sm text-gray-800 shadow-sm"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preferences Section */}
        <section className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard Views</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(settingsData.dashboardViews).map(([view, isVisible]) => (
              <div
                key={view}
                className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-3 shadow-sm"
              >
                <span className="capitalize text-gray-700 font-medium">{view} trade view</span>
                <button
                  onClick={() => handleViewToggle(view)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    isVisible
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  {isVisible ? 'Hide' : 'Show'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Save Changes */}
        <div className="flex justify-end">
          <button
            onClick={onSaveChanges}
            disabled={disableSaveChanges}
            className={`px-6 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 transition ${
              !disableSaveChanges
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isUpdatingUserDetails ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Account Deletion Section */}
        <section className="bg-red-50 shadow-sm rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Delete Account</h2>
          <p className="text-sm text-gray-600 mb-4">
            Once you delete your account, all your data will be permanently removed and cannot be
            recovered.
          </p>
          <button
            onClick={openDeleteAccountSidebar}
            className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            Delete My Account
          </button>
        </section>
      </div>

      {/* Delete Confirmation Sidebar */}
      {isDeleteAccountSidebarOpen && (
        <DeleteAccountSidebar
          isDeletingUserDetails={isDeletingUserDetails}
          handleDeleteAccount={handleDeleteAccount}
          onClose={closeDeleteAccountSidebar}
        />
      )}

      {/* Account Updated Sidebar */}
      {isPostAccountUpdateSidebarOpen && (
        <PostAccountUpdateSidebar
          accountUpdateError={updatingUserDetailsError}
          onClose={closeAccountUpdatedSidebar}
        />
      )}
    </main>
  );
};

export default AccountPage;
