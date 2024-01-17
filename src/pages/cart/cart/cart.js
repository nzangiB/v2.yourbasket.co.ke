import { Nav } from '../../../components/Nav/Nav';
import { CartCard } from '../../../components/cards/cartCard';
import { OrderSummary } from '../../../components/OrderSummary/OrderSummary';
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

