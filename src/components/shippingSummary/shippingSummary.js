import tick from "../../assets/images/product-page/icons/tick-square.svg";

import "./ShippingSummary.scss";

export function ShippingSummary (props) {
  return `
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
                    <img src="${tick}" alt="">
                    <p>Subscribe for exclusive e-mail offers and discounts.</p>
                </div>
            </div>
        </div> 
    </div>    
    
    `;
}
