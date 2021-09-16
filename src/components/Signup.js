import render from "../utils/render";

const Signup = () => {
  return `
    <section class="Signup">
      <h1 class="text-center mt-5 mb-5 text-muted"> Log Trade </h1>
      <form class="form-signup" id="signup-form" action="#">       
        <h2 class="form-signup-heading">Sign Up</h2>
        <input 
          type="text" 
          class="form-control" 
          name="signup-fullname" 
          placeholder="Full Name" 
          required
          autofocus 
        />
        <input 
          type="email" 
          class="form-control" 
          name="signup-email" 
          placeholder="Email Address" 
          required
        />
        <input 
          type="password" 
          class="form-control" 
          name="signup-password" 
          placeholder="Password" 
          required
        />    
        <input 
          type="password" 
          class="form-control" 
          name="signup-confirm-password" 
          placeholder="Confirm Password" 
          required
        />    
        <div class="d-grid gap-2 mt-3">
          <button 
            class="btn btn-lg btn-primary btn-block" 
            type="submit"
          >
            Sign Up
          </button>   
        </div>
        <div class="d-grid gap-2 mt-3">
          <a class="btn btn-link" href="?page=login" role="button">Already have account?</a>
        </div>
      </form>
    </section>
  `
};

const styles = () => `
  .Signup {
    padding-top: 80px;
    padding-bottom: 80px;
    box-sizing: border-box;
    height: 100vh;
  }
  .form-signup {
    max-width: 380px;
    padding: 15px 35px 45px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .form-signup .form-signup-heading,
  .form-signup .checkbox {
    margin-bottom: 30px;
  }
  .form-signup .checkbox {
    font-weight: normal;
  }
  .form-signup .form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .form-signup .form-control:focus {
    z-index: 2;
  }
`;

export default (props) => render(props, Signup, styles);