import render from "../utils/render";

const Login = () => {
  return `
    <section class="Login">
      <h1 class="text-center mt-5 mb-5 text-muted"> Log Trade </h1>
      <form class="form-signin" id="signin-form" action="#">       
        <h2 class="form-signin-heading">Login</h2>
        <input 
          type="email" 
          class="form-control" 
          name="signin-email" 
          placeholder="Email Address" 
          autofocus 
          required 
        />
        <input 
          type="password" 
          class="form-control" 
          name="signin-password" 
          placeholder="Password" 
          required 
        />      
        <label class="checkbox mt-3">
          <input 
            type="checkbox" 
            value="remember-me" 
            class="remember-me" 
            id="rememberMe" 
            name="rememberMe"
          /> Remember me
        </label>
        <div class="d-grid gap-2">
          <button 
            class="btn btn-lg btn-primary btn-block" 
            type="submit"
          >
            Login
          </button>   
        </div>
        <div class="d-grid gap-2 mt-3">
          <a class="btn btn-link" href="?page=signup" role="button">Create new account</a>
        </div>
      </form>
    </section>
  `
};

const styles = () => `
  .Login {
    padding-top: 80px;
    padding-bottom: 80px;
    height: 100vh;
    box-sizing: border-box;
  }
  .form-signin {
    max-width: 380px;
    padding: 15px 35px 45px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 30px;
  }
  .form-signin .checkbox {
    font-weight: normal;
  }
  .form-signin .form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
`;

export default (props) => render(props, Login, styles);