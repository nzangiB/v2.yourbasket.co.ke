import { Nav } from '../../components/nav/nav';
import { couponCard } from '../../components/cartCard/couponCard';
import { orderSummary } from '../../components/orderSummary/orderSummary';
import { Signup } from '../../components/signup/signup';
import { Footer } from '../../components/footer/footer';

import './cartCoupon.scss';

export function CartCoupon (props) {
    return `
    <div class="container">
        ${Nav()}
        <div class="cart__title">
            <h1>Shopping Cart (2 items)</h1>
        </div>
        <div class="cart__content">
            <div>
                ${couponCard()}
                ${couponCard()}
                ${couponCard()}
            </div>
            ${orderSummary()}
        </div>
        ${Signup()}
        ${Footer()}
    </div>
    `;
}

