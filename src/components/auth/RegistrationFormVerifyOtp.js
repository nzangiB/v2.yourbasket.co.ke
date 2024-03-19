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

        <object className={"icon"} data={require("./icons/otp.svg")} name={"OTP"}/>

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
