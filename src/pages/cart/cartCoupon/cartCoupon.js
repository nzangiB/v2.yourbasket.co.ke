import { Nav } from '../../../components/Nav/Nav';
import { couponCard } from '../../../components/Cards/CouponCard';
import { orderSummary } from '../../../components/OrderSummary/OrderSummary';
import { Signup } from '../../../components/Signup/Signup';
import { Footer } from '../../../components/Footer/Footer';

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

