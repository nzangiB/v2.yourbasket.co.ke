import { Nav } from '../../../components/nav/nav';
import { shippingSummary } from '../../../components/shippingSummary/shippingSummary';
import { Signup } from '../../../components/signup/signup';
import { orderCard } from '../../../components/orderCard/orderCard';
import { Footer } from '../../../components/footer/footer';

import './checkout.scss';

export function Checkout (props) {
    return `
    <div class="container productPage__container">
      ${Nav()}
      <div class="checkout__title">
            <h1>Place your order</h1>
        </div>
        <div class="checkout__content">
            <div>
                ${orderCard()}
                ${orderCard()}
                ${orderCard()}
            </div>
            ${shippingSummary()}
        </div>
      ${Signup()}
      ${Footer()}
    </div>
    `;
}

