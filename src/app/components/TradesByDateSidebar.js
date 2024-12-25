import { createPortal } from 'react-dom';
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi';
import TransitionOverlay from './TransitionOverlay';
import PropTypes from 'prop-types';

const Content = ({ date = '2024-12-21', trades = [], onClose }) => {
  const filteredTrades = trades.filter((trade) => trade.tradeDate.split('T')[0] === date);

  const totalProfit = filteredTrades.reduce((acc, trade) => {
    const profit =
      (parseFloat(trade.priceClosed) - parseFloat(trade.priceOpened)) * parseFloat(trade.shares);
    return acc + profit;
  }, 0);
  const isPositive = totalProfit > 0;

  return (
    <div>
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
      >
        ✕
      </button>

      {/* Date Header */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </h2>

      {/* Short Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Review all trades executed on this date, including gains/losses, and insights.
      </p>

      {/* Total Gains or Losses */}
      <div className="mb-6 text-center">
        <div
          className={`text-3xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'} flex justify-center items-center`}
        >
          <span className="mr-2">{isPositive ? <BiTrendingUp /> : <BiTrendingDown />}</span>
          <span>${totalProfit.toFixed(2)}</span>
        </div>
      </div>

      {/* Trades List */}
      <div className="space-y-6">
        {filteredTrades.length > 0 ? (
          filteredTrades.map((trade) => {
            const profit =
              (parseFloat(trade.priceClosed) - parseFloat(trade.priceOpened)) *
              parseFloat(trade.shares);
            const isTradePositive = profit > 0;

            return (
              <div
                key={trade.id}
                className={`p-6 border rounded-lg shadow-md ${isTradePositive ? 'bg-green-100' : 'bg-red-100'} dark:bg-gray-700 dark:border-gray-600`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {trade.ticker}
                  </div>
                  <div
                    className={`text-xl font-bold ${isTradePositive ? 'text-green-600' : 'text-red-600'} flex items-center`}
                  >
                    {isTradePositive ? <BiTrendingUp /> : <BiTrendingDown />}
                    <span className="ml-2">${profit.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 bg-white dark:bg-gray-800 p-4 rounded-md text-sm">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Shares</span>
                    <span className="text-gray-600 dark:text-gray-400">{trade.shares}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Opened</span>
                    <span className="text-gray-600 dark:text-gray-400">${trade.priceOpened}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Closed</span>
                    <span className="text-gray-600 dark:text-gray-400">${trade.priceClosed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Stop Loss</span>
                    <span className="text-gray-600 dark:text-gray-400">${trade.stopLoss}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Take Profit
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">${trade.takeProfit}</span>
                  </div>
                  {trade.notes && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Notes</span>
                      <p>{trade.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No trades available for this day.</p>
        )}
      </div>
    </div>
  );
};

Content.propTypes = {
  date: PropTypes.string,
  trades: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      tradeDate: PropTypes.string.isRequired,
      ticker: PropTypes.string.isRequired,
      shares: PropTypes.string.isRequired,
      priceOpened: PropTypes.string.isRequired,
      priceClosed: PropTypes.string.isRequired,
      stopLoss: PropTypes.string.isRequired,
      takeProfit: PropTypes.string.isRequired,
      notes: PropTypes.string,
    }),
  ),
  onClose: PropTypes.func.isRequired,
};

const TradesByDateSidebar = ({ date = '2024-12-21', trades = [], onClose }) => {
  return createPortal(
    <TransitionOverlay onClose={onClose}>
      <Content date={date} trades={trades} />
    </TransitionOverlay>,
    document.body,
  );
};

export default TradesByDateSidebar;
