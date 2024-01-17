import expressRed from "../../assets/images/product-page/icons/express-red-logo.svg"
import offer from "../../assets/images/product-page/icons/offer.svg"
import cartImage from "../../assets/images/product-page/cart-image.png"

import button from "../../assets/images/product-page/icons/btn-basic.svg"
import button2 from "../../assets/images/product-page/icons/btn-basic-2.svg"

import "./couponCard.scss";

export function CouponCard (props) {
    return `
    <div class="cartCard__container">
        <div class="couponCard__item">
            <div class="cartCard__content">  

                <div class="item__image">
                    <img src="${cartImage}" alt="cart preview image">
                    <div class="item__text">
                        <p>XIAOMI Redmi Note 12, 6.67'' , 4GB+128GB, 50MP, Dual Sim, 33W Fast Charge-Onyx Gray Black 128 GB</p>
                        <h3>Sold by <span>COMPLAND SHOP</span></h3>
                        <h3>Variation: Black</p>
                        <h3>1 units left</h3>
                    </div>

                    
                    <div class="cartCard__content">
                        <p>KSH 25,999.00</p>
                        <p>1</p>
                    </div>

                </div>

                <div class="couponCard__images">
                    <div>
                        <img src="${button}" alt="">
                        <img src="${button2}" alt="">
                    </div>

                    <div>
                        <img src="${offer}" alt="">
                        <img src="${expressRed}" alt="">
                    </div>
                </div>
            </div>
        
        </div>
    </div>
    
    `;
}

