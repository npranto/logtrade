import render from "../utils/render";

const Login = () => {
  return `
    <section class="Login">
      <h1 class="text-center">Login</h1>
      <div class="p-3 text-center">
        <a class="btn btn-primary" href="?" role="button">Home</a>
        <a class="btn btn-success" href="?page=signup" role="button">Sign Up</a>
      </div>
    </section>
  `
};

const styles = () => `
  .Login {
    padding: 3em 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export default (props) => render(props, Login, styles);