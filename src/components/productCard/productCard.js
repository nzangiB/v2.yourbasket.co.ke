import iphone from "../../assets/images/iphone.png";
import Discount from "../../assets/icons/discount.svg"
import Heart from "../../assets/icons/heart small.svg"
import Rating from "../../assets/images/Rating.svg"
import Coupon from "../../assets/images/Coupon.svg"
import Standard from "../../assets/images/Standard.svg"
import rightArrow from "../../assets/icons/Stroke_1.svg"
import "./ProductCard.scss";

export function productCard(props) {
  return `
  <div class="product">


    <div class="product-container">

      <div class="product_card">
        <div class="product__image">
          <div class="product__icons">
            <img src="${Discount}" alt="Discount price"/>
            <img src="${Heart}" alt="Discount price"/>
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
          <img src="${Standard}" alt="standard icon">
          <img src="${Rating}" alt="rating icon">
        </div>
        <img src="${Coupon}" alt="coupon icon">
      </div>

      <div class="product_card">
        <div class="product__image">
          <div class="product__icons">
            <img src="${Discount}" alt="Discount price"/>
            <img src="${Heart}" alt="Discount price"/>
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
          <img src="${Standard}" alt="standard icon">
          <img src="${Rating}" alt="rating icon">
        </div>
        <img src="${Coupon}" alt="coupon icon">
      </div>


      <div class="product_card">
        <div class="product__image">
          <div class="product__icons">
            <img src="${Discount}" alt="Discount price"/>
            <img src="${Heart}" alt="Discount price"/>
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
          <img src="${Standard}" alt="standard icon">
          <img src="${Rating}" alt="rating icon">
        </div>
        <img src="${Coupon}" alt="coupon icon">
      </div>


      <div class="product_card">
        <div class="product__image">
          <div class="product__icons">
            <img src="${Discount}" alt="Discount price"/>
            <img src="${Heart}" alt="Discount price"/>
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
          <img src="${Standard}" alt="standard icon">
          <img src="${Rating}" alt="rating icon">
        </div>
        <img src="${Coupon}" alt="coupon icon">
      </div>


      <div class="product_card">
        <div class="product__image">
          <div class="product__icons">
            <img src="${Discount}" alt="Discount price"/>
            <img src="${Heart}" alt="Discount price"/>
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
          <img src="${Standard}" alt="standard icon">
          <img src="${Rating}" alt="rating icon">
        </div>
        <img src="${Coupon}" alt="coupon icon">
      </div>


      <div class="product_card">
        <div class="product__image">
          <div class="product__icons">
            <img src="${Discount}" alt="Discount price"/>
            <img src="${Heart}" alt="Discount price"/>
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
          <img src="${Standard}" alt="standard icon">
          <img src="${Rating}" alt="rating icon">
        </div>
        <img src="${Coupon}" alt="coupon icon">
      </div>



        </div>
  </div>
  `;
}
