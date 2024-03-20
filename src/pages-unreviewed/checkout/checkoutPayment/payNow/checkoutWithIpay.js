import { Nav } from "../../../../components/nav/nav";
import { ShippingSummary } from "../../../../components/shippingSummary/shippingSummary";
import { Signup } from "../../../../components/signup/signup";
import { PaymentOptions } from "../../../../components/paymentOptions/paymentOptions";
import { Footer } from "../../../../components/footer/footer";

import "./checkoutWithIpay.scss";

export function CheckoutWithIpay (props) {
  return `
    <div class="container productPage__container">
        ${Nav()}
        <div class="checkout__title">
            <h1>Place your order</h1>
        </div>
        <div class="checkout__content">
            <div class="bottom__content">
                ${PaymentOptions()}
            </div>
            ${ShippingSummary()}
        </div>
        
        ${Signup()}
        ${Footer()}
    </div>
  `;
}
