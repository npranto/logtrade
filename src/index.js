import renderHTML from "./utils/renderHTML.js";

const Home = () => {
  return `
    <h1>Hello LogTrade!</h1>
  `;
}

renderHTML(Home(), document.getElementById('root'));