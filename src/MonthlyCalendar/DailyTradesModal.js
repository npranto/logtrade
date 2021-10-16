import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import { getTotalProfitFromTrades, findMatchingTradesByDate } from '../utils';
import { getOrganizationFromTicker } from '../utils/tickers';

const DailyTradesModal = props => {
  const { activeDateDate, activeMonth, activeYear, activeTradeLogs = [], onClose, onOpenAddNewTradeForm, onEditTradeLog, onDeleteTradeLog } = props;
  const activeDateTradeLogs = findMatchingTradesByDate(
    activeTradeLogs, 
    activeMonth, 
    activeDateDate, 
    activeYear,
  );

  console.log({ activeDateDate, activeMonth, activeYear, activeTradeLogs, activeDateTradeLogs });
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* <!--
          Background overlay, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        --> */}
        <div className={`fixed inset-0 bg-gray-500 bg-opacity-75`} aria-hidden="true"></div>

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* <!--
          Modal panel, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        --> */}
        <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}>
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="w-full">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                {/* <div className="flex flex-wrap justify-between"> */}
                <h3 className="text-2xl leading-6 font-medium text-gray-900 mb-2" id="modal-title">
                  Trade Log
                </h3>
                <p className="text-sm text-gray-400">{activeMonth} {activeDateDate}, {activeYear}</p>
                
                <div className="mt-2">
                  <div className="w-full flex flex-wrap">

                    {!activeDateTradeLogs?.length && (
                      <div className="w-full flex justify-center item-center p-3">
                        <p className="text-gray-400 italic">No trade transaction</p>
                      </div>
                    )}

                    {!!activeDateTradeLogs?.length && activeDateTradeLogs.map(activeTradeLog => {
                      const profit = getTotalProfitFromTrades([{ ...activeTradeLog }]);
                      const isProfitNegative = profit.includes('-');
                      return (
                        <div className="w-full bg-gray-100 bg-opacity-75 my-3">
                          <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col">
                            <div className="flex flex-wrap justify-between">
                              <div className="flex flex-col">
                                <h2 className="text-sm tracking-widest title-font mb-1 font-medium text-left">{activeTradeLog.ticker}</h2>
                                <h1 className="text-2xl title-font mb-1 font-medium">{getOrganizationFromTicker(activeTradeLog?.ticker) || 'Anonymous' }</h1>
                              </div>
                              <div className="profit">
                                <p className={`text-3xl sm:text-4xl font-bold ${isProfitNegative ? 'text-red-500' : 'text-green-500'} flex`}>
                                  <span className="trend mr-2"> 
                                    {isProfitNegative ? <BiTrendingDown /> : <BiTrendingUp />}
                                  </span>  
                                  <span className="value">${profit}</span>
                                </p>
                              </div>
                            </div>
                            <div className="rounded bg-white border border-gray-200 my-3 py-2">
                              <div className="flex flex-wrap content-start text-center">
                                <div className="p-2 sm:w-1/3 lg:w-1/4 w-1/2">
                                  <h2 className="title-font text-sm text-gray-900">{activeTradeLog.openingPrice}</h2>
                                  <p className="leading-relaxed text-xs text-gray-400 font-light">Open</p>
                                </div>
                                <div className="p-2 sm:w-1/3 lg:w-1/4 w-1/2">
                                  <h2 className="title-font text-sm text-gray-900">{activeTradeLog.closingPrice}</h2>
                                  <p className="leading-relaxed text-xs text-gray-400 font-light">Close</p>
                                </div>
                                <div className="p-2 sm:w-1/3 lg:w-1/4 w-1/2">
                                  <h2 className="title-font text-sm text-gray-900">{activeTradeLog.numberOfShares}</h2>
                                  <p className="leading-relaxed text-xs text-gray-400 font-light">Shares</p>
                                </div>
                                <div className="p-2 sm:w-1/3 lg:w-1/4 w-1/2">
                                  <h2 className="title-font text-sm text-gray-900">{activeTradeLog.stopLoss}</h2>
                                  <p className="leading-relaxed text-xs text-gray-400 font-light">Stop Loss</p>
                                </div>
                                <div className="p-2 sm:w-1/3 lg:w-1/4 w-1/2">
                                  <h2 className="title-font text-sm text-gray-900">{activeTradeLog.takeProfit}</h2>
                                  <p className="leading-relaxed text-xs text-gray-400 font-light">Take Profit</p>
                                </div>
                                <div className="p-2 sm:w-1/3 lg:w-1/4 w-1/2">
                                  <h2 className="title-font text-sm text-gray-900">{activeTradeLog.vwap}</h2>
                                  <p className="leading-relaxed text-xs text-gray-400 font-light">VWAP</p>
                                </div>
                                <div className="p-2 sm:w-1/3 lg:w-1/4 w-1/2">
                                  <h2 className="title-font text-sm text-gray-900">{activeTradeLog.tradeType}</h2>
                                  <p className="leading-relaxed text-xs text-gray-400 font-light">Type</p>
                                </div>
                              </div>
                              {activeTradeLog.notes && (
                                <hr />
                              )}
                              {activeTradeLog.notes && (
                                <div className="text-left p-2">
                                  <h2 className="title-font text-sm text-gray-900">Notes:</h2>
                                  <p className="leading-relaxed text-xs text-gray-400 font-light">{activeTradeLog.notes}</p>
                                </div>
                              )}
                            </div>
                            <div className="log-actions flex justify-center sm:justify-end">
                              <button className="lg:mt-2 xl:mt-0 btn-small text-white inline bg-yellow-500 border-0 text-xs py-2 px-4 focus:outline-none hover:bg-yellow-600 rounded" onClick={() => onEditTradeLog(activeTradeLog)}>Edit</button>
                              <button className="lg:mt-2 xl:mt-0 ml-1 text-white bg-red-500 border-0 text-xs py-2 px-4 focus:outline-none hover:bg-red-600 rounded" onClick={() => onDeleteTradeLog(activeTradeLog)}>Delete</button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={onOpenAddNewTradeForm}>
              New Trade?
            </button>
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTradesModal;