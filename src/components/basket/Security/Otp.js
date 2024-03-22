import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DataService from "../../../services/data.service";
import AuthService from "../../../services/auth.service";

function OTP ({ otpVerifiedEvent }) {
  const [loading, setLoading] = useState(false);

  const auth = AuthService.getCurrentUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const otp = formData.get("otp");

    const data = { otp };
    await DataService.verifyOtp(data).then(() => {
      return otpVerifiedEvent();
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    });

    setLoading(false);
  };

  const resendOTP = (e) => {
    e.preventDefault();

    const button = e.target;
    button.disabled = true;
    button.innerHTML = `<span>Resending...</span>`;

    return DataService.sendOtp({ apikey: "yourbasket2023" }).then(() => {
      toast.success("OTP sent successfully!", { position: toast.POSITION.TOP_RIGHT });
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    }).finally(() => {
      button.disabled = false;
      button.innerHTML = `<span>Resend</span>`;
    });
  };

  return (
    <>
      <ToastContainer/>
      <section className={"otp-form"}>
        <div className={"form-container"}>
          <form className="form" onSubmit={handleSubmit}>
            <header>
              <h3 className="title">Enter OTP</h3>
              <h4>The verification code sent <br/>to +{auth.phone?.slice(0, 3)}******{auth.phone?.slice(-3)}</h4>
            </header>
            <section>
              <div className={"input-field"}>
                <input className={"input"} type="text" required name="otp" placeholder="Enter your OTP"/>
              </div>
            </section>
            <footer>
              <button className="btn --primary" type="submit" disabled={loading}>
                <span>{loading ? "Verifying..." : "Verify OTP"}</span>
              </button>
            </footer>
          </form>

          <p>
            <button className="btn" type={"button"} onClick={resendOTP}>
              <span>Resend OTP</span>
            </button>
          </p>
        </div>
      </section>
    </>
  );
}

export default OTP;
