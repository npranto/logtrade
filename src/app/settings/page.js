'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

const AccountPage = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    theme: 'light',
    dashboardViews: {
      monthly: true,
      weekly: true,
      daily: true,
    },
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewToggle = (view) => {
    setProfileData((prev) => ({
      ...prev,
      dashboardViews: {
        ...prev.dashboardViews,
        [view]: !prev.dashboardViews[view],
      },
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Loading your account details...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="p-6 max-w-5xl mx-auto w-full space-y-12">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profileData.fullName}
                onChange={handleProfileChange}
                placeholder="Enter your full name"
                className="w-full rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm"
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
                value={profileData.theme}
                onChange={handleProfileChange}
                className="w-full rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-4 py-3 text-sm text-gray-800 shadow-sm"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </section>

        {/* Dashboard Preferences Section */}
        <section className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard Views</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(profileData.dashboardViews).map(([view, isVisible]) => (
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
            onClick={() => alert('Profile data saved locally for now!')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
