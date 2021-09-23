import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import { onSignout } from "../vendors/firebase/firebase.authentication";

const componentId = getUniqueId();

const listenForSignout = () => {
  // elements
  const logoutButton = document
    .querySelector(`.${componentId} #logout-button`);

  const onLogout = async () => {
    const { error } = await onSignout();
    if (error) console.info(error);
    window.location.replace('?page=login');
  }

  logoutButton.addEventListener('click', onLogout);
}

const onLoad = () => {
  listenForSignout();
};

const styles = () => `
  .${componentId} {
    position: fixed;
    top: 10px;
    left: 10px;
  }
  .${componentId} .nav-menu-trigger-link,
  .${componentId} .nav-menu-trigger-link:focus,
  .${componentId} .nav-menu-trigger-link:active {
    text-decoration: none;
    color: inherit;
    border: none;
    outline: none;
    box-shadow: none;
  }
  .${componentId} .nav-offcanvas .offcanvas-body {
    padding: 0;
  }
  .${componentId} .nav-offcanvas .list-group {
    border-radius: 0;
  }
  .${componentId} .nav-offcanvas .profile {
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
  .${componentId} .nav-offcanvas .avatar {
    max-width: 30%;
    width: 100%;
    margin: 0 auto;
  }
  .${componentId} .nav-offcanvas .name {
    color: gray;
    text-align: center;
    font-size: 1.5rem;
  }
`;

const Nav = ({ isLoggedIn = false, activePage = 'home' } = {}) => {
  return `
    <nav class="Nav ${componentId}">
      <a 
        class="btn btn-link nav-menu-trigger-link" 
        id="nav-menu-trigger-link"
        data-bs-toggle="offcanvas" 
        href="#offcanvasExample" 
        role="button" 
        aria-controls="offcanvasExample"
      >
        <i class="fas fa-lg fa-bars"></i>
      </a>

      <div 
        class="offcanvas offcanvas-start nav-offcanvas" 
        tabindex="-1 " 
        id="offcanvasExample" 
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title text-center" id="offcanvasExampleLabel">LogTrade</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div class="profile">
            <img 
              src="https://avatars.githubusercontent.com/u/13524077?v=4" 
              alt="Avatar" 
              class="avatar" 
            />
            <p class="name mt-2">Artyom Kim</p>
          </div>
          <div class="list-group nav-items">
            <a href="?page=home" class="list-group-item list-group-item-action ${activePage === 'home' ? 'active' : ''}" aria-current="true">
              Home
            </a>
            ${!isLoggedIn ? (`
              <a 
                href="?page=login" 
                class="list-group-item list-group-item-action ${activePage === 'login' ? 'active' : ''}"
              >
                Login
              </a>
            `) : ''}
            ${!isLoggedIn ? (`
              <a 
                href="?page=signup" 
                class="list-group-item list-group-item-action ${activePage === 'signup' ? 'active' : ''}"
              >
                Sign Up
              </a>
            `) : ''}
            ${isLoggedIn ? (`
              <a 
                href="?page=dashboard" 
                class="list-group-item list-group-item-action ${activePage === 'dashboard' ? 'active' : ''}"
              >
                Dashboard
              </a>
            `) : ''}
            ${isLoggedIn ? (`
              <a 
                href="?page=account" 
                class="list-group-item list-group-item-action ${activePage === 'account' ? 'active' : ''}"
              >
                Account
              </a>
            `) : ''}
            ${isLoggedIn ? (`
              <button 
                class="list-group-item list-group-item-action" id="logout-button"
              >
                Logout
              </button>
            `) : ''} 
          </div>
        </div>
      </div>
    </nav>
  `
};

export default (props) => render(
  props, 
  componentId,
  Nav, 
  styles, 
  onLoad, 
);
