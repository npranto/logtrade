import Router from "./utils/Router.js";
// import render from "./utils/render.js";

import Example from "./Example.js";
import render from "./utils/render.js";

const App = () => {
  return Router(
    [
      { 
        page: Example, matchingQuery: 'example', 
        props: { 
          name: 'Shakiba', 
          color: 'red',
        } 
      },
    ], 
    'page', 
    { 
      page: (props) => `Example default page - ${props.name}`, 
      props: { name: 'ssdff' },
    });
};

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
    background-image: url("assets/img/add.png");
  }
  main {
    max-width: 1200px;
    width: 100%;
    background: whitesmoke;
    margin: 0 auto;
  }
`;


render({}, App, styles, document.getElementById('root'));