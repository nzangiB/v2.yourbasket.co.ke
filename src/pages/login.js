import { NavHeader } from "../components/nav/nav";
import { LoginForm } from "../components/auth/LoginForm";

import "./login.scss";

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
      <NavHeader {...props}/>
      <div className="container">
        <main className="content">
          <LoginForm/>
          {/* <SocialLoginForm/> */}
        </main>
      </div>
    </>
  );
}

export default Login;
