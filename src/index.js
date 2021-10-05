import isEqual from 'lodash.isequal';
import './vendors/index';

import Router from "./utils/Router.js";
import render from "./utils/render.js";

import Home from "./components/Home";
import Login from './components/Login';
import Signup from './components/Signup';
import getUniqueId from './utils/getUniqueId';
import Dashboard from './components/Dashboard';
import getUserFromLocalStorage from './utils/getUserFromLocalStorage';
import { fetchAllTradesByUserId } from './vendors/firebase/firebase.firestore';

const appId = getUniqueId();

const onLoad = () => {};

const styles = () => `
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html {
    font-size: 16px;
  }
  body {
    width: 100vw;
    height: 100vh;
    font-family: 'Poppins', sans-serif;
  }
  main {
    max-width: 1200px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: auto;
  }
`;


const store = (initialState = {}) => {
  let state = {...initialState};
  return {
    getState: () => {
      return {...state};
    },
    setState: (cb) => {
      const updatedState = {...state, ...cb(state)};
      console.log({ updatedState, state });
      if (!isEqual(updatedState, state)) {
        state = {...updatedState};
        render(
          {
            getState,
            setState,
          }, 
          appId,
          App, 
          styles,
          onLoad,
          document.getElementById('root'),
        );
      }
    }
  };
}

const dateToday = new Date(`October 2, 2021`);

const initialState = { 
  isLoggedIn: getUserFromLocalStorage() !== null,
  dateToday,
  activeDate: dateToday,
  tradeLogs: [],
  user: getUserFromLocalStorage(),
  isDailyTradeModalOpen: false,
}

// global state
const { getState, setState } = store(initialState);

const App = (props = {}) => {
  const { getState } = props;
  const { 
    isLoggedIn, 
    dateToday,
    activeDate,
    tradeLogs,
    user,
    newTrade,
    isDailyTradeModalOpen,
  } = getState();
  const state = {
    isLoggedIn,
    dateToday,
    activeDate,
    tradeLogs,
    user,
    newTrade,
    isDailyTradeModalOpen,
  }

  console.log('App rendering...', { ...getState() });

  return Router(
    [
      { 
        page: Login,
        redirectRules: [
          { 
            rule: () => isLoggedIn,
            redirectTo: '?page=dashboard',
          },
        ],
        matchingQuery: 'login',
        props: { ...props, ...state },
      },
      { 
        page: Signup, 
        redirectRules: [
          { 
            rule: () => isLoggedIn,
            redirectTo: '?page=dashboard',
          },
        ],
        matchingQuery: 'signup',
        props: { ...props, ...state },
      },
      { 
        page: Dashboard,
        redirectRules: [
          { 
            rule: () => !isLoggedIn,
            redirectTo: '?page=home',
          },
        ],
        matchingQuery: 'dashboard',
        props: { ...props, ...state },
      },
    ], 
    'page', 
    { 
      page: Home, 
      props: { ...props, ...state, app: 'LogTrade' },
    }
  );
};

// render(
//   {
//     getState, 
//     setState,
//   }, 
//   appId,
//   App, 
//   styles,
//   onLoad,
//   document.getElementById('root'),
// );

fetchAllTradesByUserId('H8XTiCvnxOWojohm2DewzlBxrjG2');
