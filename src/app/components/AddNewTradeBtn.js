import { FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AddNewTradeBtn = ({ onAddTrade }) => {
  return (
    <div className="fixed bottom-5 right-5">
      {/* Container for button and label */}
      <div className="relative group">
        {/* The button itself */}
        <button
          onClick={onAddTrade}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:opacity-90 transition ease-in-out duration-300"
        >
          {/* Plus icon with rotating animation on hover */}
          <FaPlus className="text-2xl transform transition-transform duration-300 group-hover:rotate-90" />
        </button>

        {/* Hover label (popover) positioned to the left */}
        <div className="absolute left-0 bottom-1/2 transform translate-x-[-125%] translate-y-[50%] opacity-0 group-hover:opacity-100 group-hover:translate-x-[-150%] transition-all duration-200 ease-out text-white bg-gray-700 p-2 rounded-md text-sm whitespace-nowrap shadow-md">
          Add Trade
        </div>
      </div>
    </div>
  );
};

AddNewTradeBtn.propTypes = {
  onAddTrade: PropTypes.func.isRequired,
};

export default AddNewTradeBtn;
