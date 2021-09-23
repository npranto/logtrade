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

const App = () => {
  const isLoggedIn = getUserFromLocalStorage() !== null; 
  console.log({ isLoggedIn });

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
        props: { isLoggedIn },
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
        props: { isLoggedIn },
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
        props: { isLoggedIn },
      },
    ], 
    'page', 
    { 
      page: Home, 
      props: { app: 'LogTrade', isLoggedIn },
    }
  );
};

render(
  {}, 
  appId,
  App, 
  styles,
  onLoad,
  document.getElementById('root')
);