import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import TransitionOverlay from './TransitionOverlay';

function AccountUpdateSuccessContent({ onClose }) {
  return (
    <>
      <h3 className="text-xl font-semibold text-green-600 mb-4">Settings Updated!</h3>
      <p className="text-sm text-gray-600 mb-4">Please refresh the page to see latest changes.</p>
      <div className="mt-6 flex flex-col justify-end gap-4">
        <button
          onClick={onClose}
          className="bg-gray-600 text-white px-5 py-3 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
        >
          Refresh
        </button>
      </div>
    </>
  );
}

AccountUpdateSuccessContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

function AccountUpdateErrorContent({ onClose, error }) {
  return (
    <>
      <h3 className="text-xl font-semibold text-red-600 mb-4">Settings Update Error</h3>
      <p className="text-sm text-gray-600 mb-4">{error}</p>
      <div className="mt-6 flex flex-col justify-end gap-4">
        <button
          onClick={onClose}
          className="bg-gray-600 text-white px-5 py-3 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
        >
          Refresh
        </button>
      </div>
    </>
  );
}

AccountUpdateErrorContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

const PostAccountUpdateSidebar = ({ onClose, accountUpdateError }) => {
  return createPortal(
    <TransitionOverlay onClose={onClose}>
      {accountUpdateError ? (
        <AccountUpdateErrorContent error={accountUpdateError} />
      ) : (
        <AccountUpdateSuccessContent />
      )}
    </TransitionOverlay>,
    document.body,
  );
};

export default PostAccountUpdateSidebar;
