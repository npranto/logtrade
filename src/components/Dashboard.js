import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import Calendar from "./Calendar";
import Nav from "./Nav";

const componentId = getUniqueId();

const onLoad = () => {};

const styles = () => `
  .${componentId} {
    padding: 1em 0;
  }
  .${componentId} .close-modal-btn {
    outline: none;
    cursor: pointer;
    background: none;
    border: none;
  }
`;

const Dashboard = (props = {}) => {
  return `
    ${Nav({ ...props })}
    <section class="Dashboard ${componentId}">
      
      <div class="modal fade" id="logout-confirm-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Logout</h5>
              <button 
                class="close-modal-btn" 
                id="logout-confirm-modal-close-btn"
              >
                <i class="fas fa-times fa-lg"></i>
              </button>
              
            </div>
            <div class="modal-body">
              <p>Are you sure?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" data-toggle="modal" id="logout-confirm-modal-cancel-btn">Cancel</button>
              <button type="button" class="btn btn-danger" id="logout-confirm-btn">Logout</button>
            </div>
          </div>
        </div>
      </div>

      ${Calendar({ ...props })}
    </section>
  `
};

export default (props) => render(
  props, 
  componentId,
  Dashboard, 
  styles, 
  onLoad, 
);


{/* <h1 class="text-center">Welcome to Dashboard</h1>
<div class="p-3 text-center">
  <button 
    class="btn btn-danger" 
    role="button"
    id="logout-btn"
    data-toggle="modal"
    data-target="#logout-confirm-modal"
  >
    Logout
  </button>
  <pre class="text-left">
    ${JSON.stringify(getUserFromLocalStorage(), null, 2)}
  </pre>
</div> */}

// const listenForSignout = () => {
//   // elements
//   const logoutButton = document
//     .querySelector(`.${componentId} #logout-btn`);
//   const logoutConfirmButton = document
//     .querySelector(`.${componentId} #logout-confirm-btn`);
//   const logoutConfirmModalCloseButton = document
//     .querySelector(`.${componentId} #logout-confirm-modal-close-btn`)
//   const logoutConfirmModalCancelButton = document
//     .querySelector(`.${componentId} #logout-confirm-modal-cancel-btn`)
//   const logoutConfirmModal = new bootstrap
//     .Modal(
//       document.querySelector(`.${componentId} #logout-confirm-modal`), {}
//     );
  
  
//   const showLogoutConfirmationModal = () => {
//     logoutConfirmModal.show();
//   }

//   const hideLogoutConfirmationModal = () => {
//     logoutConfirmModal.hide();
//   }

//   const onLogout = async () => {
//     const { error } = await onSignout();
//     if (error) console.info(error);
//     hideLogoutConfirmationModal();
//     window.location.replace('?page=login');
//   }
  
//   logoutButton
//     .addEventListener('click', showLogoutConfirmationModal);
//   logoutConfirmModalCloseButton
//     .addEventListener('click', hideLogoutConfirmationModal);
//   logoutConfirmModalCancelButton
//     .addEventListener('click', hideLogoutConfirmationModal);
//   logoutConfirmButton
//     .addEventListener('click', onLogout);
// }

// listenForSignout();
