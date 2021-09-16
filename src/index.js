import './vendors/vendor';

import Router from "./utils/Router.js";
import render from "./utils/render.js";

import Home from "./components/Home";
import Login from './components/Login';
import Signup from './components/Signup';

const styles = () => `
  html {
    font-size: 16px;
  }
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body {
    width: 100%;
    height: 100%;
  }
  main {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    background: whitesmoke
  }
`;

const App = () => {
  return Router(
    [
      { 
        page: Login, 
        matchingQuery: 'login',
      },
      { 
        page: Signup, 
        matchingQuery: 'signup',
      }
    ], 
    'page', 
    { 
      page: Home, 
      props: { app: 'LogTrade!' },
    }
  );
};




render({}, App, styles, document.getElementById('root'));