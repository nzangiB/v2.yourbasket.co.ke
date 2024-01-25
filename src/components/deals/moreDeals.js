import { ProductCard } from "../productCard/productCard";

import "./moreDeals.scss";

export function MoreDeals (props) {
  return `
    <div class="deals-more">
        <header class="deals__header">
            <h3 class="deals__title">MORE DEALS FOR YOU</h3>
        </header>
        ${ProductCard()}

        <header class="deals__header">
            <h3 class="deals__title">MORE ITEMS FROM THIS SELLER</h3>
        </header>>
        ${ProductCard()}
    </div>
    
    `;
}
