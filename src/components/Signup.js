import render from "../utils/render";

const Signup = () => {
  return `
    <section class="Signup">
      <h1 class="text-center">Sign Up</h1>
      <div class="p-3 text-center">
        <a class="btn btn-primary" href="?" role="button">Home</a>
        <a class="btn btn-success" href="?page=login" role="button">Login</a>
      </div>
    </section>
  `
};

const styles = () => `
  .Signup {
    padding: 3em 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export default (props) => render(props, Signup, styles);