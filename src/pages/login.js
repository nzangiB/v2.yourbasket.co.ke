import Layout from "./_layout";
import { NavHeader } from "../components/nav/navHeader";
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
    <Layout>
      <NavHeader {...props}/>
      <div className="container">
        <main className="content">
          <LoginForm/>
          {/* <SocialLoginForm/> */}
        </main>
      </div>
    </Layout>
  );
}

const routes = [
  {
    path: "/login",
    data: { page: { title: "Login" } },
    template: Login
  }
];

export default routes;
