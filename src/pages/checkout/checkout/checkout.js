import { Nav } from "../../../components/nav/nav";
import { ShippingSummary } from "../../../components/shippingSummary/shippingSummary";
import { Signup } from "../../../components/signup/signup";
import { OrderCard } from "../../../components/orderCard/orderCard";
import { Footer } from "../../../components/footer/footer";

import "./checkout.scss";

export function Checkout (props) {
  return `
    <div class="container productPage__container">
      ${Nav()}
      <div class="checkout__title">
            <h1>Place your order</h1>
        </div>
        <div class="checkout__content">
            <div>
                ${OrderCard()}
                ${OrderCard()}
                ${OrderCard()}
            </div>
            ${ShippingSummary()}
        </div>
      ${Signup()}
      ${Footer()}
    </div>
  `;
}
