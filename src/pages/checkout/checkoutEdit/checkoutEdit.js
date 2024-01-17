import blueRight from "../../../assets/images/productpage/icons/blue-right.svg"
import greenCheck from "../../../assets/images/productpage/icons/green-check.svg"
import leftArrow from "../../../assets/images/productpage/icons/left-arrow.svg"

import { Nav } from '../../../components/Nav/Nav';
import { ShippingSummary } from '../../../components/ShippingSummary/ShippingSummary';
import { Signup } from '../../../components/Signup/Signup';
import { Footer } from '../../../components/Footer/Footer';


import './checkoutEdit.scss';

export function CheckoutEdit (props) {
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
                        <div class="orderCard__text paymentOptions__card-text">
                            <div class="check-text">
                                <img src="${greenCheck}" alt="check icon">
                                <h3>1. Customer Address</h3>
                            </div>
                            <div class="Edit">
                                <a href="#"><p>Edit</p></a>
                                <img src="${blueRight}">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="orderCard__container">
                    <div class="orderCard__item check-item edit__item">
                        <div class="orderCard__text paymentOptions__card-text">
                            <div class="check-text">
                                <img src="${greenCheck}" alt="check icon">
                                <h3>2. Delivery Details</h3>
                            </div>
                            <div class="Edit">
                                <a href="#"><p>Edit</p></a>
                                <img src="${blueRight}">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="orderCard__container">
                    <div class="orderCard__item check-item edit__item">
                        <div class="orderCard__text paymentOptions__card-text">
                            <div class="check-text">
                                <img src="${greenCheck}" alt="check icon">
                                <h3>3. Payment Option</h3>
                            </div>
                            <div class="Edit">
                                <a href="#"><p>Edit</p></a>
                                <img src="${blueRight}">
                            </div>
                        </div>
                    </div>
                    <button class="bottom__button1"><span><img src="${leftArrow}"></span>Back to shopping</button>
                </div>
                
            </div>
            ${ShippingSummary()}
        </div>
      ${Signup()}
      ${Footer()}
    </div>
    `;
}

