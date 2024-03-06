import email from "../../assets/images/emails.svg";
import logo from "../../assets/images/logo.svg";
import android from "../../assets/images/android.svg";
import ios from "../../assets/images/ios.svg";
import creditCard from "../../assets/images/credit-card.svg";

import "./signup.scss";

export function Signup (props) {
  return (
    <div className="signup__container">
      <div className="signup__field">
        <div className="field__text">
          <h3>DEALS JUST FOR YOU</h3>
          <p>Sign up to receive exclusive offers in your inbox.</p>
          <div className="field__input">
            <form action="#" method="post">
              <input type="email" id="email" name="email" placeholder="Enter your email address" required/>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>

        <div className="field__image">
          <img src={email} alt="email illustration"/>
        </div>
      </div>

      <div className="signup__links">
        <div className="links__content_container">
          <div className="links__content">
            <div className="links__image">
              <img src={logo} alt="company logo"/>
            </div>
            <div className="link__text">
              <h3>SHOP ON THE GO</h3>
              <p>Get access to exclusive offers!</p>
            </div>
          </div>
          <div className="links__images">
            <img src={android} alt="android download logo"/>
            <img src={ios} alt="ios download logo"/>
          </div>
        </div>

        <div className="links__image">
          <img src={creditCard} alt="credit card illustration"/>
        </div>
      </div>
    </div>
  );
}
