import Layout from "./_layout";
import { NavHeader } from "../components/nav/nav";
import { RegistrationFormVerifyOtp } from "../components/auth/RegistrationFormVerifyOtp";
import { RegistrationFormVendor } from "../components/auth/RegistrationFormVendor";
import { RegistrationFormUser } from "../components/auth/RegistrationFormUser";

import "./register.scss";

async function RegisterUser (props) {
  return (
    <Layout>
      <NavHeader {...props}/>
      <div className="container">
        <div className="content">
          {await RegistrationFormUser()}
          {/* <SocialLoginForm/> */}
        </div>
      </div>
    </Layout>
  );
}

async function RegisterVendor (props) {
  return (
    <Layout>
      <NavHeader {...props}/>
      <div className="container">
        <div className="content">
          <RegistrationFormVendor/>
        </div>
      </div>
    </Layout>
  );
}

async function RegisterVerifyOTP (props) {
  return (
    <Layout>
      <NavHeader {...props}/>
      <div className="container">
        <div className="content">
          <RegistrationFormVerifyOtp/>
        </div>
      </div>
    </Layout>
  );
}

const routes = [
  {
    path: "/register{/:page}?",
    data: { page: { title: "Register" } },
    template: RegisterUser
  },
  {
    path: "/register/user",
    data: { page: { title: "Register" } },
    template: RegisterUser
  },
  {
    path: "/register/vendor",
    data: { page: { title: "Register" } },
    template: RegisterVendor
  },
  {
    path: "/register/verify-otp",
    data: { page: { title: "Register" } },
    template: RegisterVerifyOTP
  }
];

export default routes;
