import React from 'react';
import { FaUserAlt, FaChartLine, FaCalendarAlt, FaSearch } from 'react-icons/fa';

const FeatureChecklist = () => {
  return (
    <section className="bg-transparent py-16 px-8 sm:px-16">
      <div className="container mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl font-extrabold mb-12"
          style={{
            color: 'var(--foreground)',
          }}
        >
          What We Offer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1: Personalized Account */}
          <div
            className="flex flex-col items-center rounded-md p-4"
            style={{
              background: 'var(--background)',
              color: 'var(--foreground)',
            }}
          >
            <div
              className="rounded-full p-6 mb-4"
              style={{
                background: '#333333',
                color: 'white',
              }}
            >
              <FaUserAlt size={36} />
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{
                color: 'var(--foreground)',
              }}
            >
              Personalized Account
            </h3>
            <p
              className="text-base"
              style={{
                color: 'var(--foreground)',
                opacity: 0.7,
              }}
            >
              Manage and personalize your own trades as you like best for you.
            </p>
          </div>

          {/* Step 2: Track Daily Trades */}
          <div
            className="flex flex-col items-center rounded-md p-4"
            style={{
              background: 'var(--background)',
              color: 'var(--foreground)',
            }}
          >
            <div
              className="rounded-full p-6 mb-4"
              style={{
                background: '#333333',
                color: 'white',
              }}
            >
              <FaChartLine size={36} />
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{
                color: 'var(--foreground)',
              }}
            >
              Track Daily Trades
            </h3>
            <p
              className="text-base"
              style={{
                color: 'var(--foreground)',
                opacity: 0.7,
              }}
            >
              Easily and quickly add, remove, and update your daily trades without a ton of effort.
            </p>
          </div>

          {/* Step 3: Visual Trade View */}
          <div
            className="flex flex-col items-center rounded-md p-4"
            style={{
              background: 'var(--background)',
              color: 'var(--foreground)',
            }}
          >
            <div
              className="rounded-full p-6 mb-4"
              style={{
                background: '#333333',
                color: 'white',
              }}
            >
              <FaCalendarAlt size={36} />
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{
                color: 'var(--foreground)',
              }}
            >
              Visual Trade View
            </h3>
            <p
              className="text-base"
              style={{
                color: 'var(--foreground)',
                opacity: 0.7,
              }}
            >
              See your trades in a calendar view to track positive or negative outcomes visually.
            </p>
          </div>

          {/* Step 4: Analyze Your Trades */}
          <div
            className="flex flex-col items-center rounded-md p-4"
            style={{
              background: 'var(--background)',
              color: 'var(--foreground)',
            }}
          >
            <div
              className="rounded-full p-6 mb-4"
              style={{
                background: '#333333',
                color: 'white',
              }}
            >
              <FaSearch size={36} />
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{
                color: 'var(--foreground)',
              }}
            >
              Analyze Your Trades
            </h3>
            <p
              className="text-base"
              style={{
                color: 'var(--foreground)',
                opacity: 0.7,
              }}
            >
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
