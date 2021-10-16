import getUserFromLocalStorage from '../utils/getUserFromLocalStorage.js';

const DeleteAccountConfirmModal = () => {
  return (
    <div class="DeleteAccountConfirmModal fixed z-10 inset-0 overflow-y-auto hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="delete-account-confirm-modal">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* <!--
          Background overlay, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        --> */}
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* <!--
          Modal panel, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        --> */}
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                {/* <!-- Heroicon name: outline/exclamation --> */}
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Delete account
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete your account? All of your data will be permanently removed. This action can not be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" id="confirm-delete-account-btn">
              Yes, go ahead!
            </button>
            <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Account = (props) => {
  console.log({ ...props });
  const { user } = props;
  const { photoURL, displayName = '', email } = user;
  return `
    ${DeleteAccountConfirmModal()}  

    <section class="Account px-10 py-10">
      <h1 class="text-2xl sm:text-3xl p-2 my-2">Account</h1>

      <div className="profile shadow p-2 my-2">
        <div class="relative flex-grow w-full sm:w-1/2 md:w-1/4">
          <div class="flex flex-col py-2">
            <div class="avatar w-24 sm:w-40">
              <img src="${photoURL}" alt="Avatar" style="max-width: 100%; height: auto; border-radius: 1em" />
            </div>
          </div>
        </div>
        <div class="relative flex-grow w-full sm:w-1/2 md:w-1/4">
          <label for="full-name" class="leading-7 text-sm text-gray-600">Full Name</label>
          <input type="text" value="${displayName}" id="full-name" name="full-name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" disabled />
        </div>
        <div class="relative flex-grow w-full sm:w-1/2 md:w-1/4">
          <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" value="${email}" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" id="cancel-delete-account-btn" disabled />
        </div>
      </div>

      <div class="user-actions">
        <button class="flex mt-4 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">Delete Account</button id="delete-account-btn">
      </div>
    </section>
  `;
}


// elements
const accountElement = document.querySelector('#account');
const deleteAccountConfirmModalElement = document
  .querySelector('.DeleteAccountConfirmModal#delete-account-confirm-modal');
const deleteAccountBtn = document
  .querySelector('.Account #delete-account-btn');
const confirmDeleteAccountBtn = document
  .querySelector('.DeleteAccountConfirmModal #confirm-delete-account-btn');
const cancelDeleteAccountBtn = document
  .querySelector('.DeleteAccountConfirmModal #cancel-delete-account-btn');

// functions
const onDeleteAccount = () => {
  // show modal to confirm deletion of user account
  // if confirmed
    // get user id
    // delete trade logs doc for user within firestore
    // delete user account from firebase auth
  // if cancelled
    // close out the delete confirm modal
}

// events
deleteAccountBtn.addEventListener('click', onDeleteAccount)

// initialize
const init = () => {
  const user = getUserFromLocalStorage();

  if (!user || user === null) {
    return window.location.replace('/login');
  }

  if (accountElement) {
    accountElement.innerHTML = `${Account({ 
      // isLoggedIn: getUserFromLocalStorage() !== null, 
      user: getUserFromLocalStorage(),
    })}`;
  }
}

init();

