import { Nav } from '../../../components/nav/nav';
import { shippingSummary } from '../../../components/shippingSummary/shippingSummary';
import { Signup } from '../../../components/signup/signup';
import Check from "../../../assets/images/productpage/icons/check.svg";
import { orderCard } from '../../../components/orderCard/orderCard';
import { paymentOptions } from '../../../components/paymentOption/paymentOptions';
import Leftarrow from "../../../assets/images/productpage/icons/left-arrow.svg"
import { Footer } from '../../../components/footer/footer';

import './checkoutIpay.scss';

export function CheckoutIpay (props) {
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

