import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import TransitionOverlay from './TransitionOverlay';

function Content({ handleDeleteAccount, onClose }) {
  return (
    <>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Are you sure you want to delete your account?
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        This action is irreversible and will permanently delete all your data.
      </p>
      <div className="mt-6 flex flex-col justify-end gap-4">
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white px-5 py-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        >
          Yes, Delete Account
        </button>
        <button
          onClick={onClose}
          className="bg-gray-600 text-white px-5 py-3 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

Content.propTypes = {
  handleDeleteAccount: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const DeleteAccountSidebar = ({ handleDeleteAccount, onClose }) => {
  return createPortal(
    <TransitionOverlay onClose={onClose}>
      <Content handleDeleteAccount={handleDeleteAccount} onClose={onClose} />
    </TransitionOverlay>,
    document.body,
  );
};

export default DeleteAccountSidebar;
