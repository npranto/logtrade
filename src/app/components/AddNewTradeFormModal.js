import React, { useRef, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { MOCK_TICKERS } from '../data/mock-tickers';
import { Tooltip } from 'react-tooltip';
import { FaInfoCircle } from 'react-icons/fa';
import TransitionOverlay from './TransitionOverlay';
import { createPortal } from 'react-dom';

const Content = ({ tickers = MOCK_TICKERS, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    ticker: 'AAPL',
    tradeType: 'long',
    tradeDate: new Date(),
    shares: '',
    priceOpened: '',
    priceClosed: '',
    stopLoss: '',
    takeProfit: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

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

  const resetForm = () => {
    setFormData({
      ticker: 'AAPL',
      tradeType: 'long',
      tradeDate: new Date(),
      shares: '',
      priceOpened: '',
      priceClosed: '',
      stopLoss: '',
      takeProfit: '',
      notes: '',
    });
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
      setSummaryData(formData);
      setIsSubmitted(true);
      resetForm();
    } else {
      const firstErrorKey = Object.keys(newErrors)[0];
      refs[firstErrorKey]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const handleAddAnotherTrade = () => {
    setIsSubmitted(false);
    resetForm();
  };

  return (
    <div>
      <button
        onClick={handleClose}
        aria-label="Close modal"
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
      >
        ✕
      </button>
      {!isSubmitted && (
        <>
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
                className="mt-1 w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                <label className="inline-flex items-center text-black">
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
                <label className="inline-flex items-center text-black">
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
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
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
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
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
              <label
                htmlFor="stopLoss"
                className="flex items-center text-sm font-bold text-gray-700"
              >
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
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
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
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
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
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
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
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
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

            {/* all tooltips for each field info */}
            <Tooltip id="ticker-tooltip" className="max-w-full" place="top" effect="solid" />
            <Tooltip id="shares-tooltip" className="max-w-full" place="top" effect="solid" />
            <Tooltip id="priceOpened-tooltip" className="max-w-full" place="top" effect="solid" />
            <Tooltip id="priceClosed-tooltip" className="max-w-full" place="top" effect="solid" />
            <Tooltip id="stopLoss-tooltip" className="max-w-full" place="top" effect="solid" />
            <Tooltip id="takeProfit-tooltip" className="max-w-full" place="top" effect="solid" />
            <Tooltip id="notes-tooltip" className="max-w-full" place="top" effect="solid" />
            <Tooltip id="tradeDate-tooltip" className="max-w-full" place="top" effect="solid" />
          </form>
        </>
      )}

      {isSubmitted && summaryData && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-green-600">Trade Submitted Successfully!</h3>
          <p className="text-base text-gray-600">Here is a summary of your submission:</p>

          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 text-left mb-4">Trade Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Ticker</span>
                <span className="text-sm font-semibold text-indigo-700">{summaryData.ticker}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Trade Type</span>
                <span className="text-sm font-semibold text-green-600">
                  {summaryData.tradeType}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Shares</span>
                <span className="text-sm font-semibold text-blue-600">{summaryData.shares}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Price Opened</span>
                <span className="text-sm font-semibold text-green-600">
                  {summaryData.priceOpened}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Price Closed</span>
                <span className="text-sm font-semibold text-red-600">
                  {summaryData.priceClosed}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Stop Loss</span>
                <span className="text-sm font-semibold text-yellow-600">
                  {summaryData.stopLoss || 'N/A'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Take Profit</span>
                <span className="text-sm font-semibold text-yellow-600">
                  {summaryData.takeProfit || 'N/A'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Notes</span>
                <span className="text-sm font-semibold text-gray-600">
                  {summaryData.notes || 'N/A'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Trade Date</span>
                <span className="text-sm font-semibold text-gray-600">
                  {new Date(summaryData.tradeDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={handleClose}
              className="bg-gray-500 text-white px-5 py-3 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Close
            </button>
            <button
              onClick={handleAddAnotherTrade}
              className="bg-indigo-600 text-white px-5 py-3 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Create Another Trade
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Content.propTypes = {
  tickers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const AddNewTradeFormModal = ({ tickers = MOCK_TICKERS, onSubmit, onClose }) => {
  return createPortal(
    <TransitionOverlay onClose={onClose}>
      <Content tickers={tickers} onSubmit={onSubmit} onClose={onClose} />
    </TransitionOverlay>,
    document.body,
  );
};

AddNewTradeFormModal.propTypes = {
  tickers: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddNewTradeFormModal;
