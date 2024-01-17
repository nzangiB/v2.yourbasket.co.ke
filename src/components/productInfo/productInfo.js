import productImage from "../../assets/images/productpage/product-image.png"
import gallery1 from "../../assets/images/productpage/gallery-image-1.png"
import gallery2 from "../../assets/images/productpage/gallery-image-2.png"
import gallery3 from "../../assets/images/productpage/gallery-image-3.png"
import gallery4 from "../../assets/images/productpage/gallery-image-4.png"
import gallery5 from "../../assets/images/productpage/gallery-image-5.png"

import newButton1 from "../../assets/images/productpage/icons/new-button-1.svg"
import newButton2 from "../../assets/images/productpage/icons/new-button-2.svg"
import rating from "../../assets/images/productpage/icons/rating.svg"
import save from "../../assets/images/productpage/icons/save-13.svg"
import aspiraLogo from "../../assets/images/productpage/aspira-logo.png"
import offer from "../../assets/images/productpage/offer.png"

import visa from "../../assets/images/productpage/icons/visa-logo.svg"
import mastercard from "../../assets/images/productpage/icons/mastercard.svg"
import mPesa from "../../assets/images/productpage/icons/m-pesa.svg"
import airtel from "../../assets/images/productpage/icons/artboard.svg"
import buy from "../../assets/images/productpage/icons/buy.svg"

import express from "../../assets/images/productpage/icons/express-red-logo.svg"
import questionMark from "../../assets/images/productpage/icons/question-mark-icon.svg"
import delivery from "../../assets/images/productpage/icons/delivery-icon.svg"
import discount from "../../assets/images/productpage/icons/discount.svg"

import seller from "../../assets/images/productpage/Seller.png"
import rate from "../../assets/images/productpage/icons/rate.svg"

import './ProductInfo.scss';

export function ProductInfo (props) {
    return `
    <div class="productInfo__container">

        <div class="productInfo__images">
            <div class="image__container image__container__main">
                <img src="${(productImage)}" alt>
            </div>

            <div class="product__gallery">
                <div class="product__gallery_item">
                    <img src="${(gallery1)}" alt="gallery item">
                </div>

                <div class="product__gallery_item">
                    <img src="${(gallery2)}" alt="gallery item">
                </div>

                <div class="product__gallery_item">
                    <img src="${(gallery3)}" alt="gallery item">
                </div>

                <div class="product__gallery_item">
                    <img src="${(gallery4)}" alt="gallery item">
                </div>

                <div class="product__gallery_item">
                    <img src="${(gallery5)}" alt="gallery item">
                </div>

            </div>
        </div>

        <!-- Product info text-->
        <div class="productPage__content">
            <div class="productPage__title productPage__border">
                <div class="productPage__icons">
                    <img src="${newButton1}" alt="">
                    <img src="${newButton2}" alt="">
                </div>
                <h1>
                    XIAOMI Redmi Note 12, 6.67'' , 4GB+128GB, 50MP, Dual Sim, 33W Fast Charge-Onyx Gray Black 128 GB
                </h1>
                <div class="productPage__rating">
                    <h3>Brand: <span>Xiaomi | See more from Xiaomi</span></h3>
                    <img src="${rating}" alt="">
                </div>
            </div>

            <div class="productPage__saving productPage__border">
                <h3>Was: <span>KSH 30,000</span></h3>
                <p>Now: <span>KSH 25,999</span> inclusive of VAT</p>
                <img src="${save}" alt="save icon">
            </div>

            <div class="aspira">
                <img src="${aspiraLogo}" alt="aspira logo">
                <p>Buy Now. Pay Later on Orders above 10,000 KES.</p>
                <a href="#">Learn More.</a>
            </div>

            <div class="productPage__cart">
                <img src="${offer}" alt="exclusive offer">
                <div class="cart__buttons">
                    <button class="cart__button-1">Add to cart</button>
                    <button class="cart__button-2">Buy Now</button>
                </div>
            </div>

            <div class="productPage__logos">
                <p>100% Guarantee Safe Checkout</p>
                <img src="${visa}" alt="visa logo">
                <img src="${mastercard}" alt="mastercard logo">
                <img src="${mPesa}" alt="mPesa logo">
                <img src="${airtel}" alt="airtel logo">
            </div>

            <div class="productPage__offers">
                <div class="offers__content">
                    <img src="${buy}" alt="cart icon">
                    <p>7 other offers from other sellers</p>
                </div> 
                <a href="#">View All Offers</a>
            </div>

        </div>

        <div class="productInfo__delivery">
            <div class="delivery__content">
                <h3>DELIVERY &amp; RETURNS</h3>
                <div class="delivery__info">
                    <img src="${express}" alt="express logo">
                    <p>Express delivery in main cities & towns.<span><img src="${questionMark}"></span></p>
                </div>
                <div class="delivery__inputs">
                    <h3>Select delivery options</h3>
                    <label for="generalLocation"></label>
                    <input type="text" id="generalLocation" name="generalLocation" placeholder="Nairobi">

                    <label for="specificLocation"></label>
                    <input type="text" id="specificLocation" name="specificLocation" placeholder="Roysambu/Zimmerman">
                </div>

                <div class="delivery__policy">
                    <div class="policy__item">
                        <img src="${delivery}" alt="truck icon">
                        <div class="policy__text">
                            <h3>Door Delivery</h3>
                            <p>Delivery fee of KSH 450 (free delivery if order above KSH 10,000)</p>
                        </div>
                        <a href="#">Learn More</a>
                    </div>

                    <div class="policy__item">
                        <img src="${delivery}" alt="truck icon">
                        <div class="policy__text">
                            <h3>Door Delivery</h3>
                            <p>Delivery fee of KSH 450 (free delivery if order above KSH 10,000)</p>
                        </div>
                        <a href="#">Learn More</a>
                    </div>

                    <div class="policy__item">
                        <img src="${delivery}" alt="truck icon">
                        <div class="policy__text">
                            <h3>Door Delivery</h3>
                            <p>Delivery fee of KSH 450 (free delivery if order above KSH 10,000)</p>
                        </div>
                        <a href="#">Learn More</a>
                    </div>
                </div>

                <div class="delivery__ratings">
                    <div class="delivery__ImageSeller">

                        <img src="${seller}" alt="seller image">

                        <div class="seller__info">
                            <h3>Sold by <a href="#">COMPLAND SHOP</a></h3>
                            <div>
                                <img src=${rate}>
                                <h3>Positive Reviews</h3>
                            </div>
                            
                        </div>
                    </div>

                    <div class="seller__ratings">
                        <div class="seller__ratings__item">
                            <img src="${discount}"><p>Order fufillment: Good</p>
                        </div>

                        <div class="seller__ratings__item">
                            <img src="${discount}"><p>Quality score: Good</p>
                        </div>

                        <div class="seller__ratings__item">
                            <img src="${discount}"><p>Customer rating: Good</p>
                        </div>
                    </div>  
                </div>

                <div class="delivery__sell">
                    <p>How does one sell?</p>
                    <button>Sell on YourBasket</button>
                </div>

                <div>

                </div>
            </div>
        </div>

    </div>
    
    `;
}

