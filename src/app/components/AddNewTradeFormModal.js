import React, { useRef, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { MOCK_TICKERS } from '../data/mock-tickers';
import { Tooltip } from 'react-tooltip';
import { FaInfoCircle } from 'react-icons/fa';

const AddNewTradeFormModal = ({ tickers = MOCK_TICKERS, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    ticker: 'AAPL', // Default ticker
    tradeType: 'long', // Default trade type
    tradeDate: new Date(), // Default trade date (current date)
    shares: '',
    priceOpened: '',
    priceClosed: '',
    stopLoss: '',
    takeProfit: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  // Refs for error scrolling
  const refs = {
    ticker: useRef(null),
    tradeType: useRef(null),
    tradeDate: useRef(null),
    shares: useRef(null),
    priceOpened: useRef(null),
    priceClosed: useRef(null),
    stopLoss: useRef(null),
    takeProfit: useRef(null),
    notes: useRef(null),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTickerChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      ticker: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      // Scroll to the first field with an error
      const firstErrorKey = Object.keys(newErrors)[0];
      refs[firstErrorKey]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.ticker) newErrors.ticker = 'Ticker is required';
    if (!data.shares || isNaN(data.shares) || data.shares <= 0)
      newErrors.shares = 'Shares must be a positive number';
    if (!data.priceOpened || isNaN(data.priceOpened) || data.priceOpened <= 0)
      newErrors.priceOpened = 'Opening price must be a positive number';
    if (!data.priceClosed || isNaN(data.priceClosed) || data.priceClosed <= 0)
      newErrors.priceClosed = 'Closing price must be a positive number';
    if (data.stopLoss && isNaN(data.stopLoss)) newErrors.stopLoss = 'Stop loss must be a number';
    if (data.takeProfit && isNaN(data.takeProfit))
      newErrors.takeProfit = 'Take profit must be a number';
    return newErrors;
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 transition-opacity ease-in-out duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-trade-modal-title"
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full overflow-y-auto h-[90%] transform transition-transform ease-in-out duration-300"
        role="document"
        aria-describedby="add-trade-modal-description"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          ✕
        </button>
        <h2 id="add-trade-modal-title" className="text-2xl font-semibold mb-4 text-indigo-600">
          Add New Trade
        </h2>
        <p id="add-trade-modal-description" className="text-sm text-gray-600 mb-6">
          Fill out the form below to record your trade details.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Ticker Field */}
          <div className="mb-5" ref={refs.ticker}>
            <label htmlFor="ticker" className="flex items-center text-sm font-bold text-gray-700">
              Ticker
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                data-tooltip-id="ticker-tooltip"
                data-tooltip-content="Select the stock ticker (e.g., AAPL for Apple)."
              >
                <FaInfoCircle />
              </span>
            </label>
            <Select
              id="ticker"
              aria-label="Select a stock ticker"
              options={tickers}
              onChange={handleTickerChange}
              value={formData.ticker ? { label: formData.ticker, value: formData.ticker } : null}
              placeholder="Select a ticker, i.e., AAPL"
              className="mt-1"
            />
            {errors.ticker && (
              <span id="ticker-error" className="text-red-600 text-sm" aria-live="polite">
                {errors.ticker}
              </span>
            )}
          </div>

          {/* Shares Field */}
          <div className="mb-5" ref={refs.shares}>
            <label htmlFor="shares" className="flex items-center text-sm font-bold text-gray-700">
              Number of Shares
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                data-tooltip-id="shares-tooltip"
                data-tooltip-content="Enter the total number of shares for the trade."
              >
                <FaInfoCircle />
              </span>
            </label>
            <input
              id="shares"
              name="shares"
              type="number"
              value={formData.shares}
              onChange={handleInputChange}
              placeholder="5"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-describedby="shares-description shares-error"
            />
            <p id="shares-description" className="text-gray-400 text-xs">
              Specify the total number of shares
            </p>
            {errors.shares && (
              <span id="shares-error" className="text-red-600 text-sm" aria-live="polite">
                {errors.shares}
              </span>
            )}
          </div>

          {/* Trade Type */}
          <div className="mb-5" ref={refs.tradeType}>
            <label className="flex items-center text-sm font-bold text-gray-700">
              Trade Type
              <span
                className="ml-1 text-gray-500"
                data-tooltip-id="tradeType-tooltip"
                data-tooltip-content="Select 'Long' if buying the stock or 'Short' if selling."
              >
                <FaInfoCircle />
              </span>
              <Tooltip id="tradeType-tooltip" place="top" effect="solid" />
            </label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tradeType"
                  value="long"
                  checked={formData.tradeType === 'long'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Long
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tradeType"
                  value="short"
                  checked={formData.tradeType === 'short'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Short
              </label>
            </div>
            <p id="tradeType-description" className="text-gray-400 text-xs">
              Select &quot;Long&quot; if buying the stock or &quot;Short&quot; if selling
            </p>
          </div>

          {/* Price Opened */}
          <div className="mb-5" ref={refs.priceOpened}>
            <label
              htmlFor="priceOpened"
              className="flex items-center text-sm font-bold text-gray-700"
            >
              Price Opened
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                data-tooltip-id="priceOpened-tooltip"
                data-tooltip-content="Enter the price at which the trade was opened."
              >
                <FaInfoCircle />
              </span>
            </label>
            <input
              id="priceOpened"
              name="priceOpened"
              type="number"
              value={formData.priceOpened}
              onChange={handleInputChange}
              placeholder="10.50"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-describedby="priceOpened-description priceOpened-error"
            />
            <p id="priceOpened-description" className="text-gray-400 text-xs">
              Specify the price at which the trade was initiated
            </p>
            {errors.priceOpened && (
              <span id="priceOpened-error" className="text-red-600 text-sm" aria-live="polite">
                {errors.priceOpened}
              </span>
            )}
          </div>

          {/* Price Closed */}
          <div className="mb-5" ref={refs.priceClosed}>
            <label
              htmlFor="priceClosed"
              className="flex items-center text-sm font-bold text-gray-700"
            >
              Price Closed
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                data-tooltip-id="priceClosed-tooltip"
                data-tooltip-content="Enter the price at which the trade was closed."
              >
                <FaInfoCircle />
              </span>
            </label>
            <input
              id="priceClosed"
              name="priceClosed"
              type="number"
              value={formData.priceClosed}
              onChange={handleInputChange}
              placeholder="12.50"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-describedby="priceClosed-description priceClosed-error"
            />
            <p id="priceClosed-description" className="text-gray-400 text-xs">
              Specify the price at which the trade was exited
            </p>
            {errors.priceClosed && (
              <span id="priceClosed-error" className="text-red-600 text-sm" aria-live="polite">
                {errors.priceClosed}
              </span>
            )}
          </div>

          {/* Stop Loss */}
          <div className="mb-5" ref={refs.stopLoss}>
            <label htmlFor="stopLoss" className="flex items-center text-sm font-bold text-gray-700">
              Stop Loss
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                data-tooltip-id="stopLoss-tooltip"
                data-tooltip-content="Enter the stop-loss price to manage your trade risk."
              >
                <FaInfoCircle />
              </span>
            </label>
            <input
              id="stopLoss"
              name="stopLoss"
              type="number"
              value={formData.stopLoss}
              onChange={handleInputChange}
              placeholder="9.50"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-describedby="stopLoss-description stopLoss-error"
            />
            <p id="stopLoss-description" className="text-gray-400 text-xs">
              Specify the price to automatically exit the trade to minimize loss
            </p>
            {errors.stopLoss && (
              <span id="stopLoss-error" className="text-red-600 text-sm" aria-live="polite">
                {errors.stopLoss}
              </span>
            )}
          </div>

          {/* Take Profit */}
          <div className="mb-5" ref={refs.takeProfit}>
            <label
              htmlFor="takeProfit"
              className="flex items-center text-sm font-bold text-gray-700"
            >
              Take Profit
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                data-tooltip-id="takeProfit-tooltip"
                data-tooltip-content="Enter the take-profit price to lock in your gains."
              >
                <FaInfoCircle />
              </span>
            </label>
            <input
              id="takeProfit"
              name="takeProfit"
              type="number"
              value={formData.takeProfit}
              onChange={handleInputChange}
              placeholder="12.50"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-describedby="takeProfit-description takeProfit-error"
            />
            <p id="takeProfit-description" className="text-gray-400 text-xs">
              Specify the price to exit the trade for profit
            </p>
            {errors.takeProfit && (
              <span id="takeProfit-error" className="text-red-600 text-sm" aria-live="polite">
                {errors.takeProfit}
              </span>
            )}
          </div>

          {/* Notes */}
          <div className="mb-5" ref={refs.notes}>
            <label htmlFor="notes" className="flex items-center text-sm font-bold text-gray-700">
              Notes
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                data-tooltip-id="notes-tooltip"
                data-tooltip-content="Add any additional notes or details about the trade."
              >
                <FaInfoCircle />
              </span>
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Add any additional details about the trade"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
              aria-describedby="notes-description"
            />
            <p id="notes-description" className="text-gray-400 text-xs">
              Provide any extra context or information about this trade
            </p>
          </div>

          {/* Trade Date */}
          <div className="mb-5" ref={refs.tradeDate}>
            <label
              htmlFor="tradeDate"
              className="flex items-center text-sm font-bold text-gray-700"
            >
              Trade Date
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                data-tooltip-id="tradeDate-tooltip"
                data-tooltip-content="Select the date the trade occurred."
              >
                <FaInfoCircle />
              </span>
            </label>
            <DatePicker
              id="tradeDate"
              selected={formData.tradeDate}
              onChange={(date) => setFormData({ ...formData, tradeDate: date })}
              dateFormat="MMMM d, yyyy"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-describedby="tradeDate-description"
            />
            <p id="tradeDate-description" className="text-gray-400 text-xs">
              Choose the date the trade was executed
            </p>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Trade
            </button>
          </div>
        </form>
        {/* all tooltips for each field info */}
        <Tooltip id="ticker-tooltip" className="max-w-96" place="top" effect="solid" />
        <Tooltip id="shares-tooltip" place="top" effect="solid" />
        <Tooltip id="priceOpened-tooltip" place="top" effect="solid" />
        <Tooltip id="priceClosed-tooltip" place="top" effect="solid" />
        <Tooltip id="stopLoss-tooltip" place="top" effect="solid" />
        <Tooltip id="takeProfit-tooltip" place="top" effect="solid" />
        <Tooltip id="notes-tooltip" place="top" effect="solid" />
        <Tooltip id="tradeDate-tooltip" place="top" effect="solid" />
      </div>
    </div>
  );
};

AddNewTradeFormModal.propTypes = {
  tickers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddNewTradeFormModal;
