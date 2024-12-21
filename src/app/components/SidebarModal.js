import PropTypes from 'prop-types';

const SidebarModal = ({ date, onClose }) => {
  const trades = [
    {
      id: 1,
      ticker: 'AAPL',
      tradeType: 'long',
      tradeDate: '2024-12-21T17:02:42.744Z',
      shares: '5',
      priceOpened: '10.50',
      priceClosed: '12.50',
      stopLoss: '9.50',
      takeProfit: '13',
      notes: 'Trade went alright',
    },
    {
      id: 2,
      ticker: 'TSLA',
      tradeType: 'short',
      tradeDate: '2024-12-21T17:02:42.744Z',
      shares: '2',
      priceOpened: '20.50',
      priceClosed: '18.50',
      stopLoss: '22.00',
      takeProfit: '18.00',
      notes: 'Stopped out.',
    },
  ];

  const filteredTrades = trades.filter((trade) => trade.tradeDate.split('T')[0] === date);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end">
      <div className="w-96 bg-white dark:bg-gray-800 shadow-lg h-full p-6 overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white mb-4"
        >
          Close
        </button>

        {/* Date Header */}
        <h2 className="text-xl font-bold mb-4">Trades for {date}</h2>

        {/* Trades List */}
        <div className="space-y-6">
          {filteredTrades.length > 0 ? (
            filteredTrades.map((trade) => (
              <div
                key={trade.id}
                className="p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              >
                <div className="mb-2">
                  <span className="font-bold text-gray-800 dark:text-gray-200">{trade.ticker}</span>{' '}
                  <span className="text-sm text-gray-500">({trade.tradeType})</span>
                </div>
                <p className="text-sm">
                  <span className="font-semibold">Shares:</span> {trade.shares}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Opened:</span> ${trade.priceOpened}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Closed:</span> ${trade.priceClosed}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Stop Loss:</span> ${trade.stopLoss}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Take Profit:</span> ${trade.takeProfit}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Notes:</span> {trade.notes || 'No notes added'}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No trades available for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
};

SidebarModal.propTypes = {
  date: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SidebarModal;
