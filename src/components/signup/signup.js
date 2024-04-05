import DataService from "../../services/data.service";
import AuthService from "../../services/auth.service";

import { toast } from "../../plugins/react-toastify";

import email from "../../assets/images/emails.svg";
import logo from "../../assets/images/logo.svg";
import android from "../../assets/images/android.svg";
import ios from "../../assets/images/ios.svg";
import creditCard from "../../assets/images/credit-card.svg";

import "./signup.scss";

export function Signup (props) {
  const auth = AuthService.getCurrentUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const gender = formData.get("gender");

    const data = { email, gender };
    DataService.addNewsletter(data).then(() => {
      toast.success("Form Submitted Successfully!!", { position: toast.POSITION.TOP_RIGHT });
      form.reset();
    }).catch((error) => {
      console.error(error);
      const resMessage = error.response?.data?.msg || error.msg || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    });
  };

  return (
    <div className="signup__container">
      <section className="signup__field">
        <div className="field__text">
          <h3>DEALS JUST FOR YOU</h3>
          <p>Sign up to receive exclusive offers in your inbox.</p>
          <div className="field__input">
            <form method="post" onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                name="email"
                value={auth?.email || ""}
                placeholder="Enter your email address"
                required
              />

              <select id="gender" name="gender" required>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div className="field__image">
          <img src={email} alt="email illustration"/>
        </div>
      </section>

      <section className="signup__links">
        <div className="link__text">
          <div>
            <img className="img" src={logo} alt="company logo"/>
          </div>
          <div>
            <h3 className="title">SHOP ON THE GO</h3>
            <p className="text">Get access to exclusive offers!</p>
            <div className="btn-group">
              <button className="btn">
                <img src={android} alt="android download logo"/>
              </button>
              <button className="btn">
                <img src={ios} alt="ios download logo"/>
              </button>
            </div>
          </div>
        </div>

        <div className="links__image">
          <img src={creditCard} alt="credit card illustration"/>
        </div>
      </section>
    </div>
  );
}
