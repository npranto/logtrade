import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { MOCK_TICKERS } from '../data/mock-tickers';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { FaInfoCircle } from 'react-icons/fa';

const AddNewTradeFormModal = ({ tickers = MOCK_TICKERS, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    ticker: 'AAPL',
    shares: '100',
    tradeType: 'long',
    priceOpened: '150',
    priceClosed: '160',
    vwap: 'above',
    stopLoss: '140',
    takeProfit: '170',
    notes: '',
    tradeDate: new Date(),
  });

  const [errors, setErrors] = useState({});

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
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 transition-opacity ease-in-out duration-300">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full overflow-y-auto h-[90%] transform transition-transform ease-in-out duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Add New Trade</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please complete the form below to add a trade record.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="ticker" className="flex items-center text-sm font-bold text-gray-700">
              Ticker
              <span
                className="ml-1 text-gray-500"
                data-tooltip-id="ticker-tooltip"
                data-tooltip-content="The stock symbol, e.g., AAPL for Apple."
              >
                <FaInfoCircle />
              </span>
            </label>
            <Select
              id="ticker"
              options={tickers}
              onChange={handleTickerChange}
              value={formData.ticker ? { label: formData.ticker, value: formData.ticker } : null}
              placeholder="Select a ticker"
              className="mt-2"
            />
            {errors.ticker && <span className="text-red-500 text-sm">{errors.ticker}</span>}
          </div>

          <div className="mb-5">
            <label htmlFor="shares" className="block text-sm font-medium text-gray-700">
              Number of Shares
              <span
                className="ml-1 text-gray-500"
                data-tip="Enter the number of shares for the trade."
              >
                &#8505;
              </span>
            </label>
            <input
              id="shares"
              name="shares"
              type="number"
              value={formData.shares}
              onChange={handleInputChange}
              placeholder="100"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.shares && <span className="text-red-500 text-sm">{errors.shares}</span>}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">Trade Type</label>
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
          </div>

          <div className="mb-5">
            <label htmlFor="priceOpened" className="block text-sm font-medium text-gray-700">
              Price Opened
            </label>
            <input
              id="priceOpened"
              name="priceOpened"
              type="number"
              value={formData.priceOpened}
              onChange={handleInputChange}
              placeholder="150"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.priceOpened && (
              <span className="text-red-500 text-sm">{errors.priceOpened}</span>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="priceClosed" className="block text-sm font-medium text-gray-700">
              Price Closed
            </label>
            <input
              id="priceClosed"
              name="priceClosed"
              type="number"
              value={formData.priceClosed}
              onChange={handleInputChange}
              placeholder="160"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.priceClosed && (
              <span className="text-red-500 text-sm">{errors.priceClosed}</span>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Add any notes about the trade"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="tradeDate" className="block text-sm font-medium text-gray-700">
              Trade Date
            </label>
            <DatePicker
              selected={formData.tradeDate}
              onChange={(date) => setFormData({ ...formData, tradeDate: date })}
              dateFormat="MMMM d, yyyy"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-300"
            >
              Submit Trade
            </button>
          </div>
        </form>
        <ReactTooltip id="ticker-tooltip" place="right" effect="solid" />
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
