import { toast } from "../../plugins/react-toastify";

import DataService from "../../services/data.service";
import AuthService from "../../services/auth.service";

function Otp ({ otpVerifiedEvent }) {
  const auth = AuthService.getCurrentUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const otp = formData.get("otp");

    const data = {};
    data.otp = otp;

    return DataService.verifyOtp(data).then(() => {
      return otpVerifiedEvent();
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    });
  };

  const resendOtp = (e) => {
    e.preventDefault();

    const button = e.target;
    button.disabled = true;
    button.innerHTML = "Resending...";

    return DataService.sendOtp({ apikey: "yourbasket2023" }).then(() => {
      toast.success("Otp sent successfully!", { position: toast.POSITION.TOP_RIGHT });
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    }).finally(() => {
      button.disabled = false;
      button.innerHTML = "Resend";
    });
  };

  const handleSubmitClick = (e) => {
    e.target.replaceChildren(
      <span>Verifying...</span>
    );
  };

  return (
    <>
      <section className={"otp-form"}>
        <div className={"form-container"}>
          {/*    <object */}
          {/*      style={{ width: "72px", height: "72px" }} */}
          {/*      data={require("../auth/icons/otp.svg")} */}
          {/*      name={"OTP"} */}
          {/*    /> */}

          <form className="form" onSubmit={handleSubmit}>
            <header>
              <h3 className="title">Enter OTP</h3>
              <h4>The verification code sent <br/>to +{auth.phone?.slice(0, 3)}******{auth.phone?.slice(-3)}</h4>
            </header>
            <section>
              <div className={"input-field"}>
                <input type="text" required name="otp" placeholder="Enter your otp" className={"input"}/>
              </div>
            </section>
            <footer>
              <button type="submit" onClick={handleSubmitClick} className="btn --primary">
                <span>Verify Otp</span>
              </button>
            </footer>
          </form>

          <p>
            <button type={"button"} onClick={resendOtp} className="btn">
              <span>Resend OTP</span>
            </button>
          </p>
        </div>
      </section>
    </>
  );
}

export default Otp;
