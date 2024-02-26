import AuthService from "../services/auth.service";
import DataService from "../services/data.service";

import { ProductRow } from "./productCard/productRow";

export async function RelatedProducts ({ productData }) {
  const auth = AuthService.getCurrentUser();
  const userId = auth ? auth.id : "";

  const de = await DataService.getRelatedProducts(productData.id, userId);
  const relatedProducts = de.data.relatedProducts;
  const allProducts = de.data.Products;

  return `
      <div class="deals-grid deals-today">
            <header class="deals__header">
                <div class="deals__time">
                    <h3 class="deals__title">More deals for you</h3>
                </div>
            </header>

            <section class="deals__list">
                ${ProductRow(relatedProducts)}
            </section>
      </div>

      <div class="deals-grid deals-today">
            <header class="deals__header">
                <div class="deals__time">
                    <h3 class="deals__title">More items from this seller</h3>
                </div>
            </header>

            <section class="deals__list">
                ${ProductRow(allProducts)}
            </section>
      </div>
  `;
}
