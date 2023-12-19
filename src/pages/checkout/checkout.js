import { Nav } from '../../components/nav/nav';
import { orderSummary } from '../../components/orderSummary/orderSummary';
import { Signup } from '../../components/signup/signup';
import { Footer } from '../../components/footer/footer';

import './checkout.scss';

export function Checkout (props) {
    return `
    <div class="container productPage__container">
      ${Nav()}
      ${orderSummary()}
      ${Signup()}
      ${Footer()}
    </div>
    `;
}

