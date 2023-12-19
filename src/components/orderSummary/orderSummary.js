import ExpressRed from "../../assets/images/productpage/icons/express_red_logo.svg"
import './orderSummary.scss';

export function orderSummary (props) {
    return `
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

                <div class="summary__shipping">
                    <h3>Shipping</h3>
                    <p>(Standard Rate - Price may vary depending on the item/destination. You may contact YourBasket Staff)</p>
                </div>
            </div>
        </div>

        <div class="summary__bottom">
            <div class="bottom__icons">
                <img src="${ExpressRed}" alt="express logo">
                <p>Items labeled “Express” are eligible for free delivery.</p>
            </div>

            <div class="bottom__price">
                <p>Total (Inclusive of VAT)</p>
                <p>KSH 77,997.00</p>
            </div>

            <div class="bottom__button">
                <div class="bottom__text">
                    <p>Buy Now, Pay Later. Monthly payment plans from KSH 10,000. <a href="#">Learn More</a></p>
                </div>
                <button>CHECKOUT</button>
            </div>
        </div>
        
    </div>
    
    `;
}

