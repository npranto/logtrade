/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { FaUserAlt, FaChartLine, FaCalendarAlt, FaSearch } from 'react-icons/fa';

const FeatureChecklist = () => {
  return (
    <section className="bg-transparent py-16 px-8 sm:px-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12">What We Offer</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1: Personalized Account */}
          <div className="flex flex-col items-center bg-white rounded-md p-4">
            <div className="bg-indigo-600 text-white rounded-full p-6 mb-4">
              <FaUserAlt size={36} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Account</h3>
            <p className="text-base text-gray-400">
              Manage and personalize your own trades as you like best for you.
            </p>
          </div>

          {/* Step 2: Track Daily Trades */}
          <div className="flex flex-col items-center bg-white rounded-md p-4">
            <div className="bg-indigo-600 text-white rounded-full p-6 mb-4">
              <FaChartLine size={36} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Daily Trades</h3>
            <p className="text-base text-gray-400">
              Easily and quickly add, remove, and update your daily trades without a ton of effort.
            </p>
          </div>

          {/* Step 3: Visual Trade View */}
          <div className="flex flex-col items-center bg-white rounded-md p-4">
            <div className="bg-indigo-600 text-white rounded-full p-6 mb-4">
              <FaCalendarAlt size={36} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Visual Trade View</h3>
            <p className="text-base text-gray-400">
              See your trades in a calendar view to track positive or negative outcomes visually.
            </p>
          </div>

          {/* Step 4: Analyze Your Trades */}
          <div className="flex flex-col items-center bg-white rounded-md p-4">
            <div className="bg-indigo-600 text-white rounded-full p-6 mb-4">
              <FaSearch size={36} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Analyze Your Trades</h3>
            <p className="text-base text-gray-400">
              Investigate and recognize your trading patterns over time to avoid relying on your
              emotions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureChecklist;
