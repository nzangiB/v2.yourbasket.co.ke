import email from "../../assets/images/emails.svg";
import logo from "../../assets/images/logo.svg";
import android from "../../assets/images/android.svg";
import ios from "../../assets/images/ios.svg";
import creditCard from "../../assets/images/credit-card.svg";

import "./Signup.scss";

export function Signup (props) {
  return `
    <div class="signup__container">

        <div class="signup__field">
            <div class="field__text"> 
                <h3>DEALS JUST FOR YOU</h3>
                <p>Sign up to receive exclusive offers in your inbox.</p>
                <div class="field__input">
                    <form action="#" method="post">
                        <input type="email" id="email" name="email" placeholder="Enter your email address" required>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>

            <div class="field__image">
                <img src="${email}" alt="email illustration">
            </div>
        </div>


        <div class="signup__links">
            <div class="links__content_container"> 
                <div class="links__content">
                    <div class="links__image">
                        <img src="${logo}" alt="company logo">
                    </div>
                    <div class="link__text">
                        <h3>SHOP ON THE GO</h3>
                        <p>Get access to exclusive offers!</p>
                    </div>
                </div>
                <div class="links__images">
                    <img src="${android}" alt="android download logo">
                    <img src="${ios}" alt="ios download logo">
                </div>
            </div>

            <div class="links__image">
                <img src="${creditCard}" alt="credit card illustration">
            </div>
        </div>

    </div>
    `;
}
