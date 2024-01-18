import greenCheck from "../../../../assets/images/product-page/icons/green-check.svg"
import mPesa from "../../../../assets/images/product-page/icons/m-pesa.svg"
import blueRight from "../../../../assets/images/product-page/icons/blue-right.svg"
import leftArrow from "../../../../assets/images/product-page/icons/left-arrow.svg"

import { Nav } from '../../../../components/nav/nav';
import { ShippingSummary } from '../../../../components/shippingSummary/shippingSummary';
import { Signup } from '../../../../components/signup/signup';
import { Footer } from '../../../../components/footer/footer';

import './checkoutPayPartial.scss';

export function CheckoutPayPartial (props) {
    return `
            <div class="container productPage__container">
            ${Nav()}
            <div class="checkout__title">
                <h1>Place your order</h1>
            </div>
            <div class="checkout__content">
                <div class="bottom__content">
                <div class="orderCard__container">
                <div class="orderCard__item check-item">
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
                <div class="orderCard__item check-item">
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
        
        
            <div class="paymentOptions">
        
                <div class="orderCard__text payment__title">
                    <img src="${greenCheck}" alt="check icon">
                    <h3>3. Payment Option</h3>
                </div>
        
                <div class="paymentOptions__container">
                    <div class="paymentOptions__title">
                        <h3>How do you want to pay?</h3>
                    </div>
        
                    <div class="paymentOptions__inputs">
                        <div class="inputs__container-1">
                            <div class="inputs__item">
                                <label for="IpayRadio">
                                    <input id="IpayRadio" type="radio" name="Payment" value="Pay now with Ipay">
                                    Pay now with Ipay
                                </label>
                            </div>
        
                            <div class="inputs__item">
                                <label for="MpesaRadio">
                                    <input id="MpesaRadio" type="radio" name="Payment" value="Pay now with Mpesa">
                                    Pay now with Mpesa
                                </label>
                            </div>
        
                            <div class="inputs__item">
                                <label for="MpesaDeliveryRadio">
                                    <input id="MpesaDeliveryRadio" type="radio" name="Payment" value="Pay on Delivery with Mpesa">
                                    Pay delivery with Mpesa
                                </label>
                            </div>
                        </div>
        
                        <div class="inputs__container-2">
                            <div class="inputs__item">
                                <label for="PartialRadio">
                                    <input id="PartialRadio" type="radio" name="Payment" value="Partial Payment">
                                    Partial Payment
                                </label>
                            </div>
        
                            <div class="inputs__item">
                                <label for="Paylater">
                                    <input id="Paylater" type="radio" name="Payment" value="Buy now, Pay Later">
                                    Buy now, Pay Later
                                </label>
                            </div>
                        </div>
        
                    </div>  
                </div>
                <div class="paymentOptions__type">
                    <div class="type__title">
                        <h3>Pay Partially, Finalize on Delivery or Pickup<h3>
                    </div>
                    <div class="type__content">
                        <h3>Pay now using MPESA.</h3>
                        <p>
                            Begin with a 30% down payment at KSH 23,400.
                            Finalize your payment of 54,597 upon receiving your order.
                        </p>
                        <div class="type__content-container">
                            <div></div>
                            <div class="type__icons">
                                <p>We accept:</p>
                                <img src="${mPesa}" alt="mpesa logo">
                            </div>
                        </div>
                    </div>                
                        
                    <button>
                        CONFIRM PAYMENT METHOD
                    </button>
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

