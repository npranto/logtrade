import './vendors/index';

import Router from "./utils/Router.js";
import render from "./utils/render.js";

import Home from "./components/Home";
import Login from './components/Login';
import Signup from './components/Signup';
import getUniqueId from './utils/getUniqueId';
import Dashboard from './components/Dashboard';
import getUserFromLocalStorage from './utils/getUserFromLocalStorage';

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
      if (JSON.stringify(updatedState) !== JSON.stringify(state)) {
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

const dateToday = new Date();

const initialState = { 
  isLoggedIn: getUserFromLocalStorage() !== null,
  dateToday,
  activeDate: dateToday,
  stocks: [],
}

// global state
const { getState, setState } = store(initialState);

const App = (props = {}) => {
  const { getState } = props;
  const { 
    isLoggedIn, 
    dateToday,
    activeDate,
    stocks,
  } = getState();
  const state = {
    isLoggedIn,
    dateToday,
    activeDate,
    stocks,
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