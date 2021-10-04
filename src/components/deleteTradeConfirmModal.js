import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";

const componentId = getUniqueId();

const onLoad = (props = {}) => {
  const { activeDateTrade = {} } = props;

  // elements
  const deleteTradeBtn = document
    .querySelector(`.${componentId} #delete-trade-btn`);
  const deleteTradeConfirmModalCancelIcon = document
    .querySelector(`.${componentId} #delete-trade-confirm-modal-cancel-icon`);
  const deleteTradeConfirmModalCancelBtn = document
    .querySelector(`.${componentId} #delete-trade-confirm-modal-cancel-btn`);
  const deleteTradeConfirmBtn = document
    .querySelector(`.${componentId} #delete-trade-confirm-modal-btn`);
  // const updateTradeBtn = document
  //   .querySelector(`.${componentId} #update-trade-btn`);
  
  const deleteTradeConfirmModal = new bootstrap
    .Modal(
      document.querySelector(`.${componentId}#delete-trade-confirm-modal`), {}
    );

  const showDeleteTradeConfirmModal = () => {
    deleteTradeConfirmModal.show();
  }
  const hideDeleteTradeConfirmModal = () => {
    deleteTradeConfirmModal.hide();
  }

  const onDeleteTrade = () => {
    console.log('detected delete trade...', activeDateTrade.tradeId);
    const { tradeId } = activeDateTrade;
    // props.onDeleteTradeLog(tradeId);
  }

  // const onUpdateTrade = () => {
  //   console.log('detected update trade...', activeDateTrade.tradeId);
  //   const { tradeId } = activeDateTrade;
  //   props.onUpdateTradeLog(tradeId);
  // }

  deleteTradeBtn
    .addEventListener('click', showDeleteTradeConfirmModal);
  deleteTradeConfirmModalCancelBtn
    .addEventListener('click', hideDeleteTradeConfirmModal);
  deleteTradeConfirmModalCancelIcon
    .addEventListener('click', hideDeleteTradeConfirmModal);
  deleteTradeConfirmBtn
    .addEventListener('click', onDeleteTrade)
  // updateTradeBtn
  //   .addEventListener('click', onUpdateTrade);
}

const styles = () => `
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
`;

const DeleteTradeConfirmModal = (props = {}) => {
  const { activeDateTrade = {}, currentTradeProfit } = props;
  return `
    <div class="modal fade ${componentId}" id="delete-trade-confirm-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    </div> 
  `;
};

export default (props) => render(
  props, 
  componentId, 
  DeleteTradeConfirmModal, 
  styles, 
  onLoad,
  null,
);
