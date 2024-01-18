import { ProductCard } from '../ProductCard/ProductCard';

import './Deals.scss';

export function Deals (props) {
    return `
    <div class="Deals__container">

        <div class="Deals__top">
            <div class="Deals__title">

                <div class="Deals__time">
                    <h3 class="product-title">TODAY'S DEALS</h3>
                    <button class="Deals__text"><span id="time">5h 30m</span></button>
                </div>
                
                <button class="Deals__text">
                    SEE ALL DEALS
                </button>
            </div>

            
            ${ProductCard()}
            <div class="product-title">
                <h1>RECOMMENDED FOR YOU</h1>
            </div>
            ${ProductCard()}
        </div>

    </div>
    
    `;
}

