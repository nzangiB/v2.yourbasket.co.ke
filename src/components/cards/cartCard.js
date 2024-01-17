import heart from "../../assets/images/productpage/icons/red-heart.svg"
import x from "../../assets/images/productpage/icons/x.svg"
import expressRed from "../../assets/images/productpage/icons/express-red-logo.svg"
import offer from "../../assets/images/productpage/icons/offer.svg"
import savings from "../../assets/images/productpage/icons/savings.svg"
import cartImage from "../../assets/images/productpage/cart-image.png"

import './cartCard.scss';

export function CartCard (props) {
    return `
    <div class="cartCard__container">
        <div class="cartCard__item">
            <div class="cartCard__content">
                <div class="item__title">
                    <p>Item</p>
                </div>

                <div class="item__image">
                    <img src="${cartImage}" alt="cart preview image">
                    <p>XIAOMI Redmi Note 12, 6.67'' , 4GB+128GB, 50MP, Dual Sim, 33W Fast Charge-Onyx Gray Black 128 GB</p>
                </div>

                <div class="cartCard__images">
                    <img src="${offer}" alt="">
                    <img src="${expressRed}" alt="">
                    <img src="${savings}" alt="">
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
                    <img src="${x}" alt = "x icon">
                    <img src="${heart}" alt="heart icon">
                </div>
            </div>
            -->
        
        </div>
    </div>
    
    `;
}

