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


import './productInfo.scss';

export function productInfo (props) {
    return `
    <div class="productInfo__container">

        <div class="productInfo__images">
            <div class="image__container">
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
                    <h3>Brand: Xiaomi | See more from Xiaomi </h3>
                    <img src="${Rating}" alt="">
                </div>
            </div>

            <div class="productpage__saving productpage__border">
                <p>Was: <span>KSH 30,000</span></p>
                <p>Now: <span>KSH 25,999</span> <span>inclusive of VAT</span></p>
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
                    <img src="${Buy} alt="card icon">
                    <p>7 other offers from other sellers</p>
                </div> 
                <a href="#">View All Offers</a>
            </div>

        </div>

    </div>
    
    `;
}

