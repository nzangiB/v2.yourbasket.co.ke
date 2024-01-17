import { Nav } from '../../../components/Nav/Nav';
import { ShippingSummary } from '../../../components/ShippingSummary/ShippingSummary';
import { Signup } from '../../../components/Signup/Signup';
import { OrderCard } from '../../../components/OrderCard/OrderCard';
import { Footer } from '../../../components/Footer/Footer';

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
                ${OrderCard()}
                ${OrderCard()}
                ${OrderCard()}
            </div>
            ${ShippingSummary()}
        </div>
      ${Signup()}
      ${Footer()}
    </div>
    `;
}

