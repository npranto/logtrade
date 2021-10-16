import '../vendors/firebase/firebase.js';
import { onSignout } from "../vendors/firebase/firebase.authentication.js";
import getUserFromLocalStorage from '../utils/getUserFromLocalStorage.js';

const AVATARS = [
  'https://terrigen-cdn-dev.marvel.com/content/prod/1x/242shc_ons_crd_01.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/397uat_ons_crd_01.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/katy_ons_crd_01.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/xialing_ons_crd_01.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/007blp_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/wenwu_ons_crd_01.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/012scw_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/013vis_ons_crd_01-1.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/cap_ons_crd_01.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/015wsb_ons_crd_03.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/011blw_ons_crd_04.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/017lok_ons_crd_03.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/433ybv_com_crd_01.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/435rgd_com_crd_01.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/173tsk_com_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/242shc_com_crd_01.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/037smm_com_crd_01.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/03-knull_com_crd_01.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/007blp_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/011blw_ons_crd_04.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/003cap_ons_crd_03.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/111ctt_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/140cvg_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/009drs_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/025drx_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/142ebm_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/022gam_ons_crd_01-1.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/024grt_ons_crd_01-1.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/116hdl_ons_crd_01-1.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/006hbb_ons_crd_03.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/002irm_ons_crd_03.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/017lok_ons_crd_03.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/045mts_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/043neb_ons_crd_03.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/110oky_ons_crd_03.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/141prx_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/023rra_ons_crd_03.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/cap_ons_crd_01.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/012scw_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/107shr_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/005smp_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/021slq_ons_crd_02.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/019tha_ons_crd_03.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/004tho_ons_crd_03.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/013vis_ons_crd_01-1.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/042wmr_ons_crd_03.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/015wsb_ons_crd_03.jpg', 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/079wng_ons_crd_03.jpg'
];

const getRandomAvatar = () => AVATARS[Math.floor(Math.random() * AVATARS.length)];


const Nav = props => {
  return `
    <button 
      type="button" 
      class="Nav flex justify-center rounded-md p-2 text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm fixed top-0 left-0 z-10 bg-transparent" id="menu-icon"
    >
      <i class="fas fa-2x fa-bars"></i>
    </button>

    ${NavMenu({ ...props })}
  `;
}

const NavMenu = ({ 
  isLoggedIn = false, 
  user = null, 
  activePage = 'home',
} = {}) => {
  console.log({ isLoggedIn, user, activePage });

  const profilePicture = user?.photoURL || getRandomAvatar();

  return `
    <div class="NavMenu hidden fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity shadow-lg" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      <div 
        class="relative w-52 bg-white text-black px-4 py-4" 
        style=" width: 100%; max-width: 300px; height: 100%">

        <button 
          type="button" 
          class="absolute flex justify-center rounded-md px-1 py-1 text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm fixed top-0 right-0 z-10 bg-transparent" id="close-menu-icon"
        >
          <i class="fas fa-2x fa-times" style="color: black; font-size: 1.5rem"></i>
        </button>

        <h1 class="text-black text-2xl font-bold text-gray-300 py-2">LogTrade</h1>

        ${isLoggedIn ? `
        <div class="flex flex-col py-2">
          <div class="avatar w-24 sm:w-40">
            <img src=${profilePicture} alt="Avatar" style="max-width: 100%; height: auto; border-radius: 1em" />
          </div>
          <h3 class="name text-xl sm:text-2xl font-bold text-gray-400 mt-2"> ${user?.displayName ? `<span class="text-black">Hey,</span> <br /> ${user.displayName}` : '<span class="text-black">Hey,</span> <br /> Anonymous' } </h3>
        </div>
        ` : ''}
        
        

        <ul class="menu py-2">
          ${!isLoggedIn ? `
          <li class="item pt-1">
            <a href="/home" type="button" class="${activePage === 'home' ? 'text-black' : 'text-gray-400'} hover:text-black hover:font-bold">Home</a>
          </li>
          ` : ''}

          ${!isLoggedIn ? `
          <li class="item pt-1">
            <a href="/login" type="button" class="${activePage === 'login' ? 'text-black' : 'text-gray-400'} hover:text-black hover:font-bold">Login</a>
          </li>
          ` : ''}

          ${!isLoggedIn ? `
          <li class="item pt-1">
            <a href="/signup" type="button" class="${activePage === 'signup' ? 'text-black' : 'text-gray-400'} hover:text-black hover:font-bold">Sign Up</a>
          </li>
          ` : ''}

          ${isLoggedIn ? `
          <li class="item pt-1">
            <a href="/" type="button" class="${activePage === 'dashboard' ? 'text-black' : 'text-gray-400'} hover:text-black hover:font-bold">Dashboard</a>
          </li>
          `: ''}

          ${isLoggedIn ? `
          <li class="item pt-1">
            <a href="/account" type="button" class="${activePage === 'account' ? 'text-black' : 'text-gray-400'} hover:text-black hover:font-bold">Account</a>
          </li>
          ` : ''}

          ${isLoggedIn ? `
          <li class="item pt-1">
            <a href="#/" type="button" class="${activePage === 'home' ? 'text-black' : 'text-gray-400'} hover:text-black hover:font-bold" id="log-out-btn">Logout</a>
          </li>
          ` : ''}
      </ul>
        
      </div>
    </div>
  `
};

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
const isLoggedIn = getUserFromLocalStorage() !== null;
const user = getUserFromLocalStorage();
const activePage = getActivePage();

const navElement = document.querySelector('#navbar');

if (navElement) {
  navElement.innerHTML = `${Nav({ 
    isLoggedIn, 
    user,
    activePage,
  })}`;
}


const navMenuBlock = document
  .querySelector(`.NavMenu`);
const navMenuIcon = document
  .querySelector(`.Nav#menu-icon`);
const navMenuCloseIcon = document
  .querySelector(`.NavMenu #close-menu-icon`);
const logoutBtn = document
  .querySelector(`.NavMenu #log-out-btn`);
  
  

const onLogout = async () => {
  const { error } = await onSignout();
  if (error) console.info(error);
  window.location.replace('/home');
}

const showNavigationMenu = () => {
  navMenuBlock.classList.remove('hidden');
}

const hideNavigationMenu = () => {
  navMenuBlock.classList.add('hidden');
}


navMenuIcon !== null && navMenuIcon.addEventListener('click', showNavigationMenu);
navMenuCloseIcon !== null && navMenuCloseIcon.addEventListener('click', hideNavigationMenu);
logoutBtn !== null && logoutBtn.addEventListener('click', onLogout);