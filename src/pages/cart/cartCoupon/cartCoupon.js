import { Nav } from "../../../components/nav/nav";
import { CouponCard } from "../../../components/cards/couponCard";
import { OrderSummary } from "../../../components/orderSummary/orderSummary";
import { Signup } from "../../../components/signup/signup";
import { Footer } from "../../../components/footer/footer";

import "./cartCoupon.scss";

export function CartCoupon (props) {
  return `
    <div class="container">
        ${Nav()}
        <div class="cart__title">
            <h1>Shopping Cart (2 items)</h1>
        </div>
        <div class="cart__content">
            <div>
                ${CouponCard()}
                ${CouponCard()}
                ${CouponCard()}
            </div>
            ${OrderSummary()}
        </div>
        ${Signup()}
        ${Footer()}
    </div>
  `;
}
