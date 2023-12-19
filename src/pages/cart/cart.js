import { Nav } from '../../components/nav/nav';
import { cartCard } from '../../components/cartCard/cartCard';
import { orderSummary } from '../../components/orderSummary/orderSummary';
import { Footer } from '../../components/footer/footer';
import { Signup } from '../../components/signup/signup';

import './cart.scss';

export function Cart (props) {
    return `
    <div class="container">
        ${Nav()}
        <div class="cart__title">
            <h1>Shopping Cart (2 items)</h1>
        </div>
        <div class="cart__content">
            <div>
                ${cartCard()}
                ${cartCard()}
                ${cartCard()}
            </div>
            ${orderSummary()}
        </div>
        ${Signup()}
        ${Footer()}
    </div>
    `;
}

