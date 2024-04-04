import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { ProductRow } from "../productCard/productCards";

import "./deals.scss";

export async function MoreDeals (props) {
  return `
      <div class="deals-grid deals-more">
          <header class="deals__header">
              <h3 class="title">More deals for you</h3>
          </header>

          ${new ProductRow([]).render()}
      </div>
      
      <div class="deals deals-more">
          <header class="deals__header">
              <h3 class="title">More items from this seller</h3>
          </header>

          ${new ProductRow([]).render()}
      </div>    
  `;
}
