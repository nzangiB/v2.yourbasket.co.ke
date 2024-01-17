import iphone from "../../assets/images/iphone.png";
import discount from "../../assets/icons/discount.svg";
import heart from "../../assets/icons/heart-small.svg";
import rating from "../../assets/images/rating.svg";
import coupon from "../../assets/images/coupon.svg";
import standard from "../../assets/images/standard.svg";

import "./ProductCard.scss";

export function ProductCard(props) {
  return `
  <div class="product">


    <div class="product-container">

      <div class="product_card">
        <div class="product__image">
          <div class="product__icons">
            <img src="${discount}" alt="Discount price"/>
            <img src="${heart}" alt="Discount price"/>
          </div>
          <img src="${iphone}" alt="Product Image" class="product-image"/>
        </div>
        <div class="product__text">
          <h3 class="product__title">Logitech G502 Lightspeed Wireless Gaming Mouse with...</h3>
        </div>
        <div class="product__price">
          <h3>KSH69,999</h3>
          <p>KES79,000</p>
        </div>
        <div class="product__rating">
          <img src="${standard}" alt="standard icon">
          <img src="${rating}" alt="rating icon">
        </div>
        <img src="${coupon}" alt="coupon icon">
      </div>

      <div class="product_card">
        <div class="product__image">
          <div class="product__icons">
            <img src="${discount}" alt="Discount price"/>
            <img src="${heart}" alt="Discount price"/>
          </div>
          <img src="${iphone}" alt="Product Image" class="product-image"/>
        </div>
        <div class="product__text">
          <h3 class="product__title">Logitech G502 Lightspeed Wireless Gaming Mouse with...</h3>
        </div>
        <div class="product__price">
          <h3>KSH69,999</h3>
          <p>KES79,000</p>
        </div>
        <div class="product__rating">
          <img src="${standard}" alt="standard icon">
          <img src="${rating}" alt="rating icon">
        </div>
        <img src="${coupon}" alt="coupon icon">
      </div>


      <div class="product_card">
        <div class="product__image">
          <div class="product__icons">
            <img src="${discount}" alt="Discount price"/>
            <img src="${heart}" alt="Discount price"/>
          </div>
          <img src="${iphone}" alt="Product Image" class="product-image"/>
        </div>
        <div class="product__text">
          <h3 class="product__title">Logitech G502 Lightspeed Wireless Gaming Mouse with...</h3>
        </div>
        <div class="product__price">
          <h3>KSH69,999</h3>
          <p>KES79,000</p>
        </div>
        <div class="product__rating">
          <img src="${standard}" alt="standard icon">
          <img src="${rating}" alt="rating icon">
        </div>
        <img src="${coupon}" alt="coupon icon">
      </div>


      <div class="product_card">
        <div class="product__image">
          <div class="product__icons">
            <img src="${discount}" alt="Discount price"/>
            <img src="${heart}" alt="Discount price"/>
          </div>
          <img src="${iphone}" alt="Product Image" class="product-image"/>
        </div>
        <div class="product__text">
          <h3 class="product__title">Logitech G502 Lightspeed Wireless Gaming Mouse with...</h3>
        </div>
        <div class="product__price">
          <h3>KSH69,999</h3>
          <p>KES79,000</p>
        </div>
        <div class="product__rating">
          <img src="${standard}" alt="standard icon">
          <img src="${rating}" alt="rating icon">
        </div>
        <img src="${coupon}" alt="coupon icon">
      </div>


      <div class="product_card">
        <div class="product__image">
          <div class="product__icons">
            <img src="${discount}" alt="Discount price"/>
            <img src="${heart}" alt="Discount price"/>
          </div>
          <img src="${iphone}" alt="Product Image" class="product-image"/>
        </div>
        <div class="product__text">
          <h3 class="product__title">Logitech G502 Lightspeed Wireless Gaming Mouse with...</h3>
        </div>
        <div class="product__price">
          <h3>KSH69,999</h3>
          <p>KES79,000</p>
        </div>
        <div class="product__rating">
          <img src="${standard}" alt="standard icon">
          <img src="${rating}" alt="rating icon">
        </div>
        <img src="${coupon}" alt="coupon icon">
      </div>


      <div class="product_card">
        <div class="product__image">
          <div class="product__icons">
            <img src="${discount}" alt="Discount price"/>
            <img src="${heart}" alt="Discount price"/>
          </div>
          <img src="${iphone}" alt="Product Image" class="product-image"/>
        </div>
        <div class="product__text">
          <h3 class="product__title">Logitech G502 Lightspeed Wireless Gaming Mouse with...</h3>
        </div>
        <div class="product__price">
          <h3>KSH69,999</h3>
          <p>KES79,000</p>
        </div>
        <div class="product__rating">
          <img src="${standard}" alt="standard icon">
          <img src="${rating}" alt="rating icon">
        </div>
        <img src="${coupon}" alt="coupon icon">
      </div>



        </div>
  </div>
  `;
}
