import iphone from "../../assets/images/iphone.png";
import "./productCard.scss";

export function productCard(props) {
  return `
    <div class="product-container">
      <div class="product_card">
        <img src="${iphone}" alt="Product Image" class="product-image"/>
        <h2 class="product-title">Product Title</h2>
        <p class="product-description">
          Product Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p class="product-price">$19.99</p>
      </div>
    </div>
  `;
}