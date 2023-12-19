import { productCard } from '../productCard/productCard';

import './moreDeals.scss';

export function moreDeals (props) {
    return `
    <div class="moreDeals__container">
        <div class="recommended__text">
            <h1 class="product-title">MORE DEALS FOR YOU</h1>
        </div>
        ${productCard()}

        <div class="recommended__text">
            <h1 class="product-title">MORE ITEMS FROM THIS SELLER</h1>
        </div>
        ${productCard()}
    </div>
    
    `;
}

