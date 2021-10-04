import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import UpdateTradeForm from "./UpdateTradeForm";

const componentId = getUniqueId();

const onLoad = (props = {}) => {
  
}

const styles = () => `
  .${componentId} {
    
  }
`;

const UpdateTradeModal = (props = {}) => {
  return `
    <div class="modal fade show update-trade-form-modal UpdateTradeModal ${componentId}" id="update-trade-form-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-warning text-white">
            <h5 class="modal-title" id="exampleModalLabel">Update Trade</h5>
            <button 
              class="close-modal-btn" 
              id="update-trade-cancel-icon-modal"
            >
              <i class="fas fa-times fa-lg text-white"></i>
            </button>
            
          </div>
          <div class="modal-body">

            <div class="update-trade-form-error" id="update-trade-form-error"></div>

            ${UpdateTradeForm({
              ...props,
            })}

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" data-toggle="modal" id="update-trade-cancel-btn-modal">Cancel</button>
            <button type="button" class="btn btn-warning" id="update-trade-confirm-btn-modal">Save</button>
          </div>
        </div>
      </div>
    </div> 
  `
};

export default (props) => render(
  props, 
  componentId, 
  UpdateTradeModal, 
  styles, 
  onLoad,
  null,
);
