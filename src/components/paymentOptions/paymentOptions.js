import greenCheck from "../../assets/images/productpage/icons/green-check.svg"
import mastercard from "../../assets/images/productpage/icons/mastercard.svg"
import airtel from "../../assets/images/productpage/icons/artboard.svg"
import mPesa from "../../assets/images/productpage/icons/m-pesa.svg"
import visa from "../../assets/images/productpage/icons/visa-logo.svg"
import blueRight from "../../assets/images/productpage/icons/blue-right.svg"
import leftArrow from "../../assets/images/productpage/icons/left-arrow.svg"

import "./paymentOptions.scss";

export function PaymentOptions (props) {
  return `
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
                <h3>Pay with iPay<h3>
            </div>
            <div class="type__content">
                <h3>We accept all major cards</h3>
                <p class="content__para">
                    You will be redirected to the iPay
                    platform to complete your purchase.
                    Ensure your payment information is
                    up to date and that you have the 
                    necessary funds. Please note transaction
                    costs apply.
                </p>
                <div class="type__content-container">
                    <h3 class="africa__link">Powered by <a href="#">iPay Africa</a></h3>

                    <div class="type__icons">
                        <p>We accept:</p>
                        <img src="${visa}" alt="visa logo">
                        <img src="${mastercard}" alt="Mastercard logo">
                        <img src="${mPesa}" alt="mpesa logo">
                        <img src="${airtel}" alt="airtel logo">
                    </div>
                </div>
            </div>                
                
            <button>
                CONFIRM PAYMENT METHOD
            </button>
        </div>
        <button class="bottom__button1"><span><img src="${leftArrow}"></span>Back to shopping</button>
    </div>
  `;
}
