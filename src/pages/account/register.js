import { Component } from "@wearearchangel/handcrafted";
import { Nav } from "../../components/nav/nav";

import "./register.scss";

import DataService from "../../services/data.service";
import AuthService from "../../services/auth.service";
import HelperService from "../../services/helper.service";

import { toast } from "../../plugins/toastify";

class UserSignUpForm extends Component {
  useState = (initialValue) => {
    // store private current state
    let _val = initialValue;
    // get the current state
    const state = (() => _val)();
    // update the state
    const setState = (newValue) => {
      _val = newValue;
    };

    return [state, setState];
  };

  data = () => {
    return DataService.getUserField().then((data) => {
      return data?.data;
    }).catch((error) => {
      console.error(error);
    });
  };

  template () {
    const data = this.state;
    const styles = {
      input: {
        display: "none" // don't want to see it
      }
    };

    const [firstName, setFirstName] = this.useState("");
    const [lastName, setLastName] = this.useState("");
    const [email, setEmail] = this.useState("");
    const [phone, setPhone] = this.useState("");
    const [password, setPassword] = this.useState("");
    const [confirmPassword, setConfirmPassword] = this.useState("");
    const [phoneCode, setPhoneCode] = this.useState("254");
    const [loading, setLoading] = this.useState(false);

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

    const [passwordType, setPasswordType] = this.useState("password");
    const [passwordType2, setPasswordType2] = this.useState("password");

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

    const callForgotPassword = async (e) => {
      e.preventDefault();

      const form = e.target;

      // check if password is matched..
      if (password === confirmPassword) {
        const data = {};
        data.email = email;
        data.phone = phoneCode;
        data.type = "register";

        setLoading(true);

        await DataService.forgotPassword(data).then(() => {
          setLoading(false);
          toast.success("OTP sent successfully!", { position: toast.POSITION.TOP_RIGHT });
        }).catch((error) => {
          setLoading(false);
          const resMessage = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
          toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
        });
      } else {
        toast.error("Password confirm pasword do not match!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    };

    const callSignup = async (e) => {
      e.preventDefault();

      const form = e.target;
      console.log("UserSignUpForm", form);
      const formData = new FormData(form);

      const data = this.state;
      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const password = formData.get("password");
      const confirmPassword = formData.get("password2");
      const termsAndConditions = formData.get("terms");

      const postData = {};
      postData.first_name = firstName;
      postData.last_name = lastName;
      postData.user_name = email;
      postData.email = email;
      postData.phone = phone;
      postData.role = "user";
      // if (data?.password === "yes") {
      postData.password = password;
      postData.password2 = confirmPassword;
      // }

      setLoading(true);
      // if (password === confirmPassword) {
      console.log("postData", postData);

      await AuthService.register(postData).then(async () => {
        toast.success("Your account has been created successfully!", { position: toast.POSITION.TOP_RIGHT });
        await AuthService.login(email, password).then(async (data) => {
          const carts = HelperService.getLocalCart();
          await Promise.all(carts.map(async (value, i) => {
            await DataService.addCart(value).then((data) => { }).catch((error) => { });
          }));
          HelperService.emptyLocalCart();
          // location.href = "/";
          location.href = "https://www.yourbasket.co.ke/#/profile";
        }).catch((error) => {
          const resMessage = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
          toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
        });
      }).catch((error) => {
        const resMessage = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
        toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
      });
      // } else {
      //   toast.error("Password & Confirm Password do not match", { position: toast.POSITION.TOP_RIGHT });
      // }
    };

    const handleSubmit = callSignup;

    return (
      <form id={this.id + "Form"} onSubmit={handleSubmit}>
        <input
          type="text"
          required={data?.first_name === "yes"}
          onChange={onChangeFirstName}
          style={data?.first_name === "no" ? styles.input : {}}
          name="firstName"
          placeholder="First Name*"/>
        <input
          type="text"
          required={data?.last_name === "yes"}
          onChange={onChangeLastName}
          style={data?.last_name === "no" ? styles.input : {}}
          name="lastName"
          placeholder="Last Name*"/>
        <div className="d-flex phone-number">
          <div className="country_adminmain">
            <div className="phone_int">
              {/* <PhoneInput
                country={"ke"}
                value={phoneCode}
                defaultCountry="US"
                onChange={setPhoneCode}
                style={data?.mobile_number === "no" ? styles.input : {}}
                required={data?.mobile_number === "yes"}
              /> */}
              <input
                type="tel"
                maxLength={10}
                required
                defaultValue={data.phone}
                onChange={onChangePhone}
                name="phone"
                className="form-control"
                placeholder="User phone number"/>
            </div>
          </div>

          {/* <div className="one_country_signup">
						<PhoneInput
							country={'ke'}
							value={phoneCode}
							defaultCountry="US"
							style={data?.mobile_number === 'no' ? styles.input : {}}
							required={data?.mobile_number === 'yes' ? true : false}
							placeholder="+254"
							onChange={setPhoneCode}/>
					</div>

					<input
						type="tel"
						required={data?.mobile_number === 'yes' ? true : false}
						style={data?.mobile_number === 'no' ? styles.input : {}}
						onChange={onChangePhone}
						maxLength={10}
						name="phone-number"
						placeholder="Phone Number"
						className="w-75 new_spin"/> */}
        </div>
        <input
          type="email"
          style={data?.email === "no" ? styles.input : {}}
          required={data?.email === "yes"}
          onChange={onChangeEmail}
          name="email"
          placeholder="Email*"/>
        <div className="pr password-wrap">
          <input
            type={passwordType}
            required={data?.password === "yes"}
            style={data?.password === "no" ? styles.input : {}}
            name="password"
            onChange={onChangePassword}
            placeholder="Password*"/>
          {passwordType === "password"
            ? <svg onClick={togglePassword} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
            </svg>
            : <svg onClick={togglePassword} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path
                d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/>
            </svg>
          }
        </div>
        <div className="pr password-wrap">
          <input
            type={passwordType2}
            required={data?.password === "yes"}
            style={data?.password === "no" ? styles.input : {}}
            name="password2"
            onChange={onChangePassword2}
            placeholder="Confirm Password*"/>
          {passwordType2 === "password"
            ? <svg onClick={togglePassword2} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
            </svg>
            : <svg onClick={togglePassword2} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path
                d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/>
            </svg>
          }
        </div>
        <div className="d-flex align-item-center">
          <input required type="checkbox" name="terms-and-conditions" id=""/>
          <p className="m-0 ms-2">I agree with
            <span className="forgot">
              <a data-route={"/terms-conditions"}>Terms and Conditions</a>
            </span>
          </p>
        </div>
        <button type={"submit"} className="btn btn-primary btn-block" disabled={loading}>
          {/* {loading && (<span className="spinner-border spinner-border-sm"></span>)} */}
          <span>Sign Up</span>
        </button>
      </form>
    );
  }
}

function VendorSignUpForm (props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    console.log("VendorSignUpForm", form);
  };

  return (
    <form onSubmit={handleSubmit}>Vendor SignUp Form</form>
  );
}

function SocialSignUp (props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    console.log("SocialSignUp", form);
  };

  return (
    <form onSubmit={handleSubmit}>Social SignUp</form>
  );
}

function SignupVerifyOtp (props) {
  const form = useRef();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const callSignup = () => {
    props.signup();
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const resendOtp = (e) => {
    e.preventDefault();

    const data = {};
    data.phone = props.phone;
    data.email = props.email;
    data.type = "register";
    setLoading(true);

    return DataService.forgotPassword(data).then(() => {
      setLoading(false);
      toast.success("OTP sent successfully!", { position: toast.POSITION.TOP_RIGHT });
    }).catch(error => {
      const resMessage = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    });
  };

  const navigateToNextPage = (e) => {
    e.preventDefault();

    const data = {};
    data.otp = otp;
    data.phone = props.phone;
    data.type = "register";

    return DataService.verifyUserOtp(data).then((data) => {
      setLoading(false);
      // send back to register...
      callSignup();
    }).catch((error) => {
      console.error(error);
      const resMessage = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    });
  };

  return (
    <>
      <div className="w-100 h-100 d-flex align-items-center justify-content-center flex-column p-5">
        <img src="../assets/img/logo/logomain.png" className="main_logo" alt="" srcSet=""/>
        <h4 className="text-center fw-bold">The verification code sent <br/>on ********{props.phone?.slice(-2)} </h4>
        <div className="pop d-flex align-items-center justify-content-center flex-column mt-3">
          <svg width="100" height="100" viewBox="0 0 145 151" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M130.106 31.7861C122.287 30.7321 113.574 24.8601 105.133 19.1831C94.9829 12.3411 85.1219 4.49414 73.0019 4.49414C61.4919 4.49414 51.0199 12.3411 40.8699 19.1831C32.4399 24.8601 23.7269 30.7321 15.8969 31.7861L7.67188 32.8961L7.92188 41.1701C8.05488 44.4221 11.0409 121.022 68.3339 146.317C68.3339 146.317 71.3439 147.504 72.7629 147.494H73.2179C74.6359 147.504 77.6459 146.317 77.6459 146.317C134.961 121.022 137.942 44.4221 138.081 41.1701L138.33 32.8961L130.106 31.7861Z"
              fill="white"/>
            <path
              d="M130.106 31.7861C122.287 30.7321 113.574 24.8601 105.133 19.1831C94.9829 12.3411 85.1219 4.49414 73.0019 4.49414C61.4919 4.49414 51.0199 12.3411 40.8699 19.1831C32.4399 24.8601 23.7269 30.7321 15.8969 31.7861L7.67188 32.8961L7.92188 41.1701C8.05488 44.4221 11.0409 121.022 68.3339 146.317C68.3339 146.317 71.3439 147.504 72.7629 147.494H73.2179C74.6359 147.504 77.6459 146.317 77.6459 146.317C134.961 121.022 137.942 44.4221 138.081 41.1701L138.33 32.8961L130.106 31.7861Z"
              stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path
              d="M48.5814 32.7743C42.1714 37.0863 35.5514 41.5484 29.6064 42.3534L23.3594 43.1923L23.5474 49.4844C23.6474 51.9543 25.9164 110.169 69.4584 129.398L69.7414 129.514C70.6884 130.03 71.7494 130.296 72.8264 130.29H73.1714C74.2484 130.296 75.3104 130.03 76.2564 129.514L76.5394 129.398C120.081 110.169 122.351 51.9543 122.45 49.4844L122.639 43.1923L116.391 42.3303C110.447 41.5264 103.826 37.0644 97.4174 32.7533C89.7034 27.5523 82.2114 21.6104 72.9994 21.6104C64.2534 21.6104 56.2954 27.5754 48.5814 32.7743Z"
              fill="#878AEB"/>
            <path
              d="M103.213 71.7364C103.213 88.4224 89.6871 101.948 73.0011 101.948C56.3151 101.948 42.7891 88.4224 42.7891 71.7364C42.7891 55.0504 56.3151 41.5244 73.0011 41.5244C89.6871 41.5244 103.213 55.0504 103.213 71.7364Z"
              fill="#2E3192"/>
            <path
              d="M62.75 65H77.375V61.75C77.375 60.3958 76.901 59.2448 75.9531 58.2969C75.0052 57.349 73.8542 56.875 72.5 56.875C71.1458 56.875 69.9948 57.349 69.0469 58.2969C68.099 59.2448 67.625 60.3958 67.625 61.75H64.375C64.375 59.5021 65.1675 57.5857 66.7524 56.0007C68.3362 54.4169 70.2521 53.625 72.5 53.625C74.7479 53.625 76.6643 54.4169 78.2493 56.0007C79.8331 57.5857 80.625 59.5021 80.625 61.75V65H82.25C83.1437 65 83.9091 65.318 84.5461 65.9539C85.182 66.5909 85.5 67.3562 85.5 68.25V84.5C85.5 85.3937 85.182 86.1591 84.5461 86.7961C83.9091 87.432 83.1437 87.75 82.25 87.75H62.75C61.8563 87.75 61.0914 87.432 60.4555 86.7961C59.8185 86.1591 59.5 85.3937 59.5 84.5V68.25C59.5 67.3562 59.8185 66.5909 60.4555 65.9539C61.0914 65.318 61.8563 65 62.75 65ZM72.5 79.625C73.3938 79.625 74.1591 79.307 74.7961 78.6711C75.432 78.0341 75.75 77.2687 75.75 76.375C75.75 75.4813 75.432 74.7159 74.7961 74.0789C74.1591 73.443 73.3938 73.125 72.5 73.125C71.6062 73.125 70.8414 73.443 70.2055 74.0789C69.5685 74.7159 69.25 75.4813 69.25 76.375C69.25 77.2687 69.5685 78.0341 70.2055 78.6711C70.8414 79.307 71.6062 79.625 72.5 79.625Z"
              fill="#F6F5FA"/>
          </svg>
          <form className="mt-3 w-100" onSubmit={navigateToNextPage} ref={form}>
            <h4 className="text-center fw-bold">Enter OTP</h4>
            <div className="d-flex flex-column gap-3">
              <input
                type="text"
                required
                onChange={handleOtpChange}
                name="otp"
                placeholder="Enter your otp"/>
              <button type="submit" className="btn btn-primary px-5" disabled={loading}>
                {loading && (
                  <div className="main_spinner">
                    <div className="spinner-border text-warning" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
                <span>Verify Otp</span>
              </button>
              <p className="text-center m-0"><Link onClick={resendOtp} className="send-otp">Resend OTP</Link></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

async function Register (props) {
  return (
    <>
      <Nav props={props}/>
      <div className="container">
        <main className="content">
          <h4> Create an account</h4>
          <UserSignUpForm/>
          <VendorSignUpForm/>
          <SocialSignUp/>
          <p>Already have an account?<a data-route={"/login"}>Login</a></p>
        </main>
      </div>
    </>
  );
}

export default Register;
