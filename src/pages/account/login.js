import { NavHeader } from "../../components/nav/nav";
import { useState } from "../../plugins/react";
import { toast } from "../../plugins/react-toastify";

import "./login.scss";

import DataService from "../../services/data.service";
import AuthService from "../../services/auth.service";
import HelperService from "../../services/helper.service";

function LoginForm (props) {
  const [selected, setSelected] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState("254");
  const [showCountryCode, setShowCountryCode] = useState(false);
  const [showEmail, setshowEmail] = useState(true);

  const auth = AuthService.getCurrentUser();
  if (auth) return location.href = "/";

  const errorMessage = (error) => {
    toast.error("Login Failed!", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
					This field is required!
        </div>
      );
    }
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    if (/^\d+$/.test(username)) {
      setShowCountryCode(true);
      setshowEmail(false);
    } else {
      setShowCountryCode(false);
      setshowEmail(true);
    }
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    console.log("LoginForm", form);
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    const button = form.querySelector('button[type="submit"]');

    // if (checkBtn.current.context._errors.length === 0) {
    const loginUsername = (showEmail ? username : `${phoneCode}${username}`);
    await AuthService.login(loginUsername, password).then(async (data) => {
      const carts = HelperService.getLocalCart();
      await Promise.all(carts.map((value, i) => DataService.addCart(value)));
      HelperService.emptyLocalCart();
    }).then(() => {
      const url = window.location.href;
      const queryParam = url.split("=");
      if (queryParam.length > 1) {
        location.href = "/" + queryParam[1];
      } else {
        location.href = "/";
      }
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    }).finally(() => {
      button.disabled = false;
      button.replaceChildren(
        <span>Login</span>
      );
    });
    // } else {
    //   setLoading(false);
    // }
  };

  const handleSubmitClick = (e) => {
    e.target.replaceChildren(
      <span>Logging in ...</span>
    );
  };

  return (
    <section className={"signup-form"}>
      <div className={"form-container"}>
        <form id={"SignupForm"} className={"form"} onSubmit={handleSubmit}>
          <header>
            <h4 className={"title"}>Login to your account</h4>
          </header>
          <section>
            <div className="input-field">
              <input
                type="email"
                name="username"
                value={username}
                required
                autoFocus
                onChange={onChangeUsername}
                validations={[required]}
                placeholder="Enter Email or Phone Number*"
                className={"input"}
              />
            </div>
            <div className="input-field">
              <input
                type={passwordType}
                name="password"
                value={password}
                required
                placeholder="Password*"
                onChange={onChangePassword}
                validations={[required]}
                className={"input"}
              />
              {/* {passwordType === "password" */}
              {/*  ? <svg onClick={togglePassword} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"> */}
              {/*    <path */}
              {/*      d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/> */}
              {/*  </svg> */}
              {/*  : <svg onClick={togglePassword} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"> */}
              {/*    <path */}
              {/*      d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/> */}
              {/*  </svg> */}
              {/* } */}
            </div>
          </section>
          <footer>
            <button type={"submit"} className="btn --primary" onClick={handleSubmitClick} disabled={loading}>
              <span>Login</span>
            </button>
          </footer>
        </form>

        <p style={{ textAlign: "center" }}>
          <a data-route="/forgot" className="forgot">Forgot your Password?</a>
        </p>
        <p style={{ textAlign: "center" }}>
					Don't have an account? <a data-route="/register">Sign up</a>
        </p>
      </div>
    </section>
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
      <NavHeader/>
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
