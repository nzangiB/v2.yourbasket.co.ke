import { Nav } from '../../../components/Nav/Nav';
import { ShippingSummary } from '../../../components/ShippingSummary/ShippingSummary';
import { Signup } from '../../../components/Signup/Signup';
import { CustomerAddress } from '../../../components/CustomerAddress/CustomerAddress';
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
                ${CustomerAddress()}
            </div>
            ${ShippingSummary()}
        </div>
      ${Signup()}
      ${Footer()}
    </div>
    `;
}

