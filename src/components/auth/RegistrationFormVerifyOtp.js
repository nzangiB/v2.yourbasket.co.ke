import { toast } from "../../plugins/react-toastify";
import DataService from "../../services/data.service";
import AuthService from "../../services/auth.service";
import HelperService from "../../services/helper.service";

export function RegistrationFormVerifyOtp (props) {
  let unregisteredUser = localStorage.getItem("user-unregistered");
  unregisteredUser = unregisteredUser ? JSON.parse(unregisteredUser) : undefined;
  if (!unregisteredUser) toast.error("There's an issue with your registration", { position: toast.POSITION.TOP_RIGHT });

  const resendOtp = (e) => {
    e.preventDefault();

    const button = e.target;
    button.disabled = true;
    button.innerHTML = "Resending...";

    const data = {};
    data.phone = unregisteredUser.phone;
    data.email = unregisteredUser.email;
    data.type = "register";

    // TODO: Rewrite this to DataService.sendUserOtp(data)
    return DataService.forgotPassword(data).then(() => {
      button.disabled = false;
      toast.success("OTP sent successfully!", { position: toast.POSITION.TOP_RIGHT });
    }).catch(error => {
      console.error(error);
      const resMessage = error.response?.data?.msg || error.msg || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    }).finally(() => {
      button.disabled = false;
      button.innerHTML = "Resend";
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    console.log("RegistrationFormVerifyOtp", form);
    const formData = new FormData(form);

    // button
    const button = form.querySelector("button");
    button.disabled = true;

    const data = {};
    data.otp = formData.get("otp");
    data.phone = unregisteredUser.phone; // get this from local storage
    data.type = "register";

    try {
      await DataService.verifyUserOtp(data);
      toast.success("Your phone has been verified successfully!", { position: toast.POSITION.TOP_RIGHT });

      const user = await AuthService.register(unregisteredUser);
      console.log(user);
      if (!user) return;
      toast.success("Your account has been created successfully!", { position: toast.POSITION.TOP_RIGHT });

      const { email, password } = unregisteredUser;
      await AuthService.login(email, password).then(async () => {
        const carts = HelperService.getLocalCart();
        await Promise.all(carts.map(async (value, i) => {
          await DataService.addCart(value);
        }));
        HelperService.emptyLocalCart();

        // send back to register...
        location.href = "/";
        // location.href = "https://www.yourbasket.co.ke/#/profile";
      });
    } catch (error) {
      console.error(error);
      const resMessage = error.response?.data?.msg || error.msg || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      button.disabled = false;
      button.innerHTML = "Verify OTP";
    }
  };

  const handleSubmitClick = (e) => {
    e.target.replaceChildren(
      <span>Verifying...</span>
    );
  };

  return (
    <section className={"signup-verify-otp-form"}>
      <div className={"form-container"}>
        <header>
          <h4 className={"title"}> Create an account</h4>
        </header>
        {/* <svg width="100" height="100" viewBox="0 0 145 151" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
        {/*  <path */}
        {/*    d="M130.106 31.7861C122.287 30.7321 113.574 24.8601 105.133 19.1831C94.9829 12.3411 85.1219 4.49414 73.0019 4.49414C61.4919 4.49414 51.0199 12.3411 40.8699 19.1831C32.4399 24.8601 23.7269 30.7321 15.8969 31.7861L7.67188 32.8961L7.92188 41.1701C8.05488 44.4221 11.0409 121.022 68.3339 146.317C68.3339 146.317 71.3439 147.504 72.7629 147.494H73.2179C74.6359 147.504 77.6459 146.317 77.6459 146.317C134.961 121.022 137.942 44.4221 138.081 41.1701L138.33 32.8961L130.106 31.7861Z" */}
        {/*    fill="white"/> */}
        {/*  <path */}
        {/*    d="M130.106 31.7861C122.287 30.7321 113.574 24.8601 105.133 19.1831C94.9829 12.3411 85.1219 4.49414 73.0019 4.49414C61.4919 4.49414 51.0199 12.3411 40.8699 19.1831C32.4399 24.8601 23.7269 30.7321 15.8969 31.7861L7.67188 32.8961L7.92188 41.1701C8.05488 44.4221 11.0409 121.022 68.3339 146.317C68.3339 146.317 71.3439 147.504 72.7629 147.494H73.2179C74.6359 147.504 77.6459 146.317 77.6459 146.317C134.961 121.022 137.942 44.4221 138.081 41.1701L138.33 32.8961L130.106 31.7861Z" */}
        {/*    stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> */}
        {/*  <path */}
        {/*    d="M48.5814 32.7743C42.1714 37.0863 35.5514 41.5484 29.6064 42.3534L23.3594 43.1923L23.5474 49.4844C23.6474 51.9543 25.9164 110.169 69.4584 129.398L69.7414 129.514C70.6884 130.03 71.7494 130.296 72.8264 130.29H73.1714C74.2484 130.296 75.3104 130.03 76.2564 129.514L76.5394 129.398C120.081 110.169 122.351 51.9543 122.45 49.4844L122.639 43.1923L116.391 42.3303C110.447 41.5264 103.826 37.0644 97.4174 32.7533C89.7034 27.5523 82.2114 21.6104 72.9994 21.6104C64.2534 21.6104 56.2954 27.5754 48.5814 32.7743Z" */}
        {/*    fill="#878AEB"/> */}
        {/*  <path */}
        {/*    d="M103.213 71.7364C103.213 88.4224 89.6871 101.948 73.0011 101.948C56.3151 101.948 42.7891 88.4224 42.7891 71.7364C42.7891 55.0504 56.3151 41.5244 73.0011 41.5244C89.6871 41.5244 103.213 55.0504 103.213 71.7364Z" */}
        {/*    fill="#2E3192"/> */}
        {/*  <path */}
        {/*    d="M62.75 65H77.375V61.75C77.375 60.3958 76.901 59.2448 75.9531 58.2969C75.0052 57.349 73.8542 56.875 72.5 56.875C71.1458 56.875 69.9948 57.349 69.0469 58.2969C68.099 59.2448 67.625 60.3958 67.625 61.75H64.375C64.375 59.5021 65.1675 57.5857 66.7524 56.0007C68.3362 54.4169 70.2521 53.625 72.5 53.625C74.7479 53.625 76.6643 54.4169 78.2493 56.0007C79.8331 57.5857 80.625 59.5021 80.625 61.75V65H82.25C83.1437 65 83.9091 65.318 84.5461 65.9539C85.182 66.5909 85.5 67.3562 85.5 68.25V84.5C85.5 85.3937 85.182 86.1591 84.5461 86.7961C83.9091 87.432 83.1437 87.75 82.25 87.75H62.75C61.8563 87.75 61.0914 87.432 60.4555 86.7961C59.8185 86.1591 59.5 85.3937 59.5 84.5V68.25C59.5 67.3562 59.8185 66.5909 60.4555 65.9539C61.0914 65.318 61.8563 65 62.75 65ZM72.5 79.625C73.3938 79.625 74.1591 79.307 74.7961 78.6711C75.432 78.0341 75.75 77.2687 75.75 76.375C75.75 75.4813 75.432 74.7159 74.7961 74.0789C74.1591 73.443 73.3938 73.125 72.5 73.125C71.6062 73.125 70.8414 73.443 70.2055 74.0789C69.5685 74.7159 69.25 75.4813 69.25 76.375C69.25 77.2687 69.5685 78.0341 70.2055 78.6711C70.8414 79.307 71.6062 79.625 72.5 79.625Z" */}
        {/*    fill="#F6F5FA"/> */}
        {/* </svg> */}

        <form className={"form"} onSubmit={handleSubmit}>
          <header>
            <h3 className="title">Enter OTP</h3>
            <h4 style={{ textAlign: "center" }}>
							The verification code sent <br/>to
							+{unregisteredUser.phone?.slice(0, 6)}***{unregisteredUser.phone?.slice(-3)}
            </h4>
          </header>
          <section>
            <div className={"input-field"}>
              <input
                type="text"
                required
                name="otp"
                placeholder="Enter your OTP"
                className={"input"}
              />
            </div>
          </section>
          <footer>
            <button type="submit" onClick={handleSubmitClick} className="btn --primary">
              <span>Verify OTP</span>
            </button>
          </footer>
        </form>

        <p style={{ textAlign: "center" }}>
          <button onClick={resendOtp} className="btn">Resend OTP</button>
        </p>
      </div>
    </section>
  );
}
