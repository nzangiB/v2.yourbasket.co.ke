import { Nav } from '../../../components/nav/Nav';
import { CartCard } from '../../../components/cards/cartCard';
import { OrderSummary } from '../../../components/orderSummary/OrderSummary';
import { Footer } from '../../../components/footer/Footer';
import { Signup } from '../../../components/signup/Signup';

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

