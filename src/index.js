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

export const store = (initialState = {}) => {
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

const initialState = { 
  isLoggedIn: getUserFromLocalStorage() !== null,
  date: new Date(),
}

// global state
const { getState, setState } = store(initialState);

const App = (props = {}) => {
  const { getState } = props;
  const { isLoggedIn } = getState();

  console.log('App rendering...', { ...getState() });

  return Router(
    [
      { 
        page: Login,
        redirectRules: [
          { 
            rule: () => getUserFromLocalStorage() !== null,
            redirectTo: '?page=dashboard',
          },
        ],
        matchingQuery: 'login',
        props: { ...props, isLoggedIn },
      },
      { 
        page: Signup, 
        redirectRules: [
          { 
            rule: () => getUserFromLocalStorage() !== null,
            redirectTo: '?page=dashboard',
          },
        ],
        matchingQuery: 'signup',
        props: { ...props, isLoggedIn },
      },
      { 
        page: Dashboard,
        redirectRules: [
          { 
            rule: () => getUserFromLocalStorage() === null,
            redirectTo: '?page=home',
          },
        ],
        matchingQuery: 'dashboard',
        props: { ...props, isLoggedIn },
      },
    ], 
    'page', 
    { 
      page: Home, 
      props: { ...props, app: 'LogTrade', isLoggedIn },
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