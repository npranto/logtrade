import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import { getTotalProfitFromTrades } from '../utils';

const AddNewTradeFormModal = props => {
  const { activeDateDate, activeMonth, activeYear, onClose, onFormSubmit } = props;

  return (
    <div className="AddNewTradeFormModal fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
        <div 
        className={`fixed inset-0 bg-gray-500 bg-opacity-75`} aria-hidden="true"></div>

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
                  Add Trade
                </h3>
                <p className="text-sm text-gray-400">{activeMonth} {activeDateDate}, {activeYear}</p>
                
                <div className="mt-2">
                  <div className="w-full flex flex-wrap">


                    <form className="w-full" onSubmit={onFormSubmit}>


                      <div class="flex flex-col my-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2" for="ticker">
                          Ticker
                        </label>
                        <div class="relative">
                          <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option defaultChecked>Choose a ticker</option>
                            <option>AAPL: Apple Inc.</option>
                            <option>GOOGL: Google Inc.</option>
                            <option>TSLA: Tesla Inc.</option>
                          </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>


                      <div class="flex flex-wrap justify-between items-center my-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2" for="number-of-shares">
                          Number of Shares
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                          {/* <span class="inline-flex items-center px-3 rounded-l-md bg-gray-100 text-gray-500 text-sm">
                            $
                          </span> */}
                          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="number-of-shares" type="number" placeholder="2" min="0" />
                        </div>
                      </div>

                      <div class="flex flex-wrap justify-between items-center my-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2" for="opening-price">
                          Opening Price
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                          <span class="inline-flex items-center px-3 rounded-l-md bg-gray-100 text-gray-500 text-sm">
                            $
                          </span>
                          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="opening-price" type="number" placeholder="10.95" min="0" />
                        </div>
                      </div>

                      <div class="flex flex-wrap justify-between items-center my-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2" for="closing-price">
                          Closing Price
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                          <span class="inline-flex items-center px-3 rounded-l-md bg-gray-100 text-gray-500 text-sm">
                            $
                          </span>
                          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="closing-price" type="number" placeholder="10.95" />
                        </div>
                      </div>

                      <div class="flex flex-wrap justify-between items-center my-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2" for="stop-loss">
                          Stop Loss
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                          <span class="inline-flex items-center px-3 rounded-l-md bg-gray-100 text-gray-500 text-sm">
                            $
                          </span>
                          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="stop-loss" type="number" placeholder="9.95" />
                        </div>
                      </div>

                      <div class="flex flex-wrap justify-between items-center my-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2" for="take-profit">
                          Take Profit
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                          <span class="inline-flex items-center px-3 rounded-l-md bg-gray-100 text-gray-500 text-sm">
                            $
                          </span>
                          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="take-profit" type="number" placeholder="15.95" />
                        </div>
                      </div>

                      <div class="flex flex-col mt-5 mb-3">
                        <label for="notes" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-2">Notes</label>
                        <textarea id="notes" name="notes" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" rows="4"></textarea>
                      </div>
                  
                    </form>

                    
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
              Create Trade
            </button>
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewTradeFormModal;