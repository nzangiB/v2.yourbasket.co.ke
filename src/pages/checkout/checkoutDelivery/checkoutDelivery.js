import { Nav } from '../../../components/nav/nav';
import { shippingSummary } from '../../../components/shippingSummary/shippingSummary';
import { Signup } from '../../../components/signup/signup';
import Greencheck from "../../../assets/images/productpage/icons/green_check.svg"
import Mpesa from "../../../assets/images/productpage/icons/image 3.svg"
import Blueright from "../../../assets/images/productpage/icons/blue-right.svg"
import Leftarrow from "../../../assets/images/productpage/icons/left-arrow.svg"
import { Footer } from '../../../components/footer/footer';
import CartImage from "../../../assets/images/productpage/cartImage.png"


import './checkoutDelivery.scss';

export function checkoutDelivery (props) {
    return `
            <div class="container productPage__container">
            ${Nav()}
            <div class="checkout__title">
                <h1>Place your order</h1>
            </div>
            <div class="checkout__content">
                <div class="bottom__content">
                <div class="orderCard__container">
                <div class="orderCard__item check-item">
                    <div class="orderCard__text paymentOptions__cardtext">
                        <div class="check-text">
                            <img src="${Greencheck}" alt="check icon">
                            <h3>1. Customer Address</h3>
                        </div>
                        <div class="Edit">
                            <a href="#"><p>Edit</p></a>
                            <img src="${Blueright}">
                        </div>
                    </div>
                </div>
            </div>
        
        
            <div class="paymentOptions">
        
                <div class="orderCard__text payment__title">
                    <img src="${Greencheck}" alt="check icon">
                    <h3>2. Delivery Options</h3>
                </div>
        
                <div class="paymentOptions__type">
                    <div class="type__title">
                        <h3>Choose how would you like to receive the products<h3>
                    </div>
                    
                    <div class="delivery__gallery">

                        <div class="gallery__left">
                            <div class="devliveryGallery__item">
                                <div class="deliveryGallery__input">
                                    <label for="IpayRadio">
                                        <input id="IpayRadio" type="radio" name="Payment" value="Pay now with Ipay">
                                        Door Delivery
                                    </label>
                                    <p>Delivery between <span>Aug 10 and Aug 17</span> (from 350 KES)</p>
                                </div>
                                <div class="deliveryGallery__text">
                                    <h3>Shipment 1/3</h3>
                                    <h3>Fulfilled by YourBasket</h3>
                                </div>
                            </div>

                            <div class="devliveryGallery__item">
                                <div class="deliveryGallery__content">
                                    <div class="deliveryGallery__date">
                                        <p>Delivery scheduled for Aug 11</p>
                                    </div>

                                    <div class="deliveryGalleryImage">
                                        <img src="${CartImage}" alt="phone">
                                        <div class="GalleryImage__content">
                                            <h3>XIAOMI Redmi Note 12, 6.67'' , 4GB+128GB, 50MP, Dual Sim...</h3>
                                            <h3>QTY: 1</h3>
                                        </div>
                                    </div>

                                </div>
                                <div class="deliveryShipment__text">
                                    <h3>Shipment 2/3</h3>
                                    <h3>Fulfilled by YourBasket</h3>
                                </div>
                            </div>

                            <div class="devliveryGallery__item">
                                <div class="deliveryGallery__content">
                                    <div class="deliveryGallery__date">
                                        <p>Delivery scheduled for Aug 11</p>
                                    </div>

                                    <div class="deliveryGalleryImage">
                                        <img src="${CartImage}" alt="phone">
                                        <div class="GalleryImage__content">
                                            <h3>XIAOMI Redmi Note 12, 6.67'' , 4GB+128GB, 50MP, Dual Sim...</h3>
                                            <h3>QTY: 1</h3>
                                        </div>
                                    </div>

                                </div>
                                <div class="deliveryShipment__text">
                                    <h3>Shipment 2/3</h3>
                                    <h3>Fulfilled by YourBasket</h3>
                                </div>
                            </div>

                            <div class="devliveryGallery__item">
                                <div class="deliveryGallery__content">
                                    <div class="deliveryGallery__date">
                                        <p>Delivery scheduled for Aug 11</p>
                                    </div>

                                    <div class="deliveryGalleryImage">
                                        <img src="${CartImage}" alt="phone">
                                        <div class="GalleryImage__content">
                                            <h3>XIAOMI Redmi Note 12, 6.67'' , 4GB+128GB, 50MP, Dual Sim...</h3>
                                            <h3>QTY: 1</h3>
                                        </div>
                                    </div>

                                </div>
                                <div class="deliveryShipment__text">
                                    <h3>Shipment 2/3</h3>
                                    <h3>Fulfilled by YourBasket</h3>
                                </div>
                            </div>
                        </div>

                        <div class="gallery__right">
                            <div class="devliveryGallery__item">
                                <div class="deliveryGallery__input">
                                    <label for="IpayRadio">
                                        <input id="IpayRadio" type="radio" name="Payment" value="Pay now with Ipay">
                                        Door Delivery
                                    </label>
                                    <p>Delivery between <span>Aug 10 and Aug 17</span> (from 350 KES)</p> 
                                </div>
                                <div class="deliveryGallery__text">
                                    <h3>Shipment 1/3</h3>
                                    <h3>Fulfilled by YourBasket</h3>
                                </div>
                            </div>

                            <div class="devliveryGallery__item">
                                <div class="deliveryGallery__content">
                                    <div class="deliveryGallery__date">
                                        <p>Delivery scheduled for Aug 11</p>
                                    </div>

                                    <div class="deliveryGalleryImage">
                                        <img src="${CartImage}" alt="phone">
                                        <div class="GalleryImage__content">
                                            <h3>XIAOMI Redmi Note 12, 6.67'' , 4GB+128GB, 50MP, Dual Sim...</h3>
                                            <h3>QTY: 1</h3>
                                        </div>
                                    </div>
                                </div>

                                <div class="deliveryShipment__text">
                                    <h3>Shipment 2/3</h3>
                                    <h3>Fulfilled by YourBasket</h3>
                                </div>
                                
                            </div>

                            <div class="devliveryGallery__item">
                                <div class="deliveryGallery__content">
                                    <div class="deliveryGallery__date">
                                        <p>Delivery scheduled for Aug 11</p>
                                    </div>

                                    <div class="deliveryGalleryImage">
                                        <img src="${CartImage}" alt="phone">
                                        <div class="GalleryImage__content">
                                            <h3>XIAOMI Redmi Note 12, 6.67'' , 4GB+128GB, 50MP, Dual Sim...</h3>
                                            <h3>QTY: 1</h3>
                                        </div>
                                    </div>

                                </div>
                                <div class="deliveryShipment__text">
                                    <h3>Shipment 2/3</h3>
                                    <h3>Fulfilled by YourBasket</h3>
                                </div>
                            </div>

                            <div class="devliveryGallery__item">
                                <div class="deliveryGallery__content">
                                    <div class="deliveryGallery__date">
                                        <p>Delivery scheduled for Aug 11</p>
                                    </div>

                                    <div class="deliveryGalleryImage">
                                        <img src="${CartImage}" alt="phone">
                                        <div class="GalleryImage__content">
                                            <h3>XIAOMI Redmi Note 12, 6.67'' , 4GB+128GB, 50MP, Dual Sim...</h3>
                                            <h3>QTY: 1</h3>
                                        </div>
                                    </div>

                                </div>
                                <div class="deliveryShipment__text">
                                    <h3>Shipment 2/3</h3>
                                    <h3>Fulfilled by YourBasket</h3>
                                </div>
                            </div>

                        </div>

                    </div>                
                        
                    <button>
                        CONFIRM PAYMENT METHOD
                    </button>
                </div>
            </div>

            <div class="orderCard__container">
                <div class="orderCard__item check-item">
                    <div class="orderCard__text paymentOptions__cardtext">
                        <div class="check-text">
                            <img src="${Greencheck}" alt="check icon">
                            <h3>3. Delivery Details</h3>
                        </div>
                        <div class="Edit">
                            <a href="#"><p>Edit</p></a>
                            <img src="${Blueright}">
                        </div>
                    </div>
                <p>Pay Fast and securely with Mpesa, Bank Cards, Partial Payment and Aspira</p>
                </div>
                <button class="bottom__button1"><span><img src="${Leftarrow}"></span>Back to shopping</button>
            </div>
                </div>
                ${shippingSummary()}
            </div>
            
            ${Signup()}
            ${Footer()}
        </div>
    `;
}

