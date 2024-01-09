import Heart from "../../assets/images/productpage/icons/red-heart.svg"
import X from "../../assets/images/productpage/icons/x.svg"
import ExpressRed from "../../assets/images/productpage/icons/express_red_logo.svg"
import Offer from "../../assets/images/productpage/icons/offer.svg"
import Savings from "../../assets/images/productpage/icons/savings.svg"
import CartImage from "../../assets/images/productpage/cartImage.png"

import './CartCard.scss';

export function cartCard (props) {
    return `
    <div class="cartCard__container">
        <div class="cartCard__item">
            <div class="cartCard__content">
                <div class="item__title">
                    <p>Item</p>
                </div>

                <div class="item__image">
                    <img src="${CartImage}" alt="cart preview image">
                    <p>XIAOMI Redmi Note 12, 6.67'' , 4GB+128GB, 50MP, Dual Sim, 33W Fast Charge-Onyx Gray Black 128 GB</p>
                </div>

                <div class="cartCard__images">
                    <img src="${Offer}" alt="">
                    <img src="${ExpressRed}" alt="">
                    <img src="${Savings}" alt="">
                </div>
            </div>

            <div class="cartCard__content">
                <div class="item__title">
                    <p>Price</p>
                </div>
                <p>KSH 25,999.00</p>
            </div>

            <div class="cartCard__content">
                <div class="item__title">
                    <p>Qty</p>
                </div>
                <p>1</p>
            </div>

            <div class="cartCard__content">
                <div class="item__title">
                    <p>Subtotal</p>
                </div>
                <p>1</p>
            </div>

            <!--
            <div class="cartCard__content" id="icons">
                <div class="cartCart__icons">
                    <img src="${X}" alt = "x icon">
                    <img src="${Heart}" alt="heart icon">
                </div>
            </div>
            -->
        
        </div>
    </div>
    
    `;
}

