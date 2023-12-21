import { Nav } from '../../../components/nav/nav';
import { shippingSummary } from '../../../components/shippingSummary/shippingSummary';
import { Signup } from '../../../components/signup/signup';
import { orderCard } from '../../../components/orderCard/orderCard';
import { Footer } from '../../../components/footer/footer';
import Blueright from "../../../assets/images/productpage/icons/blue-right.svg"
import Greencheck from "../../../assets/images/productpage/icons/green_check.svg"
import Leftarrow from "../../../assets/images/productpage/icons/left-arrow.svg"


import './checkoutDisabled.scss';

export function checkoutDisabled (props) {
    return `
    <div class="container productPage__container">
      ${Nav()}
      <div class="checkout__title">
            <h1>Place your order</h1>
        </div>
        <div class="checkout__content">
            <div>
                
                <div class="orderCard__container">
                    <div class="orderCard__item check-item edit__item">
                        <div class="orderCard__text paymentOptions__cardtext">
                            <div class="check-text">
                                <img src="${Greencheck}" alt="check icon">
                                <h3>1. Customer Address</h3>
                            </div>
                            <div class="Edit">
                                <a href="#"><p>Edit</p></a>
                                <img src="${Blueright}">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="orderCard__container">
                    <div class="orderCard__item check-item edit__item">
                        <div class="orderCard__text paymentOptions__cardtext">
                            <div class="check-text">
                                <img src="${Greencheck}" alt="check icon">
                                <h3>2. Delivery Details</h3>
                            </div>
                            <div class="Edit">
                                <a href="#"><p>Edit</p></a>
                                <img src="${Blueright}">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="orderCard__container">
                    <div class="orderCard__item check-item edit__item">
                        <div class="orderCard__text paymentOptions__cardtext">
                            <div class="check-text">
                                <img src="${Greencheck}" alt="check icon">
                                <h3>3. Payment Option</h3>
                            </div>
                            <div class="Edit">
                                <a href="#"><p>Edit</p></a>
                                <img src="${Blueright}">
                            </div>
                        </div>
                    </div>
                    <button class="bottom__button1"><span><img src="${Leftarrow}"></span>Back to shopping</button>
                </div>
                
            </div>
            ${shippingSummary()}
        </div>
      ${Signup()}
      ${Footer()}
    </div>
    `;
}

