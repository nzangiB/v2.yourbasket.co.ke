import { useState } from "../../plugins/react";
import DataService from "../../services/data.service";
import { toast } from "../../plugins/react-toastify";

export async function RegistrationFormUser () {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneCode, setPhoneCode] = useState("254");
  const [loading, setLoading] = useState(false);

  const [passwordType, setPasswordType] = useState("password");
  const [passwordType2, setPasswordType2] = useState("password");

  const data = await DataService.getUserField().then((data) => {
    return data?.data?.data;
  }).catch((error) => {
    console.error(error);
  });

  const styles = {
    input: {
      display: "none" // don't want to see it
    }
  };

  const onChangeFirstName = (e) => {
    const data = e.target.value;
    setFirstName(data);
  };
  const onChangeLastName = (e) => {
    const data = e.target.value;
    setLastName(data);
  };
  const onChangeEmail = (e) => {
    const data = e.target.value;
    setEmail(data);
  };
  const onChangePhone = (e) => {
    const data = e.target.value;
    setPhone(data);
  };
  const onChangePassword = (e) => {
    const data = e.target.value;
    setPassword(data);
  };
  const onChangePassword2 = (e) => {
    const data = e.target.value;
    setConfirmPassword(data);
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const togglePassword2 = () => {
    if (passwordType2 === "password") {
      setPasswordType2("text");
      return;
    }
    setPasswordType2("password");
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // check if password is matched..
    if (password === confirmPassword) {
      const data = {};
      data.email = email;
      data.phone = phoneCode;
      data.type = "register";
      setLoading(true);

      await DataService.forgotPassword(data).then(() => {
        toast.success("OTP sent successfully!", { position: toast.POSITION.TOP_RIGHT });
        // buttonref1.current.click();
      }).catch((error) => {
        console.error(error);
        const resMessage = error.response?.data?.msg || error.msg || error.message || error.toString();
        toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
      });
    } else {
      toast.error("Password confirm pasword do not match!", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    console.log("UserRegistrationForm", form);
    const formData = new FormData(form);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");
    const confirmPassword = formData.get("password2");
    const button = form.querySelector('button[type="submit"]');

    const postData = {};
    postData.first_name = firstName;
    postData.last_name = lastName;
    postData.user_name = email;
    postData.email = email;
    postData.phone = phone.startsWith("0") ? phone.replace(/^0/, phoneCode) : phone;
    postData.role = "user";
    if (data?.password === "yes") {
      postData.password = password;
      postData.password2 = confirmPassword;
    }

    setLoading(true);
    if (password !== confirmPassword) {
      toast.error("Password & Confirm Password do not match", { position: toast.POSITION.TOP_RIGHT });
      setLoading(false);
      return;
    }

    console.log("postData", postData);
    localStorage.setItem("user-unregistered", JSON.stringify(postData));

    try {
      const data = {};
      data.email = postData.email;
      data.phone = postData.phone;
      data.type = "register";
      // TODO: Rewrite this to DataService.sendUserOtp(data)
      const otp = await DataService.forgotPassword(data);
      console.log(otp);
      if (!otp) return;
      localStorage.setItem("user-otp", JSON.stringify(otp));
      toast.success("OTP sent successfully!", { position: toast.POSITION.TOP_RIGHT });
      location.href = "register/verify-otp";
    } catch (error) {
      console.error(error);
      const resMessage = error.response?.data?.msg || error.msg || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });

      button.replaceChildren(
        <span>Sign Up</span>
      );
    }
  };

  const handleSubmitClick = (e) => {
    e.target.replaceChildren(
      <span>Signing Up ...</span>
    );
  };

  return (
    <section className={"signup-form"}>
      <div className={"form-container"}>
        <form id={"userRegistrationForm"} className={"form"} onSubmit={handleSubmit}>
          <header>
            <h4 className={"title"}>Create an account</h4>
          </header>
          <section>
            <div className="input-field">
              <input
                type="text"
                required={data?.first_name === "yes"}
                onChange={onChangeFirstName}
                style={data?.first_name === "no" ? styles.input : {}}
                name="firstName"
                placeholder="First Name*"
                className={"input"}
              />
              <input
                type="text"
                required={data?.last_name === "yes"}
                onChange={onChangeLastName}
                style={data?.last_name === "no" ? styles.input : {}}
                name="lastName"
                placeholder="Last Name*"
                className={"input"}
              />
            </div>
            <div className="input-field">
              <input
                type="tel"
                defaultValue={data.phone}
                required={data?.mobile_number === "yes"}
                style={data?.mobile_number === "no" ? styles.input : {}}
                onChange={onChangePhone}
                maxLength={10}
                name="phone"
                placeholder="Phone Number"
                className="input"
              />
            </div>
            <div className="input-field">
              <input
                type="email"
                style={data?.email === "no" ? styles.input : {}}
                required={data?.email === "yes"}
                onChange={onChangeEmail}
                name="email"
                placeholder="Email*"
                className={"input"}
              />
            </div>
            <div className="input-field">
              <input
                type={passwordType}
                required={data?.password === "yes"}
                style={data?.password === "no" ? styles.input : {}}
                name="password"
                onChange={onChangePassword}
                placeholder="Password*"
                className={"input"}
              />
              {passwordType === "password"
                ? <svg className={"icon"} onClick={togglePassword} xmlns="http://www.w3.org/2000/svg"
								       viewBox="0 0 576 512">
                  <path
                    d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
                </svg>
                : <svg className={"icon"} onClick={togglePassword} xmlns="http://www.w3.org/2000/svg"
								       viewBox="0 0 640 512">
                  <path
                    d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/>
                </svg>
              }
            </div>
            <div className="input-field">
              <input
                type={passwordType2}
                required={data?.password === "yes"}
                style={data?.password === "no" ? styles.input : {}}
                name="password2"
                onChange={onChangePassword2}
                placeholder="Confirm Password*"
                className={"input"}
              />
              <object
                className={"icon"}
                data={require(`./icons/${passwordType2 === "password" ? "password-show.svg" : "password-hide.svg"}`)}
                name={"Toggle Password"}
                onClick={togglePassword2}
              />
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <input required type="checkbox" name="terms" id="terms"/>
              <label htmlFor={"terms"}>
								I agree with the <a data-route={"/terms-conditions"} className={"link"}>Terms and Conditions</a>
              </label>
            </div>
          </section>
          <footer>
            <button type={"submit"} className="btn --primary" onClick={handleSubmitClick} disabled={loading}>
              <span>Sign Up</span>
            </button>
          </footer>
        </form>

        <p style={{ textAlign: "center" }}>
					Already have an account? <a data-route={"/login"}>Login</a>
        </p>
      </div>
    </section>
  );
}
