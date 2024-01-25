import iphone from "../../assets/images/iphone.png";
import discount from "../../assets/icons/discount.svg";
import heart from "../../assets/icons/heart-small.svg";
import rating from "../../assets/images/rating.svg";
import coupon from "../../assets/images/coupon.svg";
import standard from "../../assets/images/standard.svg";

import "./productCard.scss";

export function ProductCard (props) {
  return `
      <div class="product">
          <div class="product-cards">
      
              <div class="product-card">
                  <div class="product-card__image">
                      <div class="product-card__icons">
                          <img src="${discount}" alt="Discount price"/>
                          <img src="${heart}" alt="Discount price"/>
                      </div>
                      <img src="${iphone}" alt="Product Image" class="img"/>
                  </div>
                  <div class="product-card__text">
                      <h3 class="text__title">Logitech G502 Lightspeed Wireless Gaming Mouse with...</h3>
                  </div>
                  <div class="product-card__price">
                      <div class="price__current">KSH69,999</div>
                      <div class="price__initial">KES79,000</div>
                  </div>
                  <div class="product-card__rating">
                      <img src="${standard}" alt="standard icon">
                      <img src="${rating}" alt="rating icon">
                  </div>
                  <img src="${coupon}" alt="coupon icon">
              </div>
      
              <div class="product-card">
                  <div class="product-card__image">
                      <div class="product-card__icons">
                          <img src="${discount}" alt="Discount price"/>
                          <img src="${heart}" alt="Discount price"/>
                      </div>
                      <img src="${iphone}" alt="Product Image" class="img"/>
                  </div>
                  <div class="product-card__text">
                      <h3 class="text__title">Logitech G502 Lightspeed Wireless Gaming Mouse with...</h3>
                  </div>
                  <div class="product-card__price">
                      <div class="price__current">KSH69,999</div>
                      <div class="price__initial">KES79,000</div>
                  </div>
                  <div class="product-card__rating">
                      <img src="${standard}" alt="standard icon">
                      <img src="${rating}" alt="rating icon">
                  </div>
                  <img src="${coupon}" alt="coupon icon">
              </div>
      
              <div class="product-card">
                  <div class="product-card__image">
                      <div class="product-card__icons">
                          <img src="${discount}" alt="Discount price"/>
                          <img src="${heart}" alt="Discount price"/>
                      </div>
                      <img src="${iphone}" alt="Product Image" class="img"/>
                  </div>
                  <div class="product-card__text">
                      <h3 class="text__title">Logitech G502 Lightspeed Wireless Gaming Mouse with...</h3>
                  </div>
                  <div class="product-card__price">
                      <div class="price__current">KSH69,999</div>
                      <div class="price__initial">KES79,000</div>
                  </div>
                  <div class="product-card__rating">
                      <img src="${standard}" alt="standard icon">
                      <img src="${rating}" alt="rating icon">
                  </div>
                  <img src="${coupon}" alt="coupon icon">
              </div>
      
              <div class="product-card">
                  <div class="product-card__image">
                      <div class="product-card__icons">
                          <img src="${discount}" alt="Discount price"/>
                          <img src="${heart}" alt="Discount price"/>
                      </div>
                      <img src="${iphone}" alt="Product Image" class="img"/>
                  </div>
                  <div class="product-card__text">
                      <h3 class="text__title">Logitech G502 Lightspeed Wireless Gaming Mouse with...</h3>
                  </div>
                  <div class="product-card__price">
                      <div class="price__current">KSH69,999</div>
                      <div class="price__initial">KES79,000</div>
                  </div>
                  <div class="product-card__rating">
                      <img src="${standard}" alt="standard icon">
                      <img src="${rating}" alt="rating icon">
                  </div>
                  <img src="${coupon}" alt="coupon icon">
              </div>
      
              <div class="product-card">
                  <div class="product-card__image">
                      <div class="product-card__icons">
                          <img src="${discount}" alt="Discount price"/>
                          <img src="${heart}" alt="Discount price"/>
                      </div>
                      <img src="${iphone}" alt="Product Image" class="img"/>
                  </div>
                  <div class="product-card__text">
                      <h3 class="text__title">Logitech G502 Lightspeed Wireless Gaming Mouse with...</h3>
                  </div>
                  <div class="product-card__price">
                      <div class="price__current">KSH69,999</div>
                      <div class="price__initial">KES79,000</div>
                  </div>
                  <div class="product-card__rating">
                      <img src="${standard}" alt="standard icon">
                      <img src="${rating}" alt="rating icon">
                  </div>
                  <img src="${coupon}" alt="coupon icon">
              </div>
      
              <div class="product-card">
                  <div class="product-card__image">
                      <div class="product-card__icons">
                          <img src="${discount}" alt="Discount price"/>
                          <img src="${heart}" alt="Discount price"/>
                      </div>
                      <img src="${iphone}" alt="Product Image" class="img"/>
                  </div>
                  <div class="product-card__text">
                      <h3 class="text__title">Logitech G502 Lightspeed Wireless Gaming Mouse with...</h3>
                  </div>
                  <div class="product-card__price">
                      <div class="price__current">KSH69,999</div>
                      <div class="price__initial">KES79,000</div>
                  </div>
                  <div class="product-card__rating">
                      <img src="${standard}" alt="standard icon">
                      <img src="${rating}" alt="rating icon">
                  </div>
                  <img src="${coupon}" alt="coupon icon">
              </div>
          </div>
      </div>
  `;
}
