import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import AddTradeForm from "./AddTradeForm";

const componentId = getUniqueId();

const onLoad = (props = {}) => {
}

const styles = () => `
  .${componentId} {
    
  }
`;

const AddTradeModal = (props = {}) => {
  return `
    <div class="modal fade add-trade-form-modal AddTradeModal ${componentId}" id="add-trade-form-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Trade</h5>
            <button 
              class="close-modal-btn" 
              id="add-trade-cancel-icon-modal"
            >
              <i class="fas fa-times fa-lg"></i>
            </button>
            
          </div>
          <div class="modal-body">

          ${AddTradeForm({
            ...props,
          })}

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" data-toggle="modal" id="add-trade-cancel-btn-modal">Cancel</button>
            <button type="button" class="btn btn-success" id="add-trade-confirm-btn-modal">Add Trade</button>
          </div>
        </div>
      </div>
    </div> 
  `
};

export default (props) => render(
  props, 
  componentId, 
  AddTradeModal, 
  styles, 
  onLoad,
  null,
);
