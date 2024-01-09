import productImage from "../../assets/images/productpage/productImage.png"
import gallery1 from "../../assets/images/productpage/galleryImage1.png"
import gallery2 from "../../assets/images/productpage/galleryImage2.png"
import gallery3 from "../../assets/images/productpage/galleryImage3.png"
import gallery4 from "../../assets/images/productpage/galleryImage4.png"
import gallery5 from "../../assets/images/productpage/galleryImage5.png" 

import NewButton1 from "../../assets/images/productpage/icons/New Button 1.svg"
import NewButton2 from "../../assets/images/productpage/icons/New Button 2.svg"
import Rating from "../../assets/images/productpage/icons/rating.svg"
import Save13 from "../../assets/images/productpage/icons/save13.svg"
import Aspiralogo from "../../assets/images/productpage/aspira-logo.png"
import Offer from "../../assets/images/productpage/offer.png"

import Visa from "../../assets/images/productpage/icons/visa-logo.svg"
import Mastercard from "../../assets/images/productpage/icons/Mastercard.svg"
import Mpesa from "../../assets/images/productpage/icons/image 3.svg"
import Airtel from "../../assets/images/productpage/icons/artboard.svg"
import Buy from "../../assets/images/productpage/icons/Buy.svg"

import Express from "../../assets/images/productpage/icons/express_red_logo.svg"
import QuestionMark from "../../assets/images/productpage/icons/question_mark_icon.svg"
import Delivery from "../../assets/images/productpage/icons/delivery_icon.svg"
import Discount from "../../assets/images/productpage/icons/Discount.svg"

import Seller from "../../assets/images/productpage/Seller.png"
import Rate from "../../assets/images/productpage/icons/Rate.svg"


import './ProductInfo.scss';

export function productInfo (props) {
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
        <div class="productpage__content">
            <div class="productpage__title productpage__border">
                <div class="productpage__icons">
                    <img src="${NewButton1}" alt="">
                    <img src="${NewButton2}" alt="">
                </div>
                <h1>
                    XIAOMI Redmi Note 12, 6.67'' , 4GB+128GB, 50MP, Dual Sim, 33W Fast Charge-Onyx Gray Black 128 GB
                </h1>
                <div class="productpage__rating">
                    <h3>Brand: <span>Xiaomi | See more from Xiaomi</span></h3>
                    <img src="${Rating}" alt="">
                </div>
            </div>

            <div class="productpage__saving productpage__border">
                <h3>Was: <span>KSH 30,000</span></h3>
                <p>Now: <span>KSH 25,999</span> inclusive of VAT</p>
                <img src="${Save13}" alt="save icon">
            </div>

            <div class="aspira">
                <img src="${Aspiralogo}" alt="aspira logo">
                <p>Buy Now. Pay Later on Orders above 10,000 KES.</p>
                <a href="#">Learn More.</a>
            </div>

            <div class="productpage__cart">
                <img src="${Offer}" alt="exclusive offer">
                <div class="cart__buttons">
                    <button class="cart__button-1">Add to cart</button>
                    <button class="cart__button-2">Buy Now</button>
                </div>
            </div>

            <div class="productpage__logos">
                <p>100% Guarantee Safe Checkout</p>
                <img src="${Visa}" alt="visa logo">
                <img src="${Mastercard}" alt="mastercard logo">
                <img src="${Mpesa}" alt="mpesa logo">
                <img src="${Airtel}" alt="airtel logo">
            </div>

            <div class="productpage__offers">
                <div class="offers__content">
                    <img src="${Buy}" alt="cart icon">
                    <p>7 other offers from other sellers</p>
                </div> 
                <a href="#">View All Offers</a>
            </div>

        </div>

        <div class="productInfo__delivery">
            <div class="delivery__content">
                <h3>DELIVERY &amp; RETURNS</h3>
                <div class="delivery__info">
                    <img src="${Express}" alt="express logo">
                    <p>Express delivery in main cities & towns.<span><img src="${QuestionMark}"></span></p>
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
                        <img src="${Delivery}" alt="truck icon">
                        <div class="policy__text">
                            <h3>Door Delivery</h3>
                            <p>Delivery fee of KSH 450 (free delivery if order above KSH 10,000)</p>
                        </div>
                        <a href="#">Learn More</a>
                    </div>

                    <div class="policy__item">
                        <img src="${Delivery}" alt="truck icon">
                        <div class="policy__text">
                            <h3>Door Delivery</h3>
                            <p>Delivery fee of KSH 450 (free delivery if order above KSH 10,000)</p>
                        </div>
                        <a href="#">Learn More</a>
                    </div>

                    <div class="policy__item">
                        <img src="${Delivery}" alt="truck icon">
                        <div class="policy__text">
                            <h3>Door Delivery</h3>
                            <p>Delivery fee of KSH 450 (free delivery if order above KSH 10,000)</p>
                        </div>
                        <a href="#">Learn More</a>
                    </div>
                </div>

                <div class="delivery__ratings">
                    <div class="delivery__ImageSeller">

                        <img src="${Seller}" alt="seller image">

                        <div class="seller__info">
                            <h3>Sold by <a href="#">COMPLAND SHOP</a></h3>
                            <div>
                                <img src=${Rate}>
                                <h3>Positive Reviews</h3>
                            </div>
                            
                        </div>
                    </div>

                    <div class="seller__ratings">
                        <div class="seller__ratings__item">
                            <img src="${Discount}"><p>Order fufillment: Good</p>
                        </div>

                        <div class="seller__ratings__item">
                            <img src="${Discount}"><p>Quality score: Good</p>
                        </div>

                        <div class="seller__ratings__item">
                            <img src="${Discount}"><p>Customer rating: Good</p>
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

