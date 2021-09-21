import getUniqueId from "../utils/getUniqueId";
import getUserFromLocalStorage from "../utils/getUserFromLocalStorage";
import render from "../utils/render";

const componentId = getUniqueId();

const onLoad = () => {};

const styles = () => `
  .${componentId} {
    padding: 3em 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Dashboard = () => {
  return `
    <section class="Dashboard ${componentId}">
      <h1 class="text-center">Welcome to Dashboard</h1>
      <div class="p-3 text-center">
        <a class="btn btn-primary" href="?page=login" role="button">Logout</a>
        <a class="btn btn-success" href="?page=signup" role="button">Sign Up</a>
        <pre>
          ${JSON.stringify({ user: getUserFromLocalStorage() }, null, 2)}
        </pre>
      </div>
    </section>
  `
};

export default (props) => render(
  props, 
  componentId,
  Dashboard, 
  styles, 
  onLoad, 
);