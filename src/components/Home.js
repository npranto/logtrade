import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";

const componentId = getUniqueId();

const onLoad = () => {};

const styles = () => `
  .${componentId} {
    padding: 3em 1em;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  .${componentId} .logtrade-logo {
    max-width: 200px;
    height: auto;
    margin: 0 auto;
  }
`;

const Home = ({ app }) => {
  return `
    <section class="Home ${componentId}">
      <img src="assets/img/LOGTRADE.png" alt="LogTrade Logo" class="logtrade-logo" />
      <h1 class="text-center">Welcome to ${app}</h1>
      <div class="p-3 text-center">
        <a class="btn btn-primary" href="?page=login" role="button">Login</a>
        <a class="btn btn-success" href="?page=signup" role="button">Sign Up</a>
      </div>
    </section>
  `
};

export default (props) => render(
  props, 
  componentId,
  Home, 
  styles, 
  onLoad, 
);
