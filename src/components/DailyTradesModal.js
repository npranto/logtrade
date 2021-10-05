import { getDateFromDate, getMonthFromDate, getYearFromDate } from "../utils/date";
import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import renderList from "../utils/renderList";
import { getTotalProfitFromTrades } from "./Day";
import TradeItem from "./TradeItem";

const componentId = getUniqueId();

const onLoad = (props = {}) => {

}

const styles = () => `
  .${componentId} .trade-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .${componentId} .trade-block {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;  
  }
  .${componentId} .trade-block p:first-child {
    font-size: 0.90rem;
  }
  .${componentId} .trade-block p:first-child {
    font-size: 0.90rem;
  }
  .${componentId} .trade-block p:last-child {
    font-size: 0.75rem;
  }
  .${componentId} .trade-block .profit-details .total-profit {
    font-size: 2.75rem;
  }
  .${componentId} .daily-stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .${componentId} .bold {
    font-weight: bold;
    font-size: 2rem;
  }
  .${componentId} .stats {
    display: flex;
    align-items: center;
  }
  .${componentId} .stats > * {
    padding: 0 0.5em;
  }
`;

const DailyTradesModal = (props = {}) => {
  const { 
    activeDateTrades = [], 
    activeDate,
    onDeleteTradeLog,
    // onUpdateTradeLog,
  } = props;
  const totalProfit = getTotalProfitFromTrades(activeDateTrades);
  const numberOfTrades = activeDateTrades.length;

  const activeDateDate = getDateFromDate(activeDate);
  const activeDateMonth = getMonthFromDate(activeDate);
  const activeDateYear = getYearFromDate(activeDate);

  console.log({ totalProfit, numberOfTrades });

  return `
    <div class="modal fade show daily-trades-modal DailyTradesModal ${componentId}" id="daily-trades-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title" id="exampleModalLabel">Daily Trades</h5>
            <button 
              class="close-modal-btn" 
              id="daily-trades-cancel-icon"
            >
              <i class="fas fa-times fa-lg text-white"></i>
            </button>
            
          </div>
          <div class="modal-body">

            <div class="d-flex justify-content-between flex-wrap align-items-center mb-1">
              <h3 class="date text-center text-muted fw-light mb-3">${activeDateMonth} ${activeDateDate}, ${activeDateYear}</h3>
              <div class="daily-stats">
                <div class="stats text-muted">
                  <p class="text-muted fw-light">Total Profit: 
                    <span class="${totalProfit < 0 ? 'text-danger' : 'text-success'} bold">
                      ${totalProfit}
                    </span>
                  </p>
                  <p class="text-muted fw-light">Trades: <span class="bold">${numberOfTrades}</span></p>
                </div>
              </div>
            </div>
            
            <ul class="trade-list">
              ${renderList(activeDateTrades, (activeDateTrade, key) => {
                const currentTradeProfit = 
                  getTotalProfitFromTrades([{ ...activeDateTrade }]);
                return `
                  ${TradeItem({ 
                    key,
                    currentTradeProfit, 
                    activeDateTrade,
                    onDeleteTradeLog,
                    // onUpdateTradeLog
                  })}
                `;
                // return `
                //   <li class="trade-item mb-3 rounded">
                //     <div class="trade-block p-2">
                //       <div class="d-flex justify-content-between flex-wrap">
                //         <div class="stock-details d-flex">
                //           <div class="icon d-flex p-1">
                //             <i class="fas fa-3x fa-layer-group"></i>
                //           </div>
                //           <div class="org-ticker d-flex flex-column mx-2">
                //             <p class="org fs-5 m-0 fw-bold">${activeDateTrade.name}</p>
                //             <p class="ticker fs-6 m-0 text-muted fw-light">${activeDateTrade.ticker}</p>
                //           </div>
                //         </div>
                //         <div class="profit-details d-flex align-items-baseline">
                //           <div class="profit-icon d-flex flex-column">
                //             ${currentTradeProfit < 0 
                //               ? '<i class="fas fa-lg fa-arrow-down text-danger"></i>' 
                //               : '<i class="fas fa-lg fa-arrow-up text-success"></i>'
                //             }
                //           </div>
                //           <p class="total-profit fw-bold ${currentTradeProfit < 0 ? 'text-danger' : 'text-success'} mx-2">
                //             ${currentTradeProfit}
                //           </p>
                //         </div>
                //       </div>
                //       <div class="d-flex justify-content-evenly flex-wrap mt-3 mb-3 py-2 border-top border-bottom border-muted">
                //         <div class="stat-block flex-grow-1 flex-shrink-1 mx-1">
                //           <p class="open-price fs-6 text-center mb-1">${activeDateTrade.openingPrice}</p>
                //           <p class="label text-center text-muted fw-light mb-1">Open</p>
                //         </div>
                //         <div class="stat-block flex-grow-1 flex-shrink-1 mx-1">
                //           <p class="close-price fs-6 text-center mb-1">${activeDateTrade.closingPrice}</p>
                //           <p class="label text-center text-muted fw-light mb-1">Close</p>
                //         </div>
                //         <div class="stat-block flex-grow-1 flex-shrink-1 mx-1">
                //           <p class="shares fs-6 text-center mb-1">${activeDateTrade.numberOfShares}</p>
                //           <p class="label text-center text-muted fw-light mb-1">Shares</p>
                //         </div>
                //         <div class="stat-block flex-grow-1 flex-shrink-1 mx-1">
                //           <p class="stop-loss-price fs-6 text-center mb-1">${activeDateTrade.stopLoss}</p>
                //           <p class="label text-center text-muted fw-light mb-1">Stop Loss</p>
                //         </div>
                //         <div class="stat-block flex-grow-1 flex-shrink-1 mx-1">
                //           <p class="take-profit-price fs-6 text-center mb-1">${activeDateTrade.takeProfit}</p>
                //           <p class="label text-center text-muted fw-light mb-1">Take Profit</p>
                //         </div>
                //       </div>
                //       <div class="d-flex justify-content-end mb-1">
                //         <button type="button" class="btn btn-sm btn-outline-danger" id="delete-trade-btn" data-trade-id="${activeDateTrade.tradeId}">Delete</button>
                //         <button type="button" class="btn btn-sm btn-outline-warning mx-2" id="update-trade-btn" data-trade-id="${activeDateTrade.tradeId}">Update</button>
                //       </div>
                //     </div>
                //   </li>
                // `
              })}
              
            </ul>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" data-toggle="modal" id="daily-trades-cancel-btn">Cancel</button>
            <button type="button" class="btn btn-success" id="daily-trades-new-trade-btn">New Trade</button>
          </div>
        </div>
      </div>
    </div> 
  `
};

export default (props) => render(
  props, 
  componentId, 
  DailyTradesModal, 
  styles, 
  onLoad,
  null,
);
