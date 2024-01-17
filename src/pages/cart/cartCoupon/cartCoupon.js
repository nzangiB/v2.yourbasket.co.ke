import { Nav } from '../../../components/Nav/Nav';
import { CouponCard } from '../../../components/cards/couponCard';
import { OrderSummary } from '../../../components/OrderSummary/OrderSummary';
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

