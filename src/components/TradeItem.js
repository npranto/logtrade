import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";

const componentId = getUniqueId();

const onLoad = (props = {}) => {
  const { activeDateTrade = {} } = props;
  // const componentId = activeDateTrade.tradeId;

  // elements
  const deleteTradeBtn = document
    .querySelector(`.${props.key || componentId} #delete-trade-btn`);
  // const deleteTradeConfirmModalCancelIcon = document
  //   .querySelector(`.${componentId} #delete-trade-confirm-modal-cancel-icon`);
  // const deleteTradeConfirmModalCancelBtn = document
  //   .querySelector(`.${componentId} #delete-trade-confirm-modal-cancel-btn`);
  // const deleteTradeConfirmBtn = document
  //   .querySelector(`.${componentId} #delete-trade-confirm-modal-btn`);
  // const updateTradeBtn = document
  //   .querySelector(`.${componentId} #update-trade-btn`);
  
  // const deleteTradeConfirmModal = new bootstrap
  //   .Modal(
  //     document.querySelector(`.${componentId}#delete-trade-confirm-modal`), {}
  //   );

  // const showDeleteTradeConfirmModal = () => {
  //   deleteTradeConfirmModal.show();
  // }
  // const hideDeleteTradeConfirmModal = () => {
  //   deleteTradeConfirmModal.hide();
  // }

  const onDeleteTrade = () => {
    console.log('detected delete trade...', activeDateTrade.tradeId);
    const { tradeId } = activeDateTrade;
    props.onDeleteTradeLog(tradeId);
  }

  // const onUpdateTrade = () => {
  //   console.log('detected update trade...', activeDateTrade.tradeId);
  //   const { tradeId } = activeDateTrade;
  //   props.onUpdateTradeLog(tradeId);
  // }

  deleteTradeBtn
    .addEventListener('click', onDeleteTrade);
  // deleteTradeConfirmModalCancelBtn
  //   .addEventListener('click', hideDeleteTradeConfirmModal);
  // deleteTradeConfirmModalCancelIcon
  //   .addEventListener('click', hideDeleteTradeConfirmModal);
  // deleteTradeConfirmBtn
  //   .addEventListener('click', onDeleteTrade)
  // updateTradeBtn
  //   .addEventListener('click', onUpdateTrade);
}

const styles = (props = {}) => {
  // const componentId = props.activeDateTrade?.tradeId;
  return `
    .${props.key || componentId} .trade-block {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;  
    }
    .${props.key || componentId} .trade-block p:first-child {
      font-size: 0.90rem;
    }
    .${props.key || componentId} .trade-block p:first-child {
      font-size: 0.90rem;
    }
    .${props.key || componentId} .trade-block p:last-child {
      font-size: 0.75rem;
    }
    .${props.key || componentId} .trade-block .profit-details .total-profit {
      font-size: 2.75rem;
    }
  `;
}

const TradeItem = (props = {}) => {
  const { activeDateTrade = {}, currentTradeProfit } = props;
  // const componentId = activeDateTrade.tradeId;
  return `
    <li class="trade-item TradeItem mb-3 rounded ${props.key || componentId}">
      <div class="trade-block p-2">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="stock-details d-flex">
            <div class="icon d-flex p-1">
              <i class="fas fa-3x fa-layer-group"></i>
            </div>
            <div class="org-ticker d-flex flex-column mx-2">
              <p class="org fs-5 m-0 fw-bold">${activeDateTrade.name}</p>
              <p class="ticker fs-6 m-0 text-muted fw-light">${activeDateTrade.ticker}</p>
            </div>
          </div>
          <div class="profit-details d-flex align-items-baseline">
            <div class="profit-icon d-flex flex-column">
              ${currentTradeProfit < 0 
                ? '<i class="fas fa-lg fa-arrow-down text-danger"></i>' 
                : '<i class="fas fa-lg fa-arrow-up text-success"></i>'
              }
            </div>
            <p class="total-profit fw-bold ${currentTradeProfit < 0 ? 'text-danger' : 'text-success'} mx-2">
              ${currentTradeProfit}
            </p>
          </div>
        </div>
        <div class="d-flex justify-content-evenly flex-wrap mt-3 mb-3 py-2 border-top border-bottom border-muted">
          <div class="stat-block flex-grow-1 flex-shrink-1 mx-1">
            <p class="open-price fs-6 text-center mb-1">${activeDateTrade.openingPrice}</p>
            <p class="label text-center text-muted fw-light mb-1">Open</p>
          </div>
          <div class="stat-block flex-grow-1 flex-shrink-1 mx-1">
            <p class="close-price fs-6 text-center mb-1">${activeDateTrade.closingPrice}</p>
            <p class="label text-center text-muted fw-light mb-1">Close</p>
          </div>
          <div class="stat-block flex-grow-1 flex-shrink-1 mx-1">
            <p class="shares fs-6 text-center mb-1">${activeDateTrade.numberOfShares}</p>
            <p class="label text-center text-muted fw-light mb-1">Shares</p>
          </div>
          <div class="stat-block flex-grow-1 flex-shrink-1 mx-1">
            <p class="stop-loss-price fs-6 text-center mb-1">${activeDateTrade.stopLoss}</p>
            <p class="label text-center text-muted fw-light mb-1">Stop Loss</p>
          </div>
          <div class="stat-block flex-grow-1 flex-shrink-1 mx-1">
            <p class="take-profit-price fs-6 text-center mb-1">${activeDateTrade.takeProfit}</p>
            <p class="label text-center text-muted fw-light mb-1">Take Profit</p>
          </div>
        </div>
        <div class="d-flex justify-content-end mb-1">
          <button type="button" class="btn btn-sm btn-outline-danger" id="delete-trade-btn" data-trade-id="${activeDateTrade.tradeId}">Delete</button>
          <button type="button" class="btn btn-sm btn-outline-warning mx-2" id="update-trade-btn" data-trade-id="${activeDateTrade.tradeId}">Update</button>
        </div>
      </div>
    </li> 
  `;
};

export default (props) => render(
  props, 
  props.key || componentId, 
  TradeItem, 
  styles, 
  onLoad,
  null,
);

{/* <div class="modal fade ${componentId}" id="delete-trade-confirm-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">Delete Trade</h5>
            <button 
              class="close-modal-btn text-white" 
              id="delete-trade-confirm-modal-cancel-icon"
            >
              <i class="fas fa-times fa-lg"></i>
            </button>
            
          </div>
          <div class="modal-body">
            <p>Are you sure?</p>
          </div>
          <div class="modal-footer bg-dark text-white">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" data-toggle="modal" id="delete-trade-confirm-modal-cancel-btn">Cancel</button>
            <button type="button" class="btn btn-danger" id="delete-trade-confirm-modal-btn">Yes, delete it!</button>
          </div>
        </div>
      </div>
    </div> */}
