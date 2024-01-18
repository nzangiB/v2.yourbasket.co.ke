import { ProductCard } from "../ProductCard/ProductCard";

import "./MoreDeals.scss";

export function MoreDeals (props) {
  return `
    <div class="moreDeals__container">
        <div class="recommended__text">
            <h1 class="product-title">MORE DEALS FOR YOU</h1>
        </div>
        ${ProductCard()}

        <div class="recommended__text">
            <h1 class="product-title">MORE ITEMS FROM THIS SELLER</h1>
        </div>
        ${ProductCard()}
    </div>
    
    `;
}
