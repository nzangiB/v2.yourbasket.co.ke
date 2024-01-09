import { Nav } from '../../../components/Nav/Nav';
import { shippingSummary } from '../../../components/ShippingSummary/ShippingSummary';
import { Signup } from '../../../components/Signup/Signup';
import { orderCard } from '../../../components/OrderCard/OrderCard';
import { customerAddress } from '../../../components/customerAddress/customerAddress';
import { Footer } from '../../../components/Footer/Footer';

import './checkoutAddress.scss';

export function CheckoutAddress (props) {
    return `
    <div class="container productPage__container">
      ${Nav()}
      <div class="checkout__title">
            <h1>Place your order</h1>
        </div>
        <div class="checkout__content">
            <div>
                ${customerAddress()}
            </div>
            ${shippingSummary()}
        </div>
      ${Signup()}
      ${Footer()}
    </div>
    `;
}

