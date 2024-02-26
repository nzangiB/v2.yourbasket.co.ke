import expressRed from "../../assets/images/product-page/icons/express-red-logo.svg";

import "./orderSummary.scss";

export function OrderSummary (props) {
  return `
    <div class="orderSummary">
        <div class="summary__top">
            <div class="summary__title">
                <h1 class="">Order Summary</h1>
            </div>
            
            <div class="summary__input">
                <input type="number" id="codeInput" placeholder="Apply coupon code" required>
                <button type="button" id="applyButton">Apply</button>
            </div>
            
            <div class="summary__text">
                <div class="summary__subtotal">
                    <h3>Subtotal(3 items)</h3>
                    <h3>KSH 77,997</h3>
                </div>

                <div class="summary__shipping">
                    <h3>Shipping</h3>
                    <p>(Standard Rate - Price may vary depending on the item/destination. You may contact YourBasket Staff)</p>
                </div>
            </div>
        </div>

        <div class="summary__bottom">
            <div class="bottom__icons">
                <img src="${expressRed}" alt="express logo">
                <span>Items labeled “Express” are eligible for free delivery.</span>
            </div>

            <div class="bottom__price">
                <span>Total (Inclusive of VAT)</span>
                <span>KSH 77,997.00</span>
            </div>
            
            <div class="bottom__text">
                <img src="bank" alt="bank icon">
                <span>Buy Now, Pay Later. Monthly payment plans from KSH 10,000. <a href="#">Learn More</a></span>
            </div>

            <div class="bottom__button">
                <button>CHECKOUT</button>
            </div>
        </div>   
    </div>
  `;
}
