import '../vendors/firebase/firebase.js';
import { onSignout } from "../vendors/firebase/firebase.authentication.js";
import getUserFromLocalStorage from '../utils/getUserFromLocalStorage.js';

const Nav = ({ 
  isLoggedIn = false, 
  user = null, 
  activePage = 'home',
} = {}) => {
  console.log({ isLoggedIn, user, activePage });
  return `
  <!-- navbar (start) -->
  <nav class="Nav bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button type="button" id="nav-menu-icon" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <!--
              Icon when menu is closed.

              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!--
              Icon when menu is open.

              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            -->
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-white border-2 border-white">LogTrade</h1>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <a href="/home" class="${activePage === 'home' ? 'bg-gray-700 text-white' : ''} text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>

              ${isLoggedIn
                ? `<a href="/" class="${activePage === 'dashboard' ? 'bg-gray-700 text-white' : ''} text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>`
                : ''
              }
                            
              ${!isLoggedIn
                ? `<a href="/login" class="${activePage === 'login' ? 'bg-gray-700 text-white' : ''} text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a>`
                : ''
              }
              ${!isLoggedIn
                ? `<a href="/signup" class="${activePage === 'signup' ? 'bg-gray-700 text-white' : ''} text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</a>`
                : ''
              }
            </div>
          </div>
        </div>

        ${isLoggedIn
          ? `
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button type="button" id="profile-avatar" class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full bg-white" src="${user?.photoURL || '/assets/img/icons/user.png'}" alt="Avatar">
                </button>
              </div>

              <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
              <div id="profile-menu-dropdown" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-in duration-75 transform opacity-0 scale-95" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <a href="/" id="account-btn" class="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-0">Account</a>
                <a href="#" id="sign-out-btn" class="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
              </div>
            </div>
          </div>
          `
          : ''
        }
        
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <!-- use "sm:hidden" to show on mobile, otherwise to hide leave "hidden" -->
    <div class="hidden" id="nav-mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <a href="/home" class="${activePage === 'home' ? 'bg-gray-700 text-white' : ''} text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>

        ${isLoggedIn
          ? `<a href="/" class="${activePage === 'dashboard' ? 'bg-gray-700 text-white' : ''} text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>`
          : ''
        }        

        ${!isLoggedIn
          ? `<a href="/login" class="${activePage === 'login' ? 'bg-gray-700 text-white' : ''} text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</a>`
          : ''
        }
        ${!isLoggedIn
          ? `<a href="/signup" class="${activePage === 'signup' ? 'bg-gray-700 text-white' : ''} text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Sign Up</a>`
          : ''
        }
      </div>
    </div>
  </nav>
  <!-- navbar (end) -->
  `
};

const isLoggedIn = getUserFromLocalStorage() !== null;
const user = getUserFromLocalStorage();
const getActivePage = () => {
  const urlPathName = window?.location?.pathname || '';
  if (urlPathName.includes('/home/')) {
    return 'home'
  }
  if (urlPathName.includes('/login/')) {
    return 'login'
  }
  if (urlPathName.includes('/signup/')) {
    return 'signup'
  }
  return 'dashboard';
}

document
  .querySelector('#navbar').innerHTML = `${Nav({ 
    isLoggedIn, 
    user,
    activePage: getActivePage(),
  })}`;

// elements
const profileAvatar = document
  .querySelector(`.Nav #profile-avatar`);
const profileMenuDropdown = document
  .querySelector(`.Nav #profile-menu-dropdown`);
const navMenuIcon = document
  .querySelector(`.Nav #nav-menu-icon`);
const navMobileMenu = document
  .querySelector(`.Nav #nav-mobile-menu`);
const accountBtn = document
  .querySelector(`.Nav #account-btn`);
const signOutBtn = document
  .querySelector(`.Nav #sign-out-btn`);
  

// functions
const showProfileMenuDropdown = () => {
  profileMenuDropdown.classList.remove('opacity-0', 'scale-95');
  profileMenuDropdown.classList.add('opacity-100', 'scale-100');
}
const hideProfileMenuDropdown = () => {
  profileMenuDropdown.classList.remove('opacity-100', 'scale-100');
  profileMenuDropdown.classList.add('opacity-0', 'scale-95');
}
const toggleShowProfileMenuDropdown = () => {
  const isProfileMenuDropdownHidden = (
    profileMenuDropdown.classList.contains('transform') 
    && profileMenuDropdown.classList.contains('opacity-0')
    && profileMenuDropdown.classList.contains('scale-95')
  );
  console.log({ isProfileMenuDropdownHidden });

  if (isProfileMenuDropdownHidden) {
    showProfileMenuDropdown();
  } else {
    hideProfileMenuDropdown();
  }
}

const showMobileNavMenu = () => {
  navMobileMenu.classList.remove('hidden');
  navMobileMenu.classList.add('sm:hidden');
}
const hideMobileNavMenu = () => {
  navMobileMenu.classList.remove('sm:hidden');
  navMobileMenu.classList.add('hidden');
}
const toggleShowMobileNavMenu = () => {
  const isMobileNavMenuHidden = (
    navMobileMenu.classList.contains('hidden')
  );
  console.log({ isMobileNavMenuHidden });

  if (isMobileNavMenuHidden) {
    showMobileNavMenu();
  } else {
    hideMobileNavMenu();
  }
} 

const redirectToUserAccount = () => {
  window.location.replace('/');
}
const onLogout = async () => {
  const { error } = await onSignout();
  if (error) console.info(error);
  window.location.replace('/home');
}


// events
profileAvatar !== null && profileAvatar.addEventListener('click', toggleShowProfileMenuDropdown);
// profileAvatar.addEventListener('focusout', hideProfileMenuDropdown);
navMenuIcon !== null && navMenuIcon.addEventListener('click', toggleShowMobileNavMenu);
// navMenuIcon.addEventListener('focusout', hideMobileNavMenu);
accountBtn !== null && accountBtn.addEventListener('click', redirectToUserAccount)
accountBtn !== null && signOutBtn.addEventListener('click', onLogout)