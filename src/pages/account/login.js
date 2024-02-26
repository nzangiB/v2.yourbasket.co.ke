import { Nav } from "../../components/nav/nav";

import "./login.scss";

async function Login (props) {
  return (
    <>
      <Nav props={props}/>
      <div className="container">
        <main className="content">
          <div className="loginForm">
						LoginForm
						SocialLogin
            <p><a data-route="/forgot" className="forgot">Forgot your Password?</a></p>
            <p>Don't have an account? <a data-route="/register">Sign up</a></p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;
