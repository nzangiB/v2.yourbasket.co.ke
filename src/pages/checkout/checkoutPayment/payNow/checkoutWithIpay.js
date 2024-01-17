import { Nav } from '../../../../components/Nav/Nav';
import { ShippingSummary } from '../../../../components/ShippingSummary/ShippingSummary';
import { Signup } from '../../../../components/Signup/Signup';
import { PaymentOptions } from '../../../../components/paymentOptions/paymentOptions';
import { Footer } from '../../../../components/Footer/Footer';

import './checkoutWithIpay.scss';

export function CheckoutWithIpay (props) {
    return `
            <div class="container productPage__container">
            ${Nav()}
            <div class="checkout__title">
                <h1>Place your order</h1>
            </div>
            <div class="checkout__content">
                <div class="bottom__content">
                    ${PaymentOptions()}
                </div>
                ${ShippingSummary()}
            </div>
            
            ${Signup()}
            ${Footer()}
        </div>
    `;
}

