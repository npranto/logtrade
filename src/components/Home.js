import render from "../utils/render";

const Home = ({ app }) => {
  return `
    <section class="Home">
      <h1 class="text-center">Welcome to ${app}</h1>
      <div class="p-3 text-center">
        <a class="btn btn-primary" href="?page=login" role="button">Login</a>
        <a class="btn btn-success" href="?page=signup" role="button">Sign Up</a>
      </div>
    </section>
  `
};

const styles = () => `
  .Home {
    padding: 3em 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default (props) => render(props, Home, styles);