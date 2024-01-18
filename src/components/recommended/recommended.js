import { ProductCard } from "../ProductCard/ProductCard";

import rightArrow from "../../assets/icons/stroke_1.svg";

import "./Recommended.scss";

export function Recommended (props) {
  return `
    <div class="recommended__container">
        <div class="recommended__text">
            <h1 class="product-title">DEALS ON ELECTRONICS</h1>
            <a href="#">See More <span><img src="${rightArrow}" alt="right arrow"></span></a>
        </div>
        ${ProductCard()}
    </div>
    `;
}
