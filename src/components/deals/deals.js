import { ProductCard } from "../ProductCard/ProductCard";

import "./deals.scss";

export function TodayDeals (props) {
  return `
      <div class="deals-today">
            <header class="deals__header">
                <div class="deals__time">
                    <h3 class="deals__title">TODAY'S DEALS</h3>
                    <button class="deals__text">
                        <span id="time">5h 30m</span>
                    </button>
                </div>
                
                <button class="deals__text">
                    SEE ALL DEALS
                </button>
            </header>
            
            ${ProductCard()}
      </div>
  `;
}

export function Recommended (props) {
  return `
      <div class="deals-recommended">
            <header class="deals__header">
                <h3 class="deals__title">RECOMMENDED FOR YOU</h3>
            </header>
            ${ProductCard()}
      </div>
  `;
}

export function Deals (props) {
  return `
    <div class="deals">
        ${TodayDeals()}
        ${Recommended()}
    </div>
    
    `;
}
