import HelperService from "../services/helper.service";

import { ProductRow } from "./productCard/productRow";

export async function RecentlyViewed ({ productData }) {
  const recentProducts = HelperService.getRecentProducts();
  HelperService.setRecentProducts(productData);

  return `  
      <div class="deals-grid deals-recommended">
          <header class="deals__header">
              <h3 class="deals__title">Recently Viewed</h3>
          </header>
          
          <section class="deals__list">
              ${ProductRow(recentProducts.slice(0, 4))}
          </section>
      </div>
  `;
}
