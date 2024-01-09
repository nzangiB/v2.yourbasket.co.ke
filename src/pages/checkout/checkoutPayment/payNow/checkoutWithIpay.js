import { Nav } from '../../../../components/Nav/Nav';
import { shippingSummary } from '../../../../components/ShippingSummary/ShippingSummary';
import { Signup } from '../../../../components/Signup/Signup';
import Check from "../../../../assets/images/productpage/icons/check.svg";
import { orderCard } from '../../../../components/OrderCard/OrderCard';
import { paymentOptions } from '../../../../components/PaymentOptions/PaymentOptions';
import Leftarrow from "../../../../assets/images/productpage/icons/left-arrow.svg"
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
                    ${paymentOptions()}
                </div>
                ${shippingSummary()}
            </div>
            
            ${Signup()}
            ${Footer()}
        </div>
    `;
}

