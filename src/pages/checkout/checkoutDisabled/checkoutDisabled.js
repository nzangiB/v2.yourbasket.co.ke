import { Nav } from '../../../components/nav/nav';
import { shippingSummary } from '../../../components/shippingSummary/shippingSummary';
import { Signup } from '../../../components/signup/signup';
import { Footer } from '../../../components/footer/footer';
import Blueright from "../../../assets/images/productpage/icons/blue-right.svg"
import Greencheck from "../../../assets/images/productpage/icons/green_check.svg"
import Leftarrow from "../../../assets/images/productpage/icons/left-arrow.svg"
import GrayTick from "../../../assets/images/productpage/icons/Tick Square Disabled.svg"


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
            <div class="container">
                <div class="orderSummary__container">
                    <div class="summary__top">

                        <div class="summary__title">
                            <h1>Order Summary</h1>
                            <div class="summary__input">
                                <input type="number" id="codeInput" placeholder="Apply coupon code" required>
                                <button id="applyButton">Apply</button>
                            </div>
                        </div>
                        
                        <div class="summary__text">
                            <div class="summary__subtotal">
                                <h3>Subtotal(3 items)</h3>
                                <h3>KSH 77,997</h3>
                            </div>

                            <div class="summary__subtotal">
                                <h3>Delivery Fees</h3>
                                <h3>KSH 500</h3>
                            </div>

                        </div>
                    </div>

                    <div class="summary__bottom">
                        <div class="bottom__price">
                            <p>Total (Inclusive of VAT)</p>
                            <p>KSH 77,997.00</p>
                        </div>
                        
                        <div class="bottom__button">
                            <button>CHECKOUT</button>
                        </div>
                    </div>

                    <div class="shipping__terms">
                        <p>By continuing, you are automatically accepting the <a href="#">Terms & Conditions</a></p>
                        <div class="shipping__text">
                            <img src="${GrayTick}" alt="">
                            <p>Subscribe for exclusive e-mail offers and discounts.</p>
                        </div>
                    </div>
                </div> 
            </div>    
        </div>
      ${Signup()}
      ${Footer()}
    </div>
    `;
}

