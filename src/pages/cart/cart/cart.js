import { Nav } from '../../../components/Nav/Nav';
import { cartCard } from '../../../components/Cards/CartCard';
import { orderSummary } from '../../../components/OrderSummary/OrderSummary';
import { Footer } from '../../../components/Footer/Footer';
import { Signup } from '../../../components/Signup/Signup';

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

