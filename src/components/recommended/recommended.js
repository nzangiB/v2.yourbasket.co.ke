import { productCard } from "../productCard/productCard";
import rightArrow from "../../assets/icons/Stroke_1.svg"
import './recommended.scss'

export function Recommended (props) {
    return `
    <div class="recommended__container">
        <div class="recommended__text">
            <h1 class="product-title">DEALS ON ELECTRONICS</h1>
            <a href="#">See More <span><img src="${rightArrow}" alt="right arrow"></span></a>
        </div>
        ${productCard()}
    </div>
    `;
}

