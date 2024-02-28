import { Nav } from "../../components/nav/nav";

import "./login.scss";

function LoginForm (props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    console.log("LoginForm", form);
  };

  return (
    <form className={"form"} onSubmit={handleSubmit}>
			Login Form
    </form>
  );
}

function SocialLoginForm (props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    console.log("SocialLoginForm", form);
  };

  return (
    <form className={"form"} onSubmit={handleSubmit}>
			Social Login
    </form>
  );
}

async function Login (props) {
  return (
    <>
      <Nav props={props}/>
      <div className="container">
        <main className="content">
          <div className="loginForm">
            <LoginForm/>
            <SocialLoginForm/>
            <p><a data-route="/forgot" className="forgot">Forgot your Password?</a></p>
            <p>Don't have an account? <a data-route="/register">Sign up</a></p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;
