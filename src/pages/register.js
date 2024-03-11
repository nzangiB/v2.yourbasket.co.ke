import { NavHeader } from "../components/nav/nav";
import { RegistrationFormVerifyOtp } from "../components/auth/RegistrationFormVerifyOtp";
import { RegistrationFormVendor } from "../components/auth/RegistrationFormVendor";
import { RegistrationFormUser } from "../components/auth/RegistrationFormUser";

import "./register.scss";

async function Register (props) {
  const { params } = props;
  const page = params.page || "user";

  return (
    <>
      <NavHeader {...props}/>
      <div className="container">
        <div className="content">
          {page === "verify-otp" && <RegistrationFormVerifyOtp/>}
          {page === "vendor" && <RegistrationFormVendor/>}
          {page === "user" && (
            <div>
              {await RegistrationFormUser()}
              {/* <SocialLoginForm/> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;
