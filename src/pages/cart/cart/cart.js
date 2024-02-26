import { Nav } from "../../../components/nav/nav";
import { CartCard } from "../../../components/cards/cartCard";
import { OrderSummary } from "../../../components/orderSummary/orderSummary";
import { Footer } from "../../../components/footer/footer";
import { Signup } from "../../../components/signup/signup";

import "./cart.scss";

export function Cart (props) {
  return `
    <div class="container">
        ${Nav()}
        <div class="cart__title">
            <h1>Shopping Cart <span>(2 items)</span></h1>
        </div>
        <div class="cart__content">
            <div>
                ${CartCard()}
                ${CartCard()}
                ${CartCard()}
            </div>
            ${OrderSummary()}
        </div>
        ${Signup()}
        ${Footer()}
    </div>
  `;
}
